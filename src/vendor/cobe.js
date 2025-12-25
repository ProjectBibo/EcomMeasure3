/*!
 * Cobe - https://github.com/shuding/cobe
 *
 * MIT License
 * Copyright (c) 2022 shuding
 */

const defaultOptions = {
  width: 100,
  height: 100,
  devicePixelRatio: 1,
  phi: 0,
  theta: 0,
  scale: 1,
  dark: 1,
  diffuse: 1,
  mapSamples: 16000,
  mapBrightness: 1,
  baseColor: [1, 1, 1],
  markerColor: [1, 1, 1],
  glowColor: [1, 1, 1],
  markers: [],
  onRender: null,
};

const markerDefault = {
  size: 0.08,
  color: undefined,
};

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function normalizeColor(color) {
  if (!color) return null;
  if (Array.isArray(color)) {
    return [
      clamp(color[0], 0, 1),
      clamp(color[1], 0, 1),
      clamp(color[2], 0, 1),
    ];
  }
  return null;
}

function normalizeMarker(marker) {
  const location = marker.location || marker.coordinates || marker.position || [0, 0];
  const size = typeof marker.size === "number" ? marker.size : markerDefault.size;
  const color = normalizeColor(marker.color) || null;
  return {
    location: [Number(location[0]) || 0, Number(location[1]) || 0],
    size,
    color,
  };
}

function mergeOptions(userOptions) {
  const options = { ...defaultOptions, ...userOptions };
  options.baseColor = normalizeColor(options.baseColor) || defaultOptions.baseColor;
  options.markerColor = normalizeColor(options.markerColor) || defaultOptions.markerColor;
  options.glowColor = normalizeColor(options.glowColor) || defaultOptions.glowColor;
  options.markers = Array.isArray(options.markers)
    ? options.markers.map(normalizeMarker)
    : defaultOptions.markers;
  options.devicePixelRatio = options.devicePixelRatio || (typeof window !== "undefined" ? window.devicePixelRatio : 1) || 1;
  return options;
}

function sphericalToCartesian(lat, lng) {
  const phi = ((90 - lat) * Math.PI) / 180;
  const theta = ((lng + 180) * Math.PI) / 180;
  const x = -Math.sin(phi) * Math.cos(theta);
  const y = Math.cos(phi);
  const z = Math.sin(phi) * Math.sin(theta);
  return [x, y, z];
}

function createShader(gl, type, source) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const error = gl.getShaderInfoLog(shader);
    gl.deleteShader(shader);
    throw new Error(`Error compiling shader: ${error}`);
  }
  return shader;
}

function createProgram(gl, vertexSource, fragmentSource) {
  const program = gl.createProgram();
  const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexSource);
  const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentSource);
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    const error = gl.getProgramInfoLog(program);
    gl.deleteProgram(program);
    throw new Error(`Unable to initialize WebGL program: ${error}`);
  }
  return program;
}

function createSphere(detail = 64) {
  const positions = [];
  const normals = [];
  const indices = [];

  for (let y = 0; y <= detail; y += 1) {
    const v = y / detail;
    const lat = v * Math.PI;

    for (let x = 0; x <= detail; x += 1) {
      const u = x / detail;
      const lon = u * Math.PI * 2;

      const dx = Math.sin(lat) * Math.cos(lon);
      const dy = Math.cos(lat);
      const dz = Math.sin(lat) * Math.sin(lon);

      positions.push(dx, dy, dz);
      normals.push(dx, dy, dz);
    }
  }

  const vertsPerRow = detail + 1;
  for (let y = 0; y < detail; y += 1) {
    for (let x = 0; x < detail; x += 1) {
      const i = y * vertsPerRow + x;
      const a = i;
      const b = i + vertsPerRow;
      const c = i + vertsPerRow + 1;
      const d = i + 1;
      indices.push(a, b, d);
      indices.push(b, c, d);
    }
  }

  return {
    positions: new Float32Array(positions),
    normals: new Float32Array(normals),
    indices: new Uint16Array(indices),
  };
}

