import React from "react";

export default function SectionFallback({ label }) {
  return (
    <div className="flex min-h-[40vh] w-full items-center justify-center">
      <div className="flex items-center gap-3 rounded-2xl border border-white/40 bg-white/60 px-6 py-4 text-sm font-semibold uppercase tracking-[0.28em] text-neutral-500 shadow-[inset_0_1px_0_rgba(255,255,255,0.8),0_18px_45px_rgba(15,23,42,0.08)] backdrop-blur    ">
        {label}…
      </div>
    </div>
  );
}
