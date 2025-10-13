// src/components/Header.jsx
import React, { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { ChevronDown, Command, Menu, Moon, Sun, X } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../i18n/content";
import { blogPosts } from "../data/blogPosts";
import CommandPalette from "./CommandPalette";

const ROUTE_PREFETCHERS = {
  "/": () => import("../pages/Home"),
  "/about": () => import("../pages/About"),
  "/measurement": () => import("../pages/Measurement"),
  "/consent-mode": () => import("../pages/ConsentMode"),
  "/cro": () => import("../pages/Cro"),
  "/contact": () => import("../pages/ContactPage"),
  "/blog/:slug": () => import("../pages/BlogArticle"),
};

const flags = {
  nl: "🇳🇱",
  en: "🇬🇧",
};

export default function Header() {
  const headerRef = useRef(null);
  const { language, changeLanguage } = useLanguage();
  const t = translations[language].header;
  const nextLanguage = language === "nl" ? "en" : "nl";
  const [isDark, setIsDark] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isCompact, setIsCompact] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPaletteOpen, setIsPaletteOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const menuId = useId();
  const location = useLocation();
  const prefetchedRoutes = useRef(new Set());

  const blogLinks = useMemo(
    () =>
      blogPosts.map((post) => ({
        id: post.slug,
        to: `/blog/${post.slug}`,
        label: post.navLabel[language],
      })),
    [language]
  );

  const { about, blogLabel, contact } = t.nav;
  const commandPaletteConfig = t.commandPalette;

  const navLinks = useMemo(
    () => [
      { id: "about", type: "link", to: "/about", label: about },
      { id: "blog", type: "dropdown", label: blogLabel, items: blogLinks },
      { id: "contact", type: "link", to: "/contact", label: contact },
    ],
    [about, blogLabel, contact, blogLinks]
  );

  const normalizePrefetchKey = useCallback((path) => {
    if (!path) return null;
    const [withHash] = path.split("?");
    const hashIndex = withHash.indexOf("#");
    const cleanPath = hashIndex >= 0 ? withHash.slice(0, hashIndex) : withHash;
    if (!cleanPath) return "/";
    if (cleanPath.startsWith("/blog/")) return "/blog/:slug";
    return cleanPath;
  }, []);

  const prefetchRoute = useCallback(
    (path) => {
      const key = normalizePrefetchKey(path);
      if (!key || prefetchedRoutes.current.has(key)) return;
      const loader = ROUTE_PREFETCHERS[key];
      if (loader) {
        loader();
        prefetchedRoutes.current.add(key);
      }
    },
    [normalizePrefetchKey]
  );

  const formatResultCount = useCallback(
    (count) => {
      const { singular, plural } = commandPaletteConfig.results;
      return count === 1 ? singular : plural.replace("{{count}}", String(count));
    },
    [commandPaletteConfig.results]
  );

  const commandPaletteLabels = useMemo(
    () => ({
      heading: commandPaletteConfig.heading,
      placeholder: commandPaletteConfig.placeholder,
      empty: commandPaletteConfig.empty,
      keyboardHint: commandPaletteConfig.keyboardHint,
      idleAnnouncement: commandPaletteConfig.idleAnnouncement,
      formatResultCount,
    }),
    [commandPaletteConfig, formatResultCount]
  );

  const commandItems = useMemo(() => {
    const items = commandPaletteConfig.items;
    return [
      {
        id: "plan-intro",
        title: items.plan.title,
        description: items.plan.description,
        href: "/contact?schedule=true",
        prefetch: () => prefetchRoute("/contact"),
      },
      {
        id: "cases",
        title: items.cases.title,
        description: items.cases.description,
        href: "/about#cases",
        prefetch: () => prefetchRoute("/about"),
      },
      {
        id: "services",
        title: items.services.title,
        description: items.services.description,
        href: "/measurement",
        prefetch: () => prefetchRoute("/measurement"),
      },
    ];
  }, [commandPaletteConfig.items, prefetchRoute]);

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
      const root = document.documentElement;
      const maxScroll = Math.max(root.scrollHeight - root.clientHeight, 1);
      const ratio = Math.min(currentScrollY / maxScroll, 1);

      setScrollProgress(ratio);

      if (currentScrollY <= 0) {
        setIsHidden(false);
        setIsCompact(false);
        lastScrollY = currentScrollY;
        ticking = false;
        return;
      }

      const shouldCompact = currentScrollY > 80;
      setIsCompact((prev) => (prev === shouldCompact ? prev : shouldCompact));

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
  }, [isMenuOpen, isCompact]);

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
    setIsPaletteOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!isMenuOpen) {
      setOpenDropdown(null);
    }
  }, [isMenuOpen]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const handleKeyDown = (event) => {
      if (!(event.metaKey || event.ctrlKey)) return;
      if (event.key.toLowerCase() !== "k") return;
      const target = event.target;
      const tagName = target?.tagName?.toLowerCase();
      const isEditable = target?.isContentEditable;
      if (tagName === "input" || tagName === "textarea" || isEditable) {
        return;
      }
      event.preventDefault();
      setIsPaletteOpen(true);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const menuButtonLabel = isMenuOpen ? t.menu.close : t.menu.open;

  const navLinkClass = ({ isActive }) =>
    `nav-underline text-neutral-700 transition-colors dark:text-gray-200 ${
      isActive ? "text-brand-blue dark:text-brand-yellow" : ""
    }`;

  const dropdownLinkClass = ({ isActive }) =>
    `flex items-start justify-between rounded-xl px-3 py-2 text-sm font-semibold text-neutral-700 transition hover:bg-neutral-100/80 dark:text-gray-100 dark:hover:bg-white/10 ${
      isActive ? "text-brand-blue dark:text-brand-yellow" : ""
    }`;

  const topBarHeightClass = isCompact ? "h-11" : "h-12";
  const bottomBarHeightClass = isCompact ? "h-14" : "h-16";
  const logoWrapperClass = isCompact ? "h-12 w-12" : "h-14 w-14";
  const logoIconClass = isCompact ? "h-8 w-8" : "h-9 w-9";
  const brandTitleClass = isCompact
    ? "text-base"
    : "text-lg";
  const brandTaglineClass = isCompact ? "text-[10px]" : "text-[11px]";

  return (
    <>
      <header
        ref={headerRef}
        className={`sticky top-0 z-50 w-full transform-gpu transition-[transform,box-shadow] duration-300 ease-out ${
          isHidden ? "-translate-y-full" : "translate-y-0"
        }`}
        style={{ boxShadow: isCompact ? "var(--shadow-elev-1)" : "none" }}
      >
        <div className="progress-rail" aria-hidden>
          <div className="progress-bar" style={{ "--scroll-progress": `${scrollProgress}` }} />
        </div>
        <div
          className={`border-b border-neutral-200/60 bg-white/80 transition-[background-color,backdrop-filter,border-color] duration-300 ease-out dark:border-neutral-800/60 dark:bg-surface-dark/80 ${
            isCompact ? "backdrop-blur-xl" : "backdrop-blur"
          }`}
        >
          <div className={`mx-auto flex ${topBarHeightClass} max-w-7xl items-center justify-between px-4 sm:px-6`}>
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => setIsMenuOpen((open) => !open)}
                className="inline-flex items-center gap-2 rounded-full border border-neutral-200/70 bg-white/90 px-3 py-1.5 text-sm font-semibold text-neutral-700 shadow-sm backdrop-blur transition hover:border-neutral-300 hover:shadow-md dark:border-white/10 dark:bg-white/10 dark:text-gray-200 md:hidden"
                aria-expanded={isMenuOpen}
                aria-controls={menuId}
                aria-label={menuButtonLabel}
              >
                {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
                <span>{t.menu.label}</span>
              </button>
              <nav className="hidden items-center justify-center gap-6 text-[15px] font-medium md:flex lg:text-[17px]">
                {navLinks.map((link) => {
                  if (link.type === "dropdown") {
                    const isOpen = openDropdown === link.id;
                    const isActive = link.items.some((item) =>
                      location.pathname.startsWith(item.to)
                    );

                    return (
                      <div
                        key={link.id}
                        className="relative"
                        onMouseEnter={() => setOpenDropdown(link.id)}
                        onMouseLeave={() => setOpenDropdown(null)}
                        onFocus={() => setOpenDropdown(link.id)}
                        onBlur={(event) => {
                          if (!event.currentTarget.contains(event.relatedTarget)) {
                            setOpenDropdown(null);
                          }
                        }}
                      >
                        <button
                          type="button"
                          className={`nav-underline inline-flex items-center gap-1 text-neutral-700 transition-colors dark:text-gray-200 ${
                            isActive ? "text-brand-blue dark:text-brand-yellow" : ""
                          }`}
                          aria-haspopup="true"
                          aria-expanded={isOpen}
                          onClick={() => setOpenDropdown(isOpen ? null : link.id)}
                        >
                          {link.label}
                          <ChevronDown
                            size={16}
                            className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                            aria-hidden
                          />
                        </button>
                        {isOpen && (
                          <div className="absolute left-0 top-full mt-3 w-72 rounded-2xl border border-neutral-200/80 bg-white/95 p-3 shadow-[0_16px_36px_rgba(15,23,42,0.15)] backdrop-blur dark:border-white/10 dark:bg-white/5 dark:shadow-[0_20px_44px_rgba(2,6,23,0.45)]">
                            <span className="px-3 text-xs font-semibold uppercase tracking-[0.32em] text-neutral-500 dark:text-gray-400">
                              {t.menu.label}
                            </span>
                            <div className="mt-2 space-y-1.5">
                              {link.items.map((item) => (
                                <NavLink
                                  key={item.id}
                                  to={item.to}
                                  className={dropdownLinkClass}
                                  onClick={() => setOpenDropdown(null)}
                                  onMouseEnter={() => prefetchRoute(item.to)}
                                  onFocus={() => prefetchRoute(item.to)}
                                >
                                  <span>{item.label}</span>
                                  <span aria-hidden>→</span>
                                </NavLink>
                              ))}
                            </div>
                          </div>
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
                className="hidden items-center gap-2 rounded-md px-3 py-2 text-sm font-semibold text-neutral-700 transition hover:bg-black/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/60 dark:text-gray-200 dark:hover:bg-white/10 md:inline-flex"
                aria-label={commandPaletteConfig.openLabel}
                aria-haspopup="dialog"
                title={commandPaletteConfig.buttonLabel}
              >
                <Command size={16} />
                <span className="hidden lg:inline">{commandPaletteConfig.buttonLabel}</span>
                <span className="command-shortcut" aria-hidden>
                  {commandPaletteConfig.keyboardHint}
                </span>
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
                className="inline-flex items-center gap-2 rounded-md p-2 transition-colors hover:bg-black/5 dark:hover:bg-white/10"
                aria-label={themeTitle}
                title={themeTitle}
                type="button"
              >
                {isDark ? <Sun size={16} /> : <Moon size={16} />}
                <span className="hidden sm:inline text-sm">{themeLabel}</span>
              </button>
            </div>
          </div>
        </div>

        <div
          className={`border-b border-neutral-200/60 bg-white/80 transition-[background-color,backdrop-filter,border-color] duration-300 ease-out dark:border-neutral-800/60 dark:bg-surface-dark/80 ${
            isCompact ? "backdrop-blur-2xl" : "backdrop-blur"
          }`}
        >
          <div className={`mx-auto flex ${bottomBarHeightClass} max-w-7xl items-center justify-between px-4 sm:px-6`}>
            <Link to="/" className="group relative flex items-center gap-3" aria-label="EcomMeasure home">
              <span
                className={`relative flex ${logoWrapperClass} items-center justify-center rounded-3xl bg-gradient-to-br from-brand-blue via-brand-teal to-brand-yellow text-white shadow-[0_16px_32px_rgba(15,23,42,0.2)] ring-1 ring-white/70 transition-all duration-300 group-hover:-translate-y-0.5 dark:ring-white/10 dark:shadow-[0_18px_36px_rgba(2,6,23,0.45)]`}
              >
                <svg
                  viewBox="0 0 48 48"
                  className={`${logoIconClass}`}
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden
                >
                  <defs>
                    <linearGradient id="em-spark" x1="10" y1="34" x2="36" y2="12" gradientUnits="userSpaceOnUse">
                      <stop offset="0" stopColor="#fff7ed" />
                      <stop offset="1" stopColor="#fde68a" />
                    </linearGradient>
                    <linearGradient id="em-pillar" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0" stopColor="#e0f2fe" />
                      <stop offset="1" stopColor="#f0fdf4" />
                    </linearGradient>
                  </defs>
                  <g strokeLinecap="round" strokeLinejoin="round">
                    <path
                      d="M10 34h4.5c1.1 0 2-.9 2-2V24c0-1.1-.9-2-2-2H10c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2Z"
                      fill="url(#em-pillar)"
                      stroke="rgba(255,255,255,0.35)"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M22 34h4.5c1.1 0 2-.9 2-2V18c0-1.1-.9-2-2-2H22c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2Z"
                      fill="url(#em-pillar)"
                      stroke="rgba(255,255,255,0.35)"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M34 34h4.5c1.1 0 2-.9 2-2V12c0-1.1-.9-2-2-2H34c-1.1 0-2 .9-2 2v20c0 1.1.9 2 2 2Z"
                      fill="url(#em-pillar)"
                      stroke="rgba(255,255,255,0.35)"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M8 26L18.2 20L24.5 26.8L31.4 18.2L40 24"
                      stroke="url(#em-spark)"
                      strokeWidth="2.8"
                    />
                    <circle cx="31" cy="17" r="3.2" fill="#fef9c3" stroke="rgba(255,255,255,0.65)" strokeWidth="1.4" />
                  </g>
                </svg>
                <span className="absolute -inset-1 rounded-[1.75rem] border border-white/20 opacity-40" aria-hidden />
              </span>
              <span className="flex flex-col leading-tight">
                <span className={`${brandTitleClass} font-bold tracking-tight text-neutral-900 transition-colors dark:text-white`}>
                  EcomMeasure
                </span>
                <span className={`${brandTaglineClass} font-semibold uppercase tracking-[0.38em] text-neutral-500 transition-colors group-hover:text-neutral-700 dark:text-gray-300 dark:group-hover:text-white`}>
                  Insights
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
                className="rounded-md bg-brand-blue px-5 py-2 font-semibold text-white shadow-[0_16px_36px_rgba(59,130,246,0.35)] transition hover:-translate-y-0.5 hover:shadow-[0_24px_48px_rgba(59,130,246,0.45)]"
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
                className="ml-4 inline-flex items-center rounded-full bg-brand-blue px-4 py-2 text-sm font-semibold text-white shadow-[0_14px_32px_rgba(59,130,246,0.35)] transition hover:-translate-y-0.5 hover:shadow-[0_20px_44px_rgba(59,130,246,0.45)]"
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
                                    isActive ? "text-brand-blue dark:text-brand-yellow" : "text-neutral-900"
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
                        isActive ? "text-brand-blue dark:text-brand-yellow" : "text-neutral-900"
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
                    {isDark ? <Sun size={16} /> : <Moon size={16} />}
                    <span>{themeLabel}</span>
                  </button>
                </div>
                <Link
                  to="/contact"
                  onClick={() => setIsMenuOpen(false)}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand-blue px-5 py-3 text-sm font-semibold uppercase tracking-wide text-white shadow-[0_20px_45px_rgba(59,130,246,0.35)] transition hover:-translate-y-0.5 hover:shadow-[0_26px_55px_rgba(59,130,246,0.45)]"
                >
                  {t.cta}
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      <CommandPalette
        open={isPaletteOpen}
        onOpenChange={setIsPaletteOpen}
        items={commandItems}
        labels={commandPaletteLabels}
      />
    </>
  );
}
