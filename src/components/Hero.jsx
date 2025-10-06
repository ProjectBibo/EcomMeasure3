// src/components/Hero.jsx
import React from "react";

export default function Hero() {
  return (
    <section className="py-20 text-center">
      <h1 className="text-4xl md:text-5xl font-extrabold">
        Hero werkt 🎉
      </h1>
      <p className="mt-4 text-neutral-600 dark:text-gray-300">
        Minimale smoke test — als je dit ziet, rendert de app correct.
      </p>
    </section>
  );
}
