import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../i18n/content";
import useViewTransitionNavigate, {
  createViewTransitionClickHandler,
} from "../hooks/useViewTransitionNavigate";

export default function Footer() {
  const shouldReduceMotion = useReducedMotion();
  const { language } = useLanguage();
  const t = translations[language].footer;
  const navigateWithTransition = useViewTransitionNavigate();

  const columns = [
    t.columns.services,
    t.columns.popular,
    t.columns.tools,
    t.columns.company,
  ];

  return (
    <footer data-snap-section className="relative mt-16 overflow-hidden bg-surface-soft border-t border-neutral-200 py-14">
      <motion.div
        animate={shouldReduceMotion ? { backgroundPosition: "0% 50%" } : { backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
        transition={shouldReduceMotion ? undefined : { duration: 15, repeat: Infinity, ease: "linear" }}
        className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-brand-blue to-brand-teal bg-[length:200%_200%]"
      />
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid gap-10 md:grid-cols-5">
          <div className="max-w-sm space-y-3">
            <h4 className="font-semibold text-brand-blue">EcomMeasure</h4>
            <p className="text-neutral-600 text-sm leading-relaxed">{t.intro}</p>
            <Link
              to="/contact"
              className="inline-block rounded-md bg-brand-yellow px-4 py-2 text-sm font-medium text-neutral-900 transition hover:bg-brand-yellow-dark"
              onClick={createViewTransitionClickHandler(navigateWithTransition, "/contact")}
            >
              {t.cta}
            </Link>
          </div>
          {columns.map((column) => (
            <div key={column.title}>
              <h4 className="font-semibold mb-3 text-brand-blue">{column.title}</h4>
              <ul className="space-y-2 text-sm text-neutral-600">
                {column.items.map((item) => (
                  <li key={item.href}>
                    <Link
                      to={item.href}
                      className="text-neutral-600 transition-colors hover:text-brand-blue"
                      onClick={createViewTransitionClickHandler(navigateWithTransition, item.href)}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-10 border-t border-neutral-200">
        <div className="max-w-7xl mx-auto px-6 flex flex-col gap-4 py-4 text-xs text-neutral-600 md:flex-row md:items-center md:justify-between">
          <div className="text-center md:text-left">
            © {new Date().getFullYear()} EcomMeasure. {t.rights}
          </div>
          <div className="flex flex-wrap justify-center gap-4 md:justify-end">
            {t.bottomLinks.map((link) => {
              const isInternal = link.href.startsWith("/") && !link.href.startsWith("//");

              if (isInternal) {
                return (
                  <Link
                    key={link.href}
                    to={link.href}
                    className="transition-colors hover:text-brand-blue"
                    onClick={createViewTransitionClickHandler(navigateWithTransition, link.href)}
                  >
                    {link.label}
                  </Link>
                );
              }

              return (
                <a key={link.href} href={link.href} className="transition-colors hover:text-brand-blue">
                  {link.label}
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
}
