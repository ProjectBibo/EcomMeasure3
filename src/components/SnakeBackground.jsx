import React from "react";
import { motion } from "framer-motion";

const puzzleColors = ["#004aad", "#009688", "#facc15"];

export default function SnakeBackground() {
  // Parallax scroll (beweeg langzaam naar beneden bij scroll)
  const [offset, setOffset] = React.useState(0);
  React.useEffect(() => {
    const onScroll = () => setOffset(window.scrollY * 0.2); // beweegt trager dan scroll
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className="absolute inset-0 -z-10 flex justify-center items-start opacity-20"
      style={{ transform: `translateY(${offset}px)` }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 800 200"
        className="w-[200%] h-auto"
      >
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.rect
            key={i}
            x={i * 70}
            y={80 + (i % 2 === 0 ? -10 : 10)} // slang-achtige kronkel
            width="60"
            height="60"
            rx="10"
            fill={puzzleColors[i % puzzleColors.length]}
            animate={{
              y: [
                80 + (i % 2 === 0 ? -10 : 10),
                80 + (i % 2 === 0 ? -5 : 5),
                80 + (i % 2 === 0 ? -10 : 10),
              ],
              rotate: [0, i % 2 === 0 ? 3 : -3, 0],
            }}
            transition={{
              duration: 6 + i, // ieder puzzelstukje iets andere snelheid
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </svg>
    </div>
  );
}

