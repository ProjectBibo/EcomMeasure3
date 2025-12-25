import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import useViewTransitionNavigate, {
  createViewTransitionClickHandler,
} from "../hooks/useViewTransitionNavigate";

export default function ServiceCard({
  icon: Icon,
  label,
  title,
  description,
  sections = [],
  ctaLabel,
  ctaTo = "/contact",
}) {
  const navigateWithTransition = useViewTransitionNavigate();
  const handleCtaClick = useMemo(
    () => createViewTransitionClickHandler(navigateWithTransition, ctaTo),
    [navigateWithTransition, ctaTo]
  );

  return (
    <article className="group relative flex h-full flex-col card-surface">
      <div className="flex items-start gap-4">
        {Icon ? (
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-blue/10 text-brand-blue ring-1 ring-brand-blue/20">
            <Icon />
          </div>
        ) : null}
        <div className="space-y-2">
          {label ? (
            <span className="inline-flex items-center rounded-full bg-brand-blue/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-brand-blue">
              {label}
            </span>
          ) : null}
          <h3 className="text-xl font-semibold leading-tight text-neutral-900 ">{title}</h3>
          {description ? <p className="text-sm text-neutral-700 ">{description}</p> : null}
        </div>
      </div>

      <div className="mt-6 space-y-4 text-sm leading-relaxed text-neutral-700 ">
        {sections.map((section) => (
          <div
            key={section.title}
            className="rounded-2xl bg-neutral-50/90 p-4 ring-1 ring-neutral-200/70"
          >
            <h4 className="text-sm font-semibold text-neutral-900 ">{section.title}</h4>
            <ul className="mt-3 space-y-2">
              {section.items.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span aria-hidden className="mt-1 h-1.5 w-1.5 rounded-full bg-brand-blue" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {ctaLabel ? (
        <div className="mt-8">
          <Link
            to={ctaTo}
            className="button-primary w-full justify-center text-sm"
            onClick={handleCtaClick}
          >
            {ctaLabel}
          </Link>
        </div>
      ) : null}
    </article>
  );
}