function createMarkerGeometry(count) {
  return new Float32Array(Math.max(count * 3, 3));
}

function createGlobe(canvas, userOptions = {}) {
  if (!canvas) throw new Error("Canvas element is required");
  const gl = canvas.getContext("webgl", { antialias: true, alpha: true });
  if (!gl) throw new Error("WebGL not supported");

  let options = mergeOptions(userOptions);
  let animationFrame = null;
  let disposed = false;

  const sphere = createSphere(128);

  const vertexSource = `
    attribute vec3 position;
    attribute vec3 normal;
    uniform mat4 projection;
    uniform mat4 view;
    varying vec3 vNormal;
    void main() {
      vNormal = normal;
      gl_Position = projection * view * vec4(position, 1.0);
    }
  `;

  const fragmentSource = `
    precision highp float;
    varying vec3 vNormal;
    uniform vec3 baseColor;
    uniform float diffuse;
    uniform float dark;
    void main() {
      vec3 lightDirection = normalize(vec3(0.8, 0.6, 0.75));
      float light = max(dot(normalize(vNormal), lightDirection), 0.0);
      float shading = pow(light, diffuse) + 0.15;
      vec3 color = mix(vec3(0.07, 0.11, 0.2) * dark, baseColor, shading);
      gl_FragColor = vec4(color, 1.0);
    }
  `;

  const program = createProgram(gl, vertexSource, fragmentSource);
  gl.useProgram(program);

  const positionLocation = gl.getAttribLocation(program, "position");
  const normalLocation = gl.getAttribLocation(program, "normal");
  const projectionLocation = gl.getUniformLocation(program, "projection");
  const viewLocation = gl.getUniformLocation(program, "view");
  const baseColorLocation = gl.getUniformLocation(program, "baseColor");
  const diffuseLocation = gl.getUniformLocation(program, "diffuse");
  const darkLocation = gl.getUniformLocation(program, "dark");

  const positionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, sphere.positions, gl.STATIC_DRAW);

  const normalBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, sphere.normals, gl.STATIC_DRAW);

  const indexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, sphere.indices, gl.STATIC_DRAW);

  const markerVertexSource = `
    attribute vec3 position;
    uniform mat4 projection;
    uniform mat4 view;
    uniform float size;
    void main() {
      vec4 pos = projection * view * vec4(position, 1.0);
      gl_Position = pos;
      gl_PointSize = size;
    }
  `;

  const markerFragmentSource = `
    precision highp float;
    uniform vec3 color;
    void main() {
      vec2 coord = gl_PointCoord.xy - 0.5;
      float dist = length(coord);
      float alpha = smoothstep(0.5, 0.0, dist);
      gl_FragColor = vec4(color, alpha);
    }
  `;

  const markerProgram = createProgram(gl, markerVertexSource, markerFragmentSource);
  const markerPositionLocation = gl.getAttribLocation(markerProgram, "position");
  const markerProjectionLocation = gl.getUniformLocation(markerProgram, "projection");
  const markerViewLocation = gl.getUniformLocation(markerProgram, "view");
  const markerColorLocation = gl.getUniformLocation(markerProgram, "color");
  const markerSizeLocation = gl.getUniformLocation(markerProgram, "size");
  const markerBuffer = gl.createBuffer();

  let markerPositions = createMarkerGeometry(options.markers.length);

  function updateMarkerBuffer() {
    markerPositions = createMarkerGeometry(options.markers.length);
    options.markers.forEach((marker, index) => {
      const [x, y, z] = sphericalToCartesian(marker.location[0], marker.location[1]);
      markerPositions[index * 3] = x;
      markerPositions[index * 3 + 1] = y;
      markerPositions[index * 3 + 2] = z;
    });
    gl.bindBuffer(gl.ARRAY_BUFFER, markerBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, markerPositions, gl.STATIC_DRAW);
  }

  updateMarkerBuffer();

  function resize() {
    const dpr = options.devicePixelRatio || 1;
    const width = Math.round(options.width * dpr);
    const height = Math.round(options.height * dpr);
    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width;
      canvas.height = height;
    }
    gl.viewport(0, 0, width, height);
  }

  function computeMatrices() {
    const { phi, theta, scale } = options;
    const cosPhi = Math.cos(phi);
    const sinPhi = Math.sin(phi);
    const cosTheta = Math.cos(theta);
    const sinTheta = Math.sin(theta);

    const view = new Float32Array([
      cosTheta, sinTheta * sinPhi, sinTheta * cosPhi, 0,
      0, cosPhi, -sinPhi, 0,
      -sinTheta, cosTheta * sinPhi, cosTheta * cosPhi, 0,
      0, 0, -2.5 * scale, 1,
    ]);

    const aspect = options.width / options.height;
    const near = 0.1;
    const far = 10;
    const f = 1.0 / Math.tan((Math.PI / 8) * scale);

    const projection = new Float32Array([
      f / aspect, 0, 0, 0,
      0, f, 0, 0,
      0, 0, (far + near) / (near - far), -1,
      0, 0, (2 * far * near) / (near - far), 0,
    ]);

    return { view, projection };
  }

  function render() {
    if (disposed) return;

    resize();

    if (typeof options.onRender === "function") {
      const state = {
        phi: options.phi,
        theta: options.theta,
        width: options.width,
        height: options.height,
        scale: options.scale,
      };
      options.onRender(state);
      options.phi = state.phi;
      options.theta = state.theta;
      options.scale = state.scale;
      if (typeof state.width === "number" && typeof state.height === "number") {
        options.width = state.width;
        options.height = state.height;
      }
    }

    const { view, projection } = computeMatrices();

    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.enable(gl.DEPTH_TEST);

    gl.useProgram(program);
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 3, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);
    gl.enableVertexAttribArray(normalLocation);
    gl.vertexAttribPointer(normalLocation, 3, gl.FLOAT, false, 0, 0);

    gl.uniformMatrix4fv(viewLocation, false, view);
    gl.uniformMatrix4fv(projectionLocation, false, projection);
    gl.uniform3fv(baseColorLocation, options.baseColor);
    gl.uniform1f(diffuseLocation, options.diffuse);
    gl.uniform1f(darkLocation, options.dark);

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    gl.drawElements(gl.TRIANGLES, sphere.indices.length, gl.UNSIGNED_SHORT, 0);

    if (options.markers.length > 0) {
      gl.useProgram(markerProgram);
      gl.bindBuffer(gl.ARRAY_BUFFER, markerBuffer);
      gl.enableVertexAttribArray(markerPositionLocation);
      gl.vertexAttribPointer(markerPositionLocation, 3, gl.FLOAT, false, 0, 0);
      gl.uniformMatrix4fv(markerViewLocation, false, view);
      gl.uniformMatrix4fv(markerProjectionLocation, false, projection);
      gl.uniform3fv(markerColorLocation, options.markerColor);
      const size = 6 * options.devicePixelRatio;
      gl.uniform1f(markerSizeLocation, size);
      gl.enable(gl.BLEND);
      gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
      gl.drawArrays(gl.POINTS, 0, options.markers.length);
      gl.disable(gl.BLEND);
    }

    animationFrame = requestAnimationFrame(render);
  }

  render();

  return {
    setOptions(nextOptions = {}) {
      options = mergeOptions({ ...options, ...nextOptions });
      updateMarkerBuffer();
    },
    resize(width, height) {
      options = mergeOptions({ ...options, width, height });
    },
    destroy() {
      disposed = true;
      if (animationFrame) cancelAnimationFrame(animationFrame);
      gl.deleteBuffer(positionBuffer);
      gl.deleteBuffer(normalBuffer);
      gl.deleteBuffer(indexBuffer);
      gl.deleteBuffer(markerBuffer);
      gl.deleteProgram(program);
      gl.deleteProgram(markerProgram);
    },
  };
}

export default createGlobe;
