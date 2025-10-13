import React from "react";

export default function ConfettiLayer({ bursts }) {
  if (!bursts || bursts.length === 0) {
    return null;
  }

  return (
    <div className="confetti-layer" aria-hidden>
      {bursts.map((burst) => (
        <div
          key={burst.key}
          className="confetti-burst"
          style={{
            left: `${burst.x}px`,
            top: `${burst.y}px`,
            animationDuration: `${burst.duration}ms`,
            "--confetti-duration": `${burst.duration}ms`,
          }}
        >
          {burst.pieces.map((piece) => (
            <span
              key={piece.id}
              className="confetti-piece"
              style={{
                "--offset-x": `${piece.offsetX}px`,
                "--offset-y": `${piece.offsetY}px`,
                "--confetti-rotation": `${piece.rotation}deg`,
                "--confetti-scale": piece.scale,
                "--confetti-delay": `${piece.delay}ms`,
                "--confetti-duration": `${burst.duration}ms`,
                background: `hsla(${piece.hue}, 92%, ${piece.delay % 2 === 0 ? 62 : 74}%, 0.95)`,
              }}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
