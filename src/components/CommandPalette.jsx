import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useLocation, useNavigate } from "react-router-dom";
import { Command as CommandIcon, ExternalLink, Search } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { blogPosts } from "../data/blogPosts";

const isClient = typeof document !== "undefined";

function getMotionPreference() {
  if (typeof window === "undefined" || !window.matchMedia) return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export default function CommandPalette({ isOpen, onOpenChange, onRequestClose }) {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const inputRef = useRef(null);
  const dialogRef = useRef(null);
  const listboxId = useRef(`cmdk-listbox-${Math.random().toString(36).slice(2)}`).current;
  const headingId = useRef(`cmdk-heading-${Math.random().toString(36).slice(2)}`).current;
  const liveRegionRef = useRef(null);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const [announcement, setAnnouncement] = useState("");

  const closePalette = useCallback(() => {
    onOpenChange(false);
    if (onRequestClose) {
      onRequestClose();
    }
  }, [onOpenChange, onRequestClose]);

  const focusTarget = useCallback((hash) => {
    if (!hash) return;
    const elementId = hash.replace(/^#/, "");
    const prefersReduced = getMotionPreference();
    window.setTimeout(() => {
      const el = document.getElementById(elementId);
      if (!el) return;
      el.scrollIntoView({ behavior: prefersReduced ? "auto" : "smooth", block: "start" });
      if (typeof el.focus === "function") {
        el.focus({ preventScroll: true });
      }
    }, 120);
  }, []);

  const goTo = useCallback(
    (target) => {
      if (!target) return;
      closePalette();
      if (target.startsWith("http")) {
        window.open(target, "_blank", "noopener");
        return;
      }
      if (target.startsWith("mailto:")) {
        window.location.href = target;
        return;
      }
      const [pathname, hash = ""] = target.split("#");
      const next = hash ? `${pathname}#${hash}` : pathname;
      if (next === `${location.pathname}${location.hash}`) {
        focusTarget(hash);
        return;
      }
      navigate(next);
      focusTarget(hash);
    },
    [closePalette, focusTarget, navigate, location.pathname, location.hash]
  );

  const baseCommands = useMemo(() => {
    if (language === "nl") {
      return [
        {
          id: "contact",
          label: "Plan een kennismaking",
          description: "Plan direct een afspraak of neem contact op via mail.",
          to: "/contact",
          keywords: ["kennismaking", "call", "afspraak", "contact"],
        },
        {
          id: "cases",
          label: "Cases",
          description: "Bekijk resultaten en learnings uit recente trajecten.",
          to: "/#case",
          keywords: ["case", "resultaat", "bewijzen"],
        },
        {
          id: "services",
          label: "Diensten",
          description: "Ontdek measurement, consent en CRO-aanpak.",
          to: "/#services",
          keywords: ["diensten", "services", "measurement", "cro"],
        },
      ];
    }
    return [
      {
        id: "contact",
        label: "Book an intro call",
        description: "Schedule a discovery call or reach out via email.",
        to: "/contact",
        keywords: ["contact", "call", "intro"],
      },
      {
        id: "cases",
        label: "Case studies",
        description: "Explore recent wins and learnings.",
        to: "/#case",
        keywords: ["cases", "proof", "results"],
      },
      {
        id: "services",
        label: "Services",
        description: "Dive into measurement, consent and CRO capabilities.",
        to: "/#services",
        keywords: ["services", "measurement", "cro"],
      },
    ];
  }, [language]);

  const blogCommands = useMemo(() => {
    const trimmed = blogPosts.slice(0, 6);
    return trimmed.map((post) => {
      const introCopy = post.intro?.[language] ?? "";
      const summary = introCopy.length > 140 ? `${introCopy.slice(0, 137)}…` : introCopy;
      const tagList = Array.isArray(post.tags) ? post.tags : [];
      return {
        id: post.slug,
        label: post.navLabel[language],
        description: summary,
        to: `/blog/${post.slug}`,
        keywords: ["blog", post.slug, ...tagList],
        icon: <ExternalLink size={14} aria-hidden />,
      };
    });
  }, [language]);

  const commands = useMemo(() => [...baseCommands, ...blogCommands], [baseCommands, blogCommands]);

  const filteredCommands = useMemo(() => {
    if (!query.trim()) return commands;
    const lower = query.trim().toLowerCase();
    return commands.filter((cmd) => {
      if (cmd.label.toLowerCase().includes(lower)) return true;
      if (cmd.description?.toLowerCase().includes(lower)) return true;
      return cmd.keywords?.some((keyword) => keyword.toLowerCase().includes(lower));
    });
  }, [commands, query]);

  const activeOptionId = filteredCommands[activeIndex]
    ? `${listboxId}-option-${filteredCommands[activeIndex].id}`
    : undefined;

  useEffect(() => {
    if (!isOpen) return;
    setActiveIndex(0);
    setAnnouncement("");
    const id = window.setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
        inputRef.current.select();
      }
    }, 16);
    return () => window.clearTimeout(id);
  }, [isOpen]);

  useEffect(() => {
    if (!liveRegionRef.current) return;
    const message = filteredCommands.length
      ? `${filteredCommands.length} ${language === "nl" ? "resultaten" : "results"}`
      : language === "nl" ? "Geen resultaten" : "No results";
    setAnnouncement(message);
  }, [filteredCommands.length, language]);

  useEffect(() => {
    const handleKey = (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        onOpenChange((prev) => !prev);
      }
    };
    if (typeof window === "undefined") return undefined;
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onOpenChange]);

  useEffect(() => {
    if (!isOpen) return undefined;
    const handleKey = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closePalette();
      }
      if (event.key === "ArrowDown") {
        event.preventDefault();
        setActiveIndex((prev) => (prev + 1) % Math.max(filteredCommands.length, 1));
      }
      if (event.key === "ArrowUp") {
        event.preventDefault();
        setActiveIndex((prev) => {
          const total = Math.max(filteredCommands.length, 1);
          return (prev - 1 + total) % total;
        });
      }
      if (event.key === "Enter") {
        if (!filteredCommands.length) return;
        event.preventDefault();
        const command = filteredCommands[activeIndex];
        if (command) {
          goTo(command.to);
        }
      }
    };

    const trapFocus = (event) => {
      if (event.key !== "Tab" || !dialogRef.current) return;
      const focusable = dialogRef.current.querySelectorAll(
        'input, button, [href], [tabindex]:not([tabindex="-1"])'
      );
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKey);
    document.addEventListener("keydown", trapFocus);
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.removeEventListener("keydown", trapFocus);
    };
  }, [activeIndex, closePalette, filteredCommands, goTo, isOpen]);

  if (!isClient || !isOpen) {
    return null;
  }

  return createPortal(
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center bg-neutral-950/40 px-4 py-10 backdrop-blur-sm"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          closePalette();
        }
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={headingId}
        ref={dialogRef}
        className="relative w-full max-w-xl overflow-hidden rounded-3xl border border-white/20 bg-white/90 shadow-[0_34px_120px_rgba(15,23,42,0.42)] backdrop-blur-xl focus:outline-none dark:border-white/10 dark:bg-surface-dark/95 dark:shadow-[0_40px_140px_rgba(2,6,23,0.8)]"
      >
        <div className="flex items-center gap-3 border-b border-neutral-200/60 bg-white/70 px-5 py-4 text-neutral-500 dark:border-white/10 dark:bg-white/5 dark:text-gray-300">
          <Search size={16} aria-hidden />
          <div className="flex-1">
            <label htmlFor={`${listboxId}-search`} className="sr-only">
              {language === "nl" ? "Zoek commando" : "Search command"}
            </label>
            <input
              id={`${listboxId}-search`}
              ref={inputRef}
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={language === "nl" ? "Waar wil je naartoe?" : "Where do you want to go?"}
              className="w-full border-none bg-transparent text-base text-neutral-900 placeholder:text-neutral-400 focus:outline-none dark:text-white"
              type="search"
              role="combobox"
              aria-autocomplete="list"
              aria-expanded="true"
              aria-controls={listboxId}
              aria-activedescendant={activeOptionId}
            />
          </div>
          <kbd className="hidden items-center gap-1 rounded-md border border-neutral-300 bg-white px-2 py-1 text-[11px] font-medium text-neutral-500 shadow-sm sm:flex dark:border-white/20 dark:bg-white/10 dark:text-gray-300">
            <CommandIcon size={12} />
            K
          </kbd>
        </div>

        <div role="listbox" id={listboxId} aria-labelledby={headingId} className="max-h-80 overflow-y-auto bg-white/85 p-3 backdrop-blur dark:bg-transparent">
          <h2 id={headingId} className="sr-only">
            {language === "nl" ? "Zoekresultaten" : "Search results"}
          </h2>
          {filteredCommands.length === 0 ? (
            <p className="px-4 py-6 text-sm text-neutral-500 dark:text-gray-400">
              {language === "nl" ? "Geen resultaten. Probeer andere zoekwoorden." : "No matches. Try different keywords."}
            </p>
          ) : (
            <ul className="space-y-1">
              {filteredCommands.map((command, index) => {
                const isActive = index === activeIndex;
                const optionId = `${listboxId}-option-${command.id}`;
                return (
                  <li key={command.id}>
                    <button
                      type="button"
                      onClick={() => goTo(command.to)}
                      className={`group flex w-full items-center justify-between gap-3 rounded-2xl border border-transparent px-4 py-3 text-left transition focus:outline-none ${
                        isActive
                          ? "bg-brand-blue/10 text-brand-blue shadow-[0_18px_40px_rgba(59,130,246,0.24)]"
                          : "bg-white/60 text-neutral-700 hover:bg-brand-blue/5 dark:bg-white/5 dark:text-gray-100 dark:hover:bg-white/10"
                      }`}
                      role="option"
                      aria-selected={isActive}
                      id={optionId}
                    >
                      <div>
                        <p className="text-sm font-semibold">
                          {command.label}
                        </p>
                        {command.description && (
                          <p className="mt-1 text-xs text-neutral-500 dark:text-gray-400">
                            {command.description}
                          </p>
                        )}
                      </div>
                      <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.24em] text-neutral-400">
                        {command.icon ?? <span aria-hidden>↵</span>}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
        <button
          type="button"
          onClick={closePalette}
          className="absolute right-4 top-4 rounded-full border border-neutral-200/60 bg-white/70 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-neutral-500 transition hover:border-neutral-300 hover:text-neutral-700 dark:border-white/10 dark:bg-white/10 dark:text-gray-400"
        >
          {language === "nl" ? "Sluiten" : "Close"}
        </button>
        <div ref={liveRegionRef} aria-live="polite" className="sr-only">
          {announcement}
        </div>
      </div>
    </div>,
    document.body
  );
}
