// src/components/Header.jsx
import React, {
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { Link, NavLink, useLocation } from "react-router-dom";
import { ChevronDown, Command, Menu, Moon, Sun, X } from "lucide-react";
import { useReducedMotion } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../i18n/content";
import { blogPosts } from "../data/blogPosts";
import CommandPalette from "./CommandPalette";

const routePrefetchers = {
  "/": () => import("../pages/Home"),
  "/about": () => import("../pages/About"),
  "/measurement": () => import("../pages/Measurement"),
  "/consent-mode": () => import("../pages/ConsentMode"),
  "/cro": () => import("../pages/Cro"),
  "/contact": () => import("../pages/ContactPage"),
  "/blog": () => import("../pages/BlogArticle"),
  "/tools/bayesian-ab-test": () => import("../pages/BayesianCalculator"),
  "/tools/cro-roi": () => import("../pages/CroRoiCalculator"),
};

const flags = {
  nl: "🇳🇱",
  en: "🇬🇧",
};

const focusableSelector =
  'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"]), [role="menuitem"]';

function DesktopDropdownLayer({
  anchor,
  items,
  dropdownLinkClass,
  menuLabel,
  menuId,
  onNavigate,
  onClose,
  registerMenuNode,
  prefetchRoute,
  triggerId,
}) {
  const menuRef = useRef(null);
  const [left, setLeft] = useState(() => {
    if (!anchor) return 0;
    return anchor.rect.left + anchor.scrollX;
  });

  const top = useMemo(() => {
    if (!anchor) return 0;
    return anchor.rect.bottom + anchor.scrollY + 12;
  }, [anchor]);

  const updatePosition = useCallback(() => {
    if (!anchor || !menuRef.current) return;
    const menuRect = menuRef.current.getBoundingClientRect();
    const viewportPadding = 16;
    const desiredLeft = anchor.rect.left + anchor.scrollX;
    const viewportRight = anchor.scrollX + anchor.viewportWidth - viewportPadding;
    const maxLeft = viewportRight - menuRect.width;
    const clampedLeft = Math.max(anchor.scrollX + viewportPadding, Math.min(desiredLeft, maxLeft));
    setLeft(clampedLeft);
  }, [anchor]);

  const setMenuNode = useCallback(
    (node) => {
      menuRef.current = node;
      registerMenuNode(node);
    },
    [registerMenuNode]
  );

  useLayoutEffect(() => {
    updatePosition();
  }, [updatePosition, anchor]);

  useEffect(() => {
    if (!menuRef.current) return;
    const focusable = menuRef.current.querySelectorAll(focusableSelector);
    if (focusable.length) {
      const first = focusable[0];
      if (first && typeof first.focus === "function") {
        first.focus({ preventScroll: true });
      }
    }
  }, [items]);

  useEffect(() => {
    if (!anchor) return;
    updatePosition();
  }, [anchor, updatePosition]);

  const handleKeyDown = (event) => {
    if (event.key === "Escape") {
      event.preventDefault();
      onClose({ focusTrigger: true });
      return;
    }

    if (event.key === "Tab") {
      const focusable = menuRef.current?.querySelectorAll(focusableSelector);
      if (!focusable || !focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey) {
        if (document.activeElement === first) {
          event.preventDefault();
          onClose({ focusTrigger: true });
        }
        return;
      }
      if (document.activeElement === last) {
        event.preventDefault();
        first.focus({ preventScroll: true });
      }
    }
  };

  if (typeof document === "undefined") return null;

  return createPortal(
    <div className="fixed inset-0 z-[90]" role="presentation">
      <div
        className="absolute inset-0"
        aria-hidden
        onPointerDown={() => onClose({ focusTrigger: false })}
      />
      <div
        id={menuId}
        ref={setMenuNode}
        role="menu"
        aria-labelledby={triggerId}
        className="pointer-events-auto absolute w-72 rounded-2xl border border-neutral-200/80 bg-white/95 p-3 shadow-[0_16px_36px_rgba(15,23,42,0.15)] backdrop-blur dark:border-white/10 dark:bg-white/5 dark:shadow-[0_20px_44px_rgba(2,6,23,0.45)]"
        style={{ top, left }}
        onKeyDown={handleKeyDown}
      >
        <span className="px-3 text-xs font-semibold uppercase tracking-[0.32em] text-neutral-500 dark:text-gray-400">
          {menuLabel}
        </span>
        <div className="mt-2 space-y-1.5">
          {items.map((item) => (
            <NavLink
              key={item.id}
              to={item.to}
              role="menuitem"
              className={dropdownLinkClass}
              onMouseEnter={() => prefetchRoute(item.to)}
              onFocus={() => prefetchRoute(item.to)}
              onClick={() => {
                onNavigate();
              }}
            >
              <span>{item.label}</span>
              <span aria-hidden>→</span>
            </NavLink>
          ))}
        </div>
      </div>
    </div>,
    document.body
  );
}

export default function Header() {
  const headerRef = useRef(null);
  const progressRef = useRef(null);
  const dropdownMenuRef = useRef(null);
  const dropdownTriggers = useRef(new Map());
  const prefetchedRoutes = useRef(new Set());
  const { language, changeLanguage } = useLanguage();
  const t = translations[language].header;
  const shouldReduceMotion = useReducedMotion();
  const nextLanguage = language === "nl" ? "en" : "nl";
  const [isDark, setIsDark] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isCondensed, setIsCondensed] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [isPaletteOpen, setIsPaletteOpen] = useState(false);
  const [dropdownAnchor, setDropdownAnchor] = useState(null);
  const menuId = useId();
  const location = useLocation();

  const blogLinks = useMemo(
    () =>
      blogPosts.map((post) => ({
        id: post.slug,
        to: `/blog/${post.slug}`,
        label: post.navLabel[language],
      })),
    [language]
  );

  const { about, blogLabel, contact, toolsLabel, toolsItems } = t.nav;
  const commandCopy = t.command;

  const toolLinks = useMemo(
    () =>
      toolsItems.map((item) => ({
        id: item.href,
        to: item.href,
        label: item.label,
      })),
    [toolsItems]
  );

  const navLinks = useMemo(
    () => [
      { id: "about", type: "link", to: "/about", label: about },
      { id: "blog", type: "dropdown", label: blogLabel, items: blogLinks },
      { id: "tools", type: "dropdown", label: toolsLabel, items: toolLinks },
      { id: "contact", type: "link", to: "/contact", label: contact },
    ],
    [about, blogLabel, blogLinks, contact, toolLinks, toolsLabel]
  );

  const prefetchRoute = useCallback((target) => {
    if (!target) return;
    const raw = typeof target === "string" ? target : String(target);
    const withoutQuery = raw.split("?")[0];
    const [path] = withoutQuery.split("#");
    const key = path || "/";
    if (prefetchedRoutes.current.has(key)) return;
    const loader =
      routePrefetchers[key] ||
      (key.startsWith("/blog/") ? routePrefetchers["/blog"] : undefined) ||
      (key === "/" ? routePrefetchers["/"] : undefined);
    if (loader) {
      prefetchedRoutes.current.add(key);
      loader();
    }
  }, []);

  const themeTitle = language === "nl"
    ? isDark
      ? "Schakel naar licht thema"
      : "Schakel naar donker thema"
    : isDark
    ? "Switch to light theme"
    : "Switch to dark theme";

  const themeLabel = language === "nl" ? (isDark ? "Licht" : "Donker") : isDark ? "Light" : "Dark";

  useEffect(() => {
    if (typeof document === "undefined") return;
    setIsDark(document.documentElement.classList.contains("dark"));
  }, []);

  const updateThemePreference = (next) => {
    if (typeof document === "undefined") return;
    const html = document.documentElement;
    html.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
    setIsDark(next);

    html.classList.add("theme-transition");
    window.setTimeout(() => html.classList.remove("theme-transition"), 250);
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", next ? "#0f172a" : "#fafaf7");
  };

  const toggleDark = () => updateThemePreference(!isDark);
  const toggleLanguage = () => changeLanguage(nextLanguage);

  useEffect(() => {
    if (typeof window === "undefined") return;

    let lastScrollY = window.scrollY;
    let ticking = false;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsCondensed(currentScrollY > 80);

      if (currentScrollY <= 0) {
        setIsHidden(false);
        lastScrollY = currentScrollY;
        ticking = false;
        return;
      }

      if (currentScrollY > lastScrollY && currentScrollY > 140) {
        setIsHidden(true);
      } else if (currentScrollY < lastScrollY) {
        setIsHidden(false);
      }

      lastScrollY = currentScrollY;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(handleScroll);
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const updateOffset = () => {
      if (!headerRef.current) return;
      const height = headerRef.current.offsetHeight;
      document.documentElement.style.setProperty("--header-offset", `${height}px`);
    };

    updateOffset();
    window.addEventListener("resize", updateOffset);
    return () => window.removeEventListener("resize", updateOffset);
  }, [isMenuOpen, isCondensed]);

  useEffect(() => {
    if (typeof window === "undefined") return undefined;
    const bar = progressRef.current;
    if (!bar) return undefined;

    if (shouldReduceMotion) {
      bar.style.transitionDuration = "0ms";
    } else {
      bar.style.transitionDuration = "160ms";
    }

    let rafId = null;

    const updateProgress = () => {
      const { scrollHeight } = document.documentElement;
      const maxScroll = scrollHeight - window.innerHeight;
      const progress = maxScroll <= 0 ? 0 : Math.min(window.scrollY / maxScroll, 1);
      bar.style.transform = `scaleX(${progress})`;
      rafId = null;
    };

    const scheduleUpdate = () => {
      if (rafId) return;
      rafId = window.requestAnimationFrame(updateProgress);
    };

    updateProgress();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", updateProgress);

    return () => {
      if (rafId) {
        window.cancelAnimationFrame(rafId);
      }
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", updateProgress);
    };
  }, [shouldReduceMotion]);

  useEffect(() => {
    if (!isMenuOpen) return;
    const handleKey = (event) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isMenuOpen]);

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const media = window.matchMedia("(min-width: 768px)");
    const handleChange = (event) => {
      if (event.matches) {
        setIsMenuOpen(false);
      }
    };
    if (media.addEventListener) {
      media.addEventListener("change", handleChange);
    } else {
      media.addListener(handleChange);
    }
    return () => {
      if (media.removeEventListener) {
        media.removeEventListener("change", handleChange);
      } else {
        media.removeListener(handleChange);
      }
    };
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
    setOpenDropdown(null);
  }, [location.pathname]);

  useEffect(() => {
    if (!isMenuOpen) {
      setOpenDropdown(null);
    }
  }, [isMenuOpen]);

  const focusDropdownTrigger = useCallback((id) => {
    if (!id) return;
    const trigger = dropdownTriggers.current.get(id);
    if (!trigger) return;
    window.requestAnimationFrame(() => {
      if (typeof trigger.focus === "function") {
        trigger.focus({ preventScroll: true });
      }
    });
  }, []);

  const registerDropdownMenu = useCallback((node) => {
    dropdownMenuRef.current = node;
  }, []);

  useEffect(() => {
    if (!openDropdown) {
      setDropdownAnchor(null);
      dropdownMenuRef.current = null;
      return undefined;
    }

    const updateAnchor = () => {
      if (typeof window === "undefined") return;
      const trigger = dropdownTriggers.current.get(openDropdown);
      if (!trigger) return;
      const rect = trigger.getBoundingClientRect();
      setDropdownAnchor({
        id: openDropdown,
        rect: {
          top: rect.top,
          left: rect.left,
          right: rect.right,
          bottom: rect.bottom,
          width: rect.width,
          height: rect.height,
        },
        scrollX: window.scrollX,
        scrollY: window.scrollY,
        viewportWidth: window.innerWidth,
      });
    };

    updateAnchor();

    const handleResize = () => updateAnchor();
    const handleScroll = () => updateAnchor();

    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll, true);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll, true);
    };
  }, [openDropdown]);

  useEffect(() => {
    if (!openDropdown) return undefined;

    const handlePointerDown = (event) => {
      const trigger = dropdownTriggers.current.get(openDropdown);
      if (trigger?.contains(event.target)) return;
      if (dropdownMenuRef.current?.contains(event.target)) return;
      setOpenDropdown(null);
    };

    const handleFocusIn = (event) => {
      const trigger = dropdownTriggers.current.get(openDropdown);
      if (trigger?.contains(event.target)) return;
      if (dropdownMenuRef.current?.contains(event.target)) return;
      setOpenDropdown(null);
    };

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        const currentId = openDropdown;
        setOpenDropdown(null);
        focusDropdownTrigger(currentId);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("focusin", handleFocusIn);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("focusin", handleFocusIn);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [focusDropdownTrigger, openDropdown]);

  const menuButtonLabel = isMenuOpen ? t.menu.close : t.menu.open;

  const navLinkClass = ({ isActive }) =>
    `nav-underline text-neutral-700 transition-colors dark:text-gray-200 ${
      isActive ? "nav-underline--active text-brand-blue dark:text-brand-blue" : ""
    }`;

  const dropdownLinkClass = ({ isActive }) =>
    `flex items-start justify-between rounded-xl px-3 py-2 text-sm font-semibold text-neutral-700 transition hover:bg-neutral-100/80 dark:text-gray-100 dark:hover:bg-white/10 ${
      isActive ? "text-brand-blue dark:text-brand-blue" : ""
    }`;

  return (
    <>
      <header
        ref={headerRef}
        data-condensed={isCondensed}
        className={`sticky top-0 z-50 w-full transform-gpu transition-transform duration-300 ease-out ${
          isHidden ? "-translate-y-full" : "translate-y-0"
        }`}
      >
        <div className="progress-rail" aria-hidden>
          <span ref={progressRef} className="progress-bar" />
        </div>
        <div
          className={`border-b border-neutral-200/60 bg-white/75 backdrop-blur transition-[background,box-shadow] duration-300 ease-out dark:border-neutral-800/60 dark:bg-surface-dark/75 ${
            isCondensed
              ? "shadow-[0_16px_40px_rgba(15,23,42,0.12)] backdrop-blur-xl dark:shadow-[0_20px_48px_rgba(2,6,23,0.55)]"
              : "shadow-none"
          }`}
        >
          <div
            className={`mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 transition-[height,padding] duration-300 ${
              isCondensed ? "h-10" : "h-12"
            }`}
          >
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => setIsMenuOpen((open) => !open)}
                className="inline-flex items-center gap-2 rounded-full border border-neutral-200/70 bg-white/90 px-3 py-1.5 text-sm font-semibold text-neutral-700 shadow-sm backdrop-blur transition hover:border-neutral-300 hover:shadow-md dark:border-white/10 dark:bg-white/10 dark:text-gray-200 md:hidden"
                aria-expanded={isMenuOpen}
                aria-controls={menuId}
                aria-label={menuButtonLabel}
              >
                {isMenuOpen ? <X size={18} strokeWidth={1.6} /> : <Menu size={18} strokeWidth={1.6} />}
                <span>{t.menu.label}</span>
              </button>
              <nav className="hidden items-center justify-center gap-6 text-[15px] font-medium md:flex lg:text-[17px]">
                {navLinks.map((link) => {
                  if (link.type === "dropdown") {
                    const isOpen = openDropdown === link.id;
                    const isActive = link.items.some((item) =>
                      location.pathname.startsWith(item.to)
                    );
                    const triggerId = `${menuId}-${link.id}-trigger`;
                    const panelId = `${menuId}-${link.id}`;

                    return (
                      <div
                        key={link.id}
                        className="relative"
                        onMouseEnter={() => setOpenDropdown(link.id)}
                        onFocus={() => setOpenDropdown(link.id)}
                      >
                        <button
                          type="button"
                          id={triggerId}
                          className={`nav-underline inline-flex items-center gap-1 text-neutral-700 transition-colors dark:text-gray-200 ${
                            isActive ? "nav-underline--active text-brand-blue dark:text-brand-blue" : ""
                          }`}
                          aria-haspopup="true"
                          aria-expanded={isOpen}
                          aria-controls={panelId}
                          onClick={() => setOpenDropdown(isOpen ? null : link.id)}
                          ref={(node) => {
                            if (node) {
                              dropdownTriggers.current.set(link.id, node);
                            } else {
                              dropdownTriggers.current.delete(link.id);
                            }
                          }}
                        >
                          {link.label}
                          <ChevronDown
                            size={16}
                            strokeWidth={1.6}
                            className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                            aria-hidden
                          />
                        </button>
                        {isOpen && dropdownAnchor?.id === link.id && (
                          <DesktopDropdownLayer
                            anchor={dropdownAnchor}
                            items={link.items}
                            dropdownLinkClass={dropdownLinkClass}
                            menuLabel={t.menu.label}
                            menuId={panelId}
                            onNavigate={() => {
                              setOpenDropdown(null);
                            }}
                            onClose={({ focusTrigger: shouldFocus }) => {
                              setOpenDropdown(null);
                              if (shouldFocus) {
                                focusDropdownTrigger(link.id);
                              }
                            }}
                            registerMenuNode={registerDropdownMenu}
                            prefetchRoute={prefetchRoute}
                            triggerId={triggerId}
                          />
                        )}
                      </div>
                    );
                  }

                  return (
                    <NavLink
                      key={link.id}
                      to={link.to}
                      className={navLinkClass}
                      onMouseEnter={() => prefetchRoute(link.to)}
                      onFocus={() => prefetchRoute(link.to)}
                    >
                      {link.label}
                    </NavLink>
                  );
                })}
              </nav>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsPaletteOpen(true)}
                className="hidden items-center gap-2 rounded-full border border-neutral-200/70 bg-white/80 px-3 py-1.5 text-sm font-semibold text-neutral-700 shadow-sm backdrop-blur transition hover:border-neutral-300 hover:shadow-md dark:border-white/10 dark:bg-white/10 dark:text-gray-200 sm:inline-flex"
                aria-label={commandCopy.aria}
                aria-keyshortcuts="Meta+K,Control+K"
              >
                <Command size={16} strokeWidth={1.6} />
                <span>{commandCopy.label}</span>
              </button>
              <button
                type="button"
                onClick={toggleLanguage}
                className="inline-flex items-center gap-2 rounded-full border border-neutral-200/70 bg-white/80 px-3 py-1.5 text-sm font-semibold text-neutral-700 shadow-sm backdrop-blur transition hover:border-neutral-300 hover:shadow-md dark:border-white/10 dark:bg-white/10 dark:text-gray-200"
                aria-label={t.languageSwitch.aria[language]}
                title={t.languageSwitch.title[language]}
              >
                <span aria-hidden>{flags[nextLanguage]}</span>
                <span className="hidden sm:inline">{t.languageSwitch.cta[language]}</span>
                <span className="sr-only">{t.languageSwitch.helper[language]}</span>
              </button>
              <button
                onClick={toggleDark}
                className="inline-flex items-center gap-2 rounded-md bg-neutral-900/90 p-2 text-white transition-colors hover:bg-neutral-800 dark:bg-white/10 dark:text-gray-200 dark:hover:bg-white/20"
                aria-label={themeTitle}
                title={themeTitle}
                type="button"
              >
                {isDark ? <Sun size={16} strokeWidth={1.6} /> : <Moon size={16} strokeWidth={1.6} />}
                <span className="hidden sm:inline text-sm">{themeLabel}</span>
              </button>
              <button
                type="button"
                onClick={() => setIsPaletteOpen(true)}
                className="inline-flex items-center gap-1 rounded-md p-2 text-xs font-semibold text-neutral-600 transition hover:bg-black/5 dark:text-gray-200 dark:hover:bg-white/10 sm:hidden"
                aria-label={commandCopy.aria}
                aria-keyshortcuts="Meta+K,Control+K"
              >
                <Command size={16} strokeWidth={1.6} />
                <span aria-hidden>⌘K</span>
              </button>
            </div>
          </div>
        </div>

        <div
          className={`border-b border-neutral-200/60 bg-white/80 backdrop-blur transition-[background,box-shadow] duration-300 ease-out dark:border-neutral-800/60 dark:bg-surface-dark/80 ${
            isCondensed ? "shadow-[0_18px_44px_rgba(15,23,42,0.12)] backdrop-blur-xl" : "shadow-none"
          }`}
        >
          <div
            className={`mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 transition-[height,padding] duration-300 ${
              isCondensed ? "h-14" : "h-16"
            }`}
          >
            <Link to="/" className="group relative flex items-center gap-3 transition-all duration-300" aria-label="EcomMeasure home">
              <span
                className={`relative flex items-center justify-center rounded-2xl bg-gradient-to-br from-brand-blue via-brand-teal to-brand-blue text-white shadow-[0_10px_20px_rgba(15,23,42,0.18)] ring-1 ring-white/60 transition-[transform,height,width,box-shadow] duration-300 group-hover:-translate-y-0.5 dark:ring-white/10 dark:shadow-[0_16px_28px_rgba(2,6,23,0.45)] ${
                  isCondensed ? "h-11 w-11" : "h-12 w-12"
                }`}
              >
                <svg
                  viewBox="0 0 48 48"
                  className={isCondensed ? "h-7 w-7" : "h-8 w-8"}
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden
                >
                  <defs>
                    <linearGradient id="em-pillars" x1="10" y1="38" x2="38" y2="12" gradientUnits="userSpaceOnUse">
                      <stop offset="0" stopColor="#c7dcff" />
                      <stop offset="1" stopColor="#f8fbff" />
                    </linearGradient>
                    <linearGradient id="em-sparkline" x1="12" y1="30" x2="36" y2="16" gradientUnits="userSpaceOnUse">
                      <stop offset="0" stopColor="#f7c948" stopOpacity="0.95" />
                      <stop offset="1" stopColor="#facc15" stopOpacity="0.85" />
                    </linearGradient>
                  </defs>
                  <g strokeLinecap="round" strokeLinejoin="round">
                    <path
                      d="M11.5 31.5c0 1.38 1.12 2.5 2.5 2.5h4c1.38 0 2.5-1.12 2.5-2.5v-8c0-1.38-1.12-2.5-2.5-2.5h-4c-1.38 0-2.5 1.12-2.5 2.5v8Z"
                      fill="url(#em-pillars)"
                      stroke="rgba(255,255,255,0.55)"
                      strokeWidth="1.4"
                    />
                    <path
                      d="M20.5 26c0 1.38 1.12 2.5 2.5 2.5h4c1.38 0 2.5-1.12 2.5-2.5v-12c0-1.38-1.12-2.5-2.5-2.5h-4c-1.38 0-2.5 1.12-2.5 2.5V26Z"
                      fill="url(#em-pillars)"
                      stroke="rgba(255,255,255,0.55)"
                      strokeWidth="1.4"
                    />
                    <path
                      d="M29.5 21.5c0 1.38 1.12 2.5 2.5 2.5h4c1.38 0 2.5-1.12 2.5-2.5v-8c0-1.38-1.12-2.5-2.5-2.5h-4c-1.38 0-2.5 1.12-2.5 2.5v8Z"
                      fill="url(#em-pillars)"
                      stroke="rgba(255,255,255,0.55)"
                      strokeWidth="1.4"
                    />
                    <path
                      d="M12 27l6-3.8 4.6 3.2 4.9-6.3L36 23"
                      stroke="url(#em-sparkline)"
                      strokeWidth="2.6"
                    />
                    <circle cx="32.5" cy="19" r="2.4" fill="#fde047" stroke="rgba(255,255,255,0.7)" strokeWidth="1.2" />
                  </g>
                </svg>
                <span className="absolute inset-0 rounded-2xl border border-white/20" aria-hidden />
              </span>
              <span className="flex flex-col leading-tight">
                <span
                  className={`font-semibold uppercase tracking-[0.26em] text-neutral-900 transition-colors dark:text-white ${
                    isCondensed ? "text-[11px]" : "text-xs"
                  }`}
                >
                  ECOMMEASURE
                </span>
                <span className="text-sm font-medium tracking-tight text-neutral-500 transition-colors group-hover:text-neutral-700 dark:text-gray-300 dark:group-hover:text-white">
                  Growth Insights
                </span>
              </span>
            </Link>

            <div className="hidden items-stretch gap-8 md:flex">
              {t.columns.map((column) => (
                <div key={column.title} className="svc-col">
                  <Link
                    to={column.href}
                    className="svc-head"
                    onMouseEnter={() => prefetchRoute(column.href)}
                    onFocus={() => prefetchRoute(column.href)}
                  >
                    {column.title}
                  </Link>
                  <span className="svc-sub">{column.subtitle}</span>
                </div>
              ))}
            </div>

            <div className="hidden flex-shrink-0 md:block">
              <Link
                to="/contact"
                className="rounded-md bg-brand-yellow px-5 py-2 font-semibold text-neutral-900 shadow-[0_20px_45px_rgba(255,204,2,0.35)] transition hover:-translate-y-0.5 hover:bg-brand-yellow-dark hover:shadow-[0_24px_55px_rgba(255,204,2,0.45)] focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-yellow-dark focus-visible:ring-offset-2"
                onMouseEnter={() => prefetchRoute("/contact")}
                onFocus={() => prefetchRoute("/contact")}
              >
                {t.cta}
              </Link>
            </div>
          </div>

          <div className="px-4 pb-4 sm:px-6 md:hidden">
            <div className="flex items-center justify-between">
              <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
                {t.columns.map((column) => (
                  <div key={column.title} className="svc-col-mobile">
                    <Link
                      to={column.href}
                      className="svc-head"
                      onMouseEnter={() => prefetchRoute(column.href)}
                      onFocus={() => prefetchRoute(column.href)}
                    >
                      {column.title}
                    </Link>
                    <span className="svc-sub">{column.subtitle}</span>
                  </div>
                ))}
              </div>
              <Link
                to="/contact"
                className="ml-4 inline-flex items-center rounded-full bg-brand-yellow px-4 py-2 text-sm font-semibold text-neutral-900 shadow-[0_16px_38px_rgba(255,204,2,0.35)] transition hover:-translate-y-0.5 hover:bg-brand-yellow-dark hover:shadow-[0_22px_48px_rgba(255,204,2,0.45)] focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-yellow-dark focus-visible:ring-offset-2"
                onMouseEnter={() => prefetchRoute("/contact")}
                onFocus={() => prefetchRoute("/contact")}
              >
                {t.cta}
              </Link>
            </div>
          </div>
        </div>
      </header>

      {isMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-neutral-950/60 backdrop-blur-sm"
            aria-label={t.menu.close}
            onClick={() => setIsMenuOpen(false)}
          />
          <div
            id={menuId}
            role="dialog"
            aria-modal="true"
            aria-labelledby={`${menuId}-title`}
            className="absolute top-[calc(var(--header-offset))] left-0 right-0 max-h-[calc(100vh-var(--header-offset))] overflow-auto rounded-t-3xl border-t border-neutral-200/80 bg-white shadow-[0_-18px_45px_rgba(15,23,42,0.2)] dark:border-neutral-800/80 dark:bg-surface-dark dark:shadow-[0_-20px_55px_rgba(2,6,23,0.65)]"
          >
            <div className="space-y-6 px-6 pt-6 pb-10">
              <div>
                <h2 id={`${menuId}-title`} className="text-lg font-semibold text-neutral-900 dark:text-white">
                  {t.mobileMenu.title}
                </h2>
                <p className="mt-1 text-sm text-neutral-500 dark:text-gray-400">{t.mobileMenu.subtitle}</p>
              </div>
              <nav aria-label={t.menu.label} className="space-y-3">
                {navLinks.map((link) => {
                  if (link.type === "dropdown") {
                    const isOpen = openDropdown === link.id;
                    return (
                      <div
                        key={link.id}
                        className="rounded-2xl border border-neutral-200/80 bg-white shadow-sm dark:border-white/5 dark:bg-white/10"
                      >
                        <button
                          type="button"
                          className="flex w-full items-center justify-between px-4 py-3 text-base font-semibold text-neutral-900 transition hover:-translate-y-0.5 hover:shadow-md dark:text-white"
                          onClick={() => setOpenDropdown(isOpen ? null : link.id)}
                          aria-expanded={isOpen}
                          aria-controls={`${menuId}-${link.id}`}
                        >
                          <span>{link.label}</span>
                          <ChevronDown
                            size={18}
                            strokeWidth={1.6}
                            className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                            aria-hidden
                          />
                        </button>
                        {isOpen && (
                          <div id={`${menuId}-${link.id}`} className="space-y-2 px-3 pb-3">
                            {link.items.map((item) => (
                              <NavLink
                                key={item.id}
                                to={item.to}
                                onClick={() => {
                                  setOpenDropdown(null);
                                  setIsMenuOpen(false);
                                }}
                                onMouseEnter={() => prefetchRoute(item.to)}
                                onFocus={() => prefetchRoute(item.to)}
                                className={({ isActive }) =>
                                  `flex items-center justify-between rounded-xl border border-neutral-200/70 bg-white px-3 py-2 text-sm font-semibold shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-white/5 dark:bg-white/10 dark:text-white ${
                                    isActive ? "text-brand-blue dark:text-brand-blue" : "text-neutral-900"
                                  }`
                                }
                              >
                                <span>{item.label}</span>
                                <span aria-hidden>→</span>
                              </NavLink>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  }

                  return (
                    <NavLink
                      key={link.id}
                      to={link.to}
                      onClick={() => setIsMenuOpen(false)}
                      onMouseEnter={() => prefetchRoute(link.to)}
                      onFocus={() => prefetchRoute(link.to)}
                      className={({ isActive }) =>
                        `flex items-center justify-between rounded-2xl border border-neutral-200/80 bg-white px-4 py-3 text-base font-semibold shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-white/5 dark:bg-white/10 dark:text-white ${
                          isActive ? "text-brand-blue dark:text-brand-blue" : "text-neutral-900"
                        }`
                      }
                    >
                      <span>{link.label}</span>
                      <span aria-hidden>→</span>
                    </NavLink>
                  );
                })}
              </nav>
              <div className="space-y-4">
                <h3 className="text-xs font-semibold uppercase tracking-[0.32em] text-neutral-500 dark:text-gray-400">
                  {t.mobileMenu.preferences}
                </h3>
                <div className="flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      toggleLanguage();
                      setIsMenuOpen(false);
                    }}
                    className="inline-flex flex-1 min-w-[140px] items-center justify-center gap-2 rounded-full border border-neutral-200/80 bg-white px-4 py-2 text-sm font-semibold text-neutral-700 shadow-sm transition hover:border-neutral-300 hover:shadow-md dark:border-white/10 dark:bg-white/10 dark:text-gray-200"
                  >
                    <span aria-hidden>{flags[nextLanguage]}</span>
                    <span>{t.languageSwitch.cta[language]}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      toggleDark();
                      setIsMenuOpen(false);
                    }}
                    className="inline-flex flex-1 min-w-[140px] items-center justify-center gap-2 rounded-full border border-neutral-200/80 bg-white px-4 py-2 text-sm font-semibold text-neutral-700 shadow-sm transition hover:border-neutral-300 hover:shadow-md dark:border-white/10 dark:bg-white/10 dark:text-gray-200"
                  >
                    {isDark ? <Sun size={16} strokeWidth={1.6} /> : <Moon size={16} strokeWidth={1.6} />}
                    <span>{themeLabel}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsPaletteOpen(true);
                      setIsMenuOpen(false);
                    }}
                    className="inline-flex flex-1 min-w-[140px] items-center justify-center gap-2 rounded-full border border-neutral-200/80 bg-white px-4 py-2 text-sm font-semibold text-neutral-700 shadow-sm transition hover:border-neutral-300 hover:shadow-md dark:border-white/10 dark:bg-white/10 dark:text-gray-200"
                    aria-label={commandCopy.aria}
                    aria-keyshortcuts="Meta+K,Control+K"
                  >
                    <Command size={16} strokeWidth={1.6} />
                    <span>{commandCopy.label}</span>
                  </button>
                </div>
                <Link
                  to="/contact"
                  onClick={() => setIsMenuOpen(false)}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand-yellow px-5 py-3 text-sm font-semibold uppercase tracking-wide text-neutral-900 shadow-[0_24px_50px_rgba(255,204,2,0.35)] transition hover:-translate-y-0.5 hover:bg-brand-yellow-dark hover:shadow-[0_28px_60px_rgba(255,204,2,0.45)]"
                >
                  {t.cta}
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
      <CommandPalette open={isPaletteOpen} onOpenChange={setIsPaletteOpen} onIntent={prefetchRoute} />
    </>
  );
}
