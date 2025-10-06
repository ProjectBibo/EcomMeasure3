import React from "react";

export default function Testimonial() {
  return (
    <section id="testimonial" className="bg-brand-graylight py-20">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 px-6 items-center">
        {/* Left video */}
        <div>
          <div className="aspect-video rounded-xl overflow-hidden border border-neutral-200 shadow-sm">
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/VIDEO_ID"
              title="Klantvideo"
              allowFullScreen
            ></iframe>
          </div>
        </div>

        {/* Right quote */}
        <div>
          <span className="inline-block text-xs bg-brand-yellow text-neutral-900 px-3 py-1 rounded-full font-bold mb-3">
            KLANTEN AAN HET WOORD
          </span>
          <blockquote className="bg-white border border-neutral-200 rounded-xl p-6 mb-4 shadow-sm">
            <p className="mb-3 text-neutral-700">
              “Goede communicatie en samenwerking. Duidelijke rapportages en
              verbeterpunten.”
            </p>
            <footer className="text-sm text-neutral-500">
              — Joey Tuinstra, Offenga BMW Onderdelen
            </footer>
          </blockquote>
          <a href="#reviews" className="text-brand-blue hover:underline font-medium">
            Bekijk alle reviews
          </a>
        </div>
      </div>
    </section>
  );
}

