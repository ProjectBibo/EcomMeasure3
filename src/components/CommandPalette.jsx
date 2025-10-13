import React, { useEffect, useId, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useReducedMotion } from "framer-motion";
import { ArrowUpRight, Command as CommandIcon, Search, X } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../i18n/content";

const focusableSelectors = [
  "a[href]",
  "button:not([disabled])",
  "textarea:not([disabled])",
  "input:not([type='hidden']):not([disabled])",
  "select:not([disabled])",
  "[tabindex]:not([tabindex='-1'])",
].join(",");

const actionPrefetchCache = new Set();

export default function CommandPalette({ open, onOpenChange, onIntent }) {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const shouldReduceMotion = useReducedMotion();
  const t = translations[language].commandPalette;
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const dialogId = useId();
  const listId = `${dialogId}-list`;
  const liveRegionId = `${dialogId}-live`;
  const descriptionId = `${dialogId}-description`;
  const inputRef = useRef(null);
  const dialogRef = useRef(null);

  const actions = useMemo(() => {
    const baseActions = [
      {
        id: "contact",
        to: "/contact",
        title: t.actions.contact.title,
        description: t.actions.contact.description,
        icon: <ArrowUpRight size={16} aria-hidden />,
        keywords: ["contact", "kennismaking", "intro", "plan"],
      },
      {
        id: "cases",
        to: "/#cases",
        title: t.actions.cases.title,
        description: t.actions.cases.description,
        icon: <ArrowUpRight size={16} aria-hidden />,
        keywords: ["cases", "proof", "social", "stories"],
      },
      {
        id: "services",
        to: "/measurement",
        title: t.actions.services.title,
        description: t.actions.services.description,
        icon: <ArrowUpRight size={16} aria-hidden />,
        keywords: ["diensten", "services", "measurement", "cro", "consent"],
      },
    ];

    return baseActions.map((action) => ({
      ...action,
      searchTokens: [action.title, action.description, ...action.keywords]
        .join(" ")
        .toLowerCase(),
    }));
  }, [t.actions]);

  const filtered = useMemo(() => {
    if (!query.trim()) {
      return actions;
    }
    const needle = query.toLowerCase();
    return actions.filter((action) => action.searchTokens.includes(needle));
  }, [actions, query]);

  useEffect(() => {
    if (open) {
      setQuery("");
      setActiveIndex(0);
    }
  }, [open]);

  useEffect(() => {
    const handleKey = (event) => {
      const target = event.target;
      const tagName = target && target.tagName ? target.tagName.toLowerCase() : "";
      const isTextInput =
        tagName === "input" ||
        tagName === "textarea" ||
        (target && typeof target.isContentEditable === "boolean" && target.isContentEditable);

      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        if (isTextInput) {
          return;
        }
        event.preventDefault();
        onOpenChange(true);
      } else if (event.key === "Escape") {
        onOpenChange(false);
      }
    };

    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onOpenChange]);

  useEffect(() => {
    if (!open) return undefined;

    const previouslyFocused = document.activeElement;
    const handleKeyDown = (event) => {
      if (event.key !== "Tab") {
        return;
      }
      const node = dialogRef.current;
      const focusables = node ? Array.from(node.querySelectorAll(focusableSelectors)) : [];
      if (focusables.length === 0) {
        return;
      }
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      } else if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
      if (previouslyFocused && previouslyFocused.focus) {
        previouslyFocused.focus({ preventScroll: shouldReduceMotion });
      }
    };
  }, [open, shouldReduceMotion]);

  useEffect(() => {
    if (!open) return;
    const activeAction = filtered[activeIndex];
    if (!activeAction) return;
    if (actionPrefetchCache.has(activeAction.to)) return;
    actionPrefetchCache.add(activeAction.to);
    onIntent?.(activeAction.to);
  }, [activeIndex, filtered, onIntent, open]);

  useEffect(() => {
    if (!open) return;
    if (inputRef.current) {
      const timeout = window.setTimeout(() => {
        inputRef.current?.focus({ preventScroll: true });
      }, shouldReduceMotion ? 0 : 40);
      return () => window.clearTimeout(timeout);
    }
    return undefined;
  }, [open, shouldReduceMotion]);

  useEffect(() => {
    onOpenChange(false);
  }, [location.pathname, onOpenChange]);

  const closePalette = () => onOpenChange(false);

  const handleInputKey = (event) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((index) => (index + 1) % Math.max(filtered.length, 1));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((index) => (index - 1 + Math.max(filtered.length, 1)) % Math.max(filtered.length, 1));
    } else if (event.key === "Enter") {
      event.preventDefault();
      const action = filtered[activeIndex];
      if (action) {
        navigate(action.to);
        closePalette();
      }
    }
  };

  const resultsLabel = filtered.length === 1 ? t.resultsCount.singular : t.resultsCount.plural.replace("{{count}}", filtered.length);

  if (!open) {
    return null;
  }

  return (
    <div
      aria-labelledby={dialogId}
      aria-describedby={descriptionId}
      aria-modal="true"
      className="fixed inset-0 z-[70] flex items-start justify-center bg-neutral-950/60 px-4 pb-16 pt-28 backdrop-blur"
      role="dialog"
      ref={dialogRef}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          closePalette();
        }
      }}
    >
      <div
        className={`w-full max-w-xl overflow-hidden rounded-3xl border border-white/20 bg-white/90 text-left shadow-[0_40px_90px_rgba(15,23,42,0.35)] backdrop-blur-xl transition duration-200 ease-out dark:border-white/10 dark:bg-surface-dark/90 dark:shadow-[0_44px_95px_rgba(2,6,23,0.65)]`}
      >
        <div className="flex items-center justify-between border-b border-white/30 px-5 py-4 text-xs font-semibold uppercase tracking-[0.28em] text-neutral-500 dark:border-white/10 dark:text-gray-400">
          <span id={dialogId} className="flex items-center gap-2">
            <CommandIcon size={16} aria-hidden />
            {t.title}
          </span>
          <button
            type="button"
            onClick={closePalette}
            className="inline-flex items-center gap-2 rounded-full border border-neutral-200/60 bg-white/80 px-3 py-1.5 text-[11px] font-semibold tracking-[0.18em] text-neutral-600 shadow-sm transition hover:border-neutral-300 hover:text-neutral-800 dark:border-white/10 dark:bg-white/10 dark:text-gray-300"
            aria-label={t.close}
          >
            <span aria-hidden>Esc</span>
            <X size={14} aria-hidden />
          </button>
        </div>
        <div className="space-y-5 px-5 py-5">
          <p id={descriptionId} className="text-sm text-neutral-500 dark:text-gray-400">
            {t.description}
          </p>
          <div className="relative">
            <Search size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" aria-hidden />
            <input
              ref={inputRef}
              type="search"
              className="w-full rounded-2xl border border-neutral-200/60 bg-white/90 py-3 pl-11 pr-4 text-base font-medium text-neutral-900 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal focus-visible:ring-offset-2 dark:border-white/10 dark:bg-white/10 dark:text-white"
              placeholder={t.placeholder}
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              onKeyDown={handleInputKey}
              aria-controls={listId}
              aria-expanded={true}
              aria-autocomplete="list"
              aria-activedescendant={filtered[activeIndex] ? `${listId}-${filtered[activeIndex].id}` : undefined}
            />
            <p className="mt-2 text-xs text-neutral-400 dark:text-gray-500">{t.shortcutsHint}</p>
          </div>
          <div>
            <p className="px-1 text-[11px] font-semibold uppercase tracking-[0.32em] text-neutral-400 dark:text-gray-500">
              {t.groups.primary}
            </p>
            <ul id={listId} role="listbox" aria-labelledby={dialogId} className="mt-3 space-y-2">
              {filtered.length === 0 && (
                <li className="rounded-2xl border border-dashed border-neutral-200/70 bg-white/60 px-4 py-6 text-sm text-neutral-500 dark:border-white/10 dark:bg-white/5 dark:text-gray-400">
                  {t.empty}
                </li>
              )}
              {filtered.map((action, index) => (
                <li
                  key={action.id}
                  id={`${listId}-${action.id}`}
                  role="option"
                  aria-selected={index === activeIndex}
                  className={`group overflow-hidden rounded-2xl border border-transparent transition focus-within:border-brand-teal focus-within:ring-2 focus-within:ring-brand-teal/40 dark:focus-within:border-brand-teal/50 dark:focus-within:ring-brand-teal/25 ${
                    index === activeIndex ? "border-brand-teal/80 dark:border-brand-teal/50" : "border-neutral-200/70 dark:border-white/10"
                  }`}
                >
                  <button
                    type="button"
                    className={`flex w-full items-center justify-between gap-4 rounded-2xl bg-white/80 px-4 py-3 text-left shadow-[0_14px_30px_rgba(15,23,42,0.12)] transition hover:-translate-y-0.5 hover:shadow-[0_24px_55px_rgba(15,23,42,0.18)] dark:bg-white/10 dark:shadow-[0_18px_40px_rgba(2,6,23,0.55)] ${
                      index === activeIndex ? "ring-1 ring-brand-teal/50 dark:ring-brand-teal/40" : ""
                    }`}
                    onClick={() => {
                      navigate(action.to);
                      closePalette();
                    }}
                    onMouseEnter={() => {
                      setActiveIndex(index);
                      onIntent?.(action.to);
                    }}
                    onFocus={() => {
                      setActiveIndex(index);
                      onIntent?.(action.to);
                    }}
                  >
                    <div>
                      <p className="text-sm font-semibold text-neutral-900 dark:text-white">{action.title}</p>
                      <p className="mt-1 text-xs text-neutral-500 dark:text-gray-400">{action.description}</p>
                    </div>
                    <span className="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-200/60 bg-white/80 text-neutral-600 shadow-sm transition group-hover:translate-x-0.5 group-hover:text-brand-blue dark:border-white/10 dark:bg-white/10 dark:text-gray-300">
                      {action.icon}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div id={liveRegionId} aria-live="polite" className="sr-only">
        {resultsLabel}
      </div>
    </div>
  );
}
