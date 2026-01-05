// src/components/Header.jsx
import React, {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { ChevronDown, Menu, Phone, X } from "lucide-react";
import { useReducedMotion } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../i18n/content";
import { blogPosts } from "../data/blogPosts";
import useViewTransitionNavigate from "../hooks/useViewTransitionNavigate";

const routePrefetchers = {
  "/": () => import("../pages/Home"),
  "/about": () => import("../pages/About"),
  "/measurement": () => import("../pages/Measurement"),
  "/cro": () => import("../pages/Cro"),
  "/blog": () => import("../pages/BlogArticle"),
  "/tools/bayesian-ab-test": () => import("../pages/BayesianCalculator"),
  "/tools/cro-roi": () => import("../pages/CroRoiCalculator"),
};

export default function Header() {
  const headerRef = useRef(null);
  const progressRef = useRef(null);
  const dropdownMenuRef = useRef(null);
  const dropdownTriggers = useRef(new Map());
  const prefetchedRoutes = useRef(new Set());
  const { language } = useLanguage();
  const t = translations[language].header;
  const shouldReduceMotion = useReducedMotion();
  const [isHidden, setIsHidden] = useState(false);
  const [isCondensed, setIsCondensed] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const menuId = useId();
  const location = useLocation();
  const navigateWithTransition = useViewTransitionNavigate();

  const navClickFactory = useCallback(
    (to, options) => (event) => {
      if (!event || typeof event.preventDefault !== "function") return;
      if (event.defaultPrevented) return;
      if (event.metaKey || event.altKey || event.ctrlKey || event.shiftKey || event.button !== 0) {
        return;
      }

      event.preventDefault();
      setOpenDropdown(null);
      setIsMenuOpen(false);
      navigateWithTransition(to, options);
    },
    [navigateWithTransition]
  );

  const blogLinks = useMemo(
    () =>
      blogPosts.map((post) => ({
        id: post.slug,
        to: `/blog/${post.slug}`,
        label: post.navLabel[language],
      })),
    [language]
  );

  const { about, blogLabel, toolsLabel, toolsItems } = t.nav;

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
    ],
    [about, blogLabel, blogLinks, toolLinks, toolsLabel]
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
    `nav-underline text-neutral-700 transition-colors  ${
      isActive ? "nav-underline--active text-brand-blue " : ""
    }`;

  const dropdownLinkClass = ({ isActive }) =>
    `flex items-start justify-between rounded-xl px-3 py-2 text-sm font-semibold text-neutral-700 transition hover:bg-neutral-100/80   ${
      isActive ? "text-brand-blue " : ""
    }`;

  return (
    <>
      <header
        ref={headerRef}
        data-condensed={isCondensed}
        className={`sticky top-0 z-[120] w-full transform-gpu transition-transform duration-300 ease-out ${
          isHidden ? "-translate-y-full" : "translate-y-0"
        }`}
      >
        <div className="progress-rail" aria-hidden>
          <span ref={progressRef} className="progress-bar" />
        </div>
        <div
          className={`border-b border-neutral-200/60 bg-white/75 backdrop-blur transition-[background,box-shadow] duration-300 ease-out   ${
            isCondensed
              ? "shadow-[0_16px_40px_rgba(15,23,42,0.12)] backdrop-blur-xl "
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
                className="inline-flex items-center gap-2 rounded-full border border-neutral-200/70 bg-white/90 px-3 py-1.5 text-sm font-semibold text-neutral-700 shadow-sm backdrop-blur transition hover:border-neutral-300 hover:shadow-md    md:hidden"
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
                          className={`nav-underline inline-flex items-center gap-1 text-neutral-700 transition-colors  ${
                            isActive ? "nav-underline--active text-brand-blue " : ""
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
                            className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                            aria-hidden
                          />
                        </button>
                        {isOpen && (
                          <div
                            ref={registerDropdownMenu}
                            className="absolute left-0 top-full z-[140] mt-3 w-72 rounded-2xl border border-neutral-200/80 bg-white/95 p-3 shadow-[0_16px_36px_rgba(15,23,42,0.15)] backdrop-blur pointer-events-auto"
                          >
                            <span className="px-3 text-xs font-semibold uppercase tracking-[0.32em] text-neutral-500 ">
                              {t.menu.label}
                            </span>
                            <div className="mt-2 space-y-1.5">
                              {link.items.map((item) => (
                                <NavLink
                                  key={item.id}
                                  to={item.to}
                                  className={dropdownLinkClass}
                                  onMouseEnter={() => prefetchRoute(item.to)}
                                  onFocus={() => prefetchRoute(item.to)}
                                  onClick={navClickFactory(item.to)}
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
                    onClick={navClickFactory(link.to)}
                  >
                    {link.label}
                  </NavLink>
                );
              })}
              </nav>
            </div>
          </div>
        </div>

        <div
          className={`border-b border-neutral-200/60 bg-white/80 backdrop-blur transition-[background,box-shadow] duration-300 ease-out   ${
            isCondensed ? "shadow-[0_18px_44px_rgba(15,23,42,0.12)] backdrop-blur-xl" : "shadow-none"
          }`}
        >
          <div
            className={`mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 transition-[height,padding] duration-300 ${
              isCondensed ? "h-14" : "h-16"
            }`}
          >
            <Link
              to="/"
              className="group relative flex items-center gap-3 transition-all duration-300"
              aria-label="EcomMeasure home"
              onClick={navClickFactory("/")}
            >
              <img
                src="/Nieuwe logo 2.svg"
                alt="EcomMeasure logo"
                className={`w-auto transition-[height,width] duration-300 ${isCondensed ? "h-10" : "h-12"}`}
                loading="lazy"
              />
            </Link>

            <div className="hidden items-stretch gap-8 md:flex">
              {t.columns.map((column) => (
                <Link
                  key={column.title}
                  to={column.href}
                  className="svc-col"
                  onMouseEnter={() => prefetchRoute(column.href)}
                  onFocus={() => prefetchRoute(column.href)}
                  onClick={navClickFactory(column.href)}
                >
                  <span className="svc-head">{column.title}</span>
                  <span className="svc-sub">{column.subtitle}</span>
                </Link>
              ))}
            </div>

            <div className="hidden items-center gap-4 md:flex">
              <a
                href="tel:+31682523260"
                className="group inline-flex items-center gap-2 rounded-full border border-neutral-200/80 bg-white px-4 py-2 text-sm font-semibold text-neutral-900 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <Phone
                  size={18}
                  className="transition-colors duration-200 group-hover:text-brand-blue"
                  aria-hidden
                />
                <span className="whitespace-nowrap">+31 6 8252 3260</span>
              </a>
              <Link
                to="/#contact"
                data-magnetic
                data-variant="primary"
                className="rounded-md bg-brand-yellow px-5 py-2 font-semibold text-neutral-900 shadow-[0_20px_45px_rgba(255,204,2,0.35)] transition-colors duration-200"
              >
                {t.cta}
              </Link>
            </div>
          </div>

          <div className="px-4 pb-4 sm:px-6 md:hidden">
              <div className="flex items-center justify-between">
                <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
                  {t.columns.map((column) => (
                    <Link
                      key={column.title}
                      to={column.href}
                      className="svc-col-mobile"
                      onMouseEnter={() => prefetchRoute(column.href)}
                      onFocus={() => prefetchRoute(column.href)}
                      onClick={navClickFactory(column.href)}
                    >
                      <span className="svc-head">{column.title}</span>
                      <span className="svc-sub">{column.subtitle}</span>
                    </Link>
                  ))}
                </div>
                <div className="ml-4 flex items-center gap-3">
                  <a
                    href="tel:+31682523260"
                    className="inline-flex items-center gap-2 rounded-full border border-neutral-200/80 bg-white px-3 py-2 text-sm font-semibold text-neutral-900 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                  >
                    <Phone size={16} aria-hidden />
                    <span className="whitespace-nowrap">+31 6 8252 3260</span>
                  </a>
                  <Link
                    to="/#contact"
                    data-magnetic
                    data-variant="primary"
                    className="inline-flex items-center rounded-full bg-brand-yellow px-4 py-2 text-sm font-semibold text-neutral-900 shadow-[0_16px_38px_rgba(255,204,2,0.35)] transition-colors duration-200"
                  >
                    {t.cta}
                  </Link>
                </div>
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
            className="absolute top-[calc(var(--header-offset))] left-0 right-0 max-h-[calc(100vh-var(--header-offset))] overflow-auto rounded-t-3xl border-t border-neutral-200/80 bg-white shadow-[0_-18px_45px_rgba(15,23,42,0.2)]   "
          >
            <div className="space-y-6 px-6 pt-6 pb-10">
              <div>
                <h2 id={`${menuId}-title`} className="text-lg font-semibold text-neutral-900 ">
                  {t.mobileMenu.title}
                </h2>
                <p className="mt-1 text-sm text-neutral-500 ">{t.mobileMenu.subtitle}</p>
              </div>
              <nav aria-label={t.menu.label} className="space-y-3">
                {navLinks.map((link) => {
                  if (link.type === "dropdown") {
                    const isOpen = openDropdown === link.id;
                    return (
                      <div
                        key={link.id}
                        className="rounded-2xl border border-neutral-200/80 bg-white shadow-sm  "
                      >
                        <button
                          type="button"
                          className="flex w-full items-center justify-between px-4 py-3 text-base font-semibold text-neutral-900 transition hover:-translate-y-0.5 hover:shadow-md "
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
                                onClick={navClickFactory(item.to)}
                                onMouseEnter={() => prefetchRoute(item.to)}
                                onFocus={() => prefetchRoute(item.to)}
                                className={({ isActive }) =>
                                  `flex items-center justify-between rounded-xl border border-neutral-200/70 bg-white px-3 py-2 text-sm font-semibold shadow-sm transition hover:-translate-y-0.5 hover:shadow-md    ${
                                    isActive ? "text-brand-blue " : "text-neutral-900"
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
                    onClick={navClickFactory(link.to)}
                    onMouseEnter={() => prefetchRoute(link.to)}
                    onFocus={() => prefetchRoute(link.to)}
                    className={({ isActive }) =>
                        `flex items-center justify-between rounded-2xl border border-neutral-200/80 bg-white px-4 py-3 text-base font-semibold shadow-sm transition hover:-translate-y-0.5 hover:shadow-md    ${
                          isActive ? "text-brand-blue " : "text-neutral-900"
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
                <Link
                  to="/#contact"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand-yellow px-5 py-3 text-sm font-semibold uppercase tracking-wide text-neutral-900 shadow-[0_24px_50px_rgba(255,204,2,0.35)] transition hover:-translate-y-0.5 hover:bg-brand-yellow-dark hover:shadow-[0_28px_60px_rgba(255,204,2,0.45)]"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t.cta}
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
