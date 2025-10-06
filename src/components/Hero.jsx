import React from "react";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section
      id="hero"
      className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 px-6 py-20 items-center"
    >
      {/* Left text */}
      <div>
        <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6 text-neutral-900">
          Bereik een geoptimaliseerde website dankzij een{" "}
          <span className="text-brand-blue">data- én mens-gedreven</span>{" "}
          aanpak
        </h1>
        <p className="text-neutral-600 mb-8">
          Samen met jou ontdekken we hoe we jouw website zó optimaliseren dat je er het volledige potentieel uit kunt halen.
        </p>
        <a
          href="#contact"
          className="inline-flex items-center gap-2 px-6 py-3 bg-brand-blue text-white font-semibold rounded-md hover:bg-blue-800 transition"
        >
          Zijn wij een goede match? <ArrowRight size={18} />
        </a>
        <div className="mt-4">
          <a href="#results" className="text-sm text-neutral-600 hover:underline">
            Bekijk hoe wij resultaat halen
          </a>
        </div>
      </div>

      {/* Right image */}
      <div className="flex justify-center">
        <img
          src="https://dummyimage.com/500x350/f2f6fb/004aad&text=Illustratie"
          alt="Illustratie samenwerking"
          className="rounded-xl shadow-lg"
        />
      </div>
    </section>
  );
}

