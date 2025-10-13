// src/components/CommandPalette.jsx
import React, { useEffect, useMemo, useRef, useState, useId } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";

function filterItems(items, query) {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return items;
  return items.filter((item) => {
    const haystack = `${item.title} ${item.description || ""}`.toLowerCase();
    return haystack.includes(normalized);
  });
}

export default function CommandPalette({ open, onOpenChange, items, labels }) {
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const [portalNode, setPortalNode] = useState(null);
  const inputRef = useRef(null);
  const itemRefs = useRef([]);
  const liveRegionRef = useRef(null);
  const previousFocusRef = useRef(null);
  const navigate = useNavigate();
  const dialogId = useId();
  const listId = `${dialogId}-list`;

  const filteredItems = useMemo(() => filterItems(items, query), [items, query]);

  useEffect(() => {
    if (typeof document === "undefined") return;
    setPortalNode(document.body);
  }, []);

  useEffect(() => {
    if (!open) return;
    previousFocusRef.current = document.activeElement;
    const focusTimer = window.setTimeout(() => {
      inputRef.current?.focus();
    }, 16);
    if (typeof document !== "undefined") {
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.clearTimeout(focusTimer);
      if (typeof document !== "undefined") {
        document.body.style.overflow = "";
      }
    };
  }, [open]);

  useEffect(() => {
    if (open) {
      if (liveRegionRef.current) {
        liveRegionRef.current.textContent = labels.idleAnnouncement;
      }
    } else {
      setQuery("");
      setActiveIndex(0);
      itemRefs.current = [];
      previousFocusRef.current?.focus?.();
    }
  }, [open, labels.idleAnnouncement]);

  useEffect(() => {
    if (!open) return;
    const message = filteredItems.length === 0
      ? labels.empty
      : labels.formatResultCount(filteredItems.length);
    if (liveRegionRef.current) {
      liveRegionRef.current.textContent = message;
    }
  }, [filteredItems.length, labels, open]);

  useEffect(() => {
    if (!open) return;
    itemRefs.current = [];
    if (filteredItems.length === 0) {
      setActiveIndex(0);
    } else if (activeIndex >= filteredItems.length) {
      setActiveIndex(filteredItems.length - 1);
    }
  }, [filteredItems, activeIndex, open]);

  const closePalette = () => {
    onOpenChange(false);
  };

  const focusables = () => {
    const nodes = [inputRef.current, ...itemRefs.current];
    return nodes.filter(Boolean);
  };

  const handleKeyDown = (event) => {
    if (!open) return;

    if (event.key === "Escape") {
      event.preventDefault();
      closePalette();
      return;
    }

    if (event.key === "Tab") {
      const elements = focusables();
      if (elements.length === 0) return;
      event.preventDefault();
      const currentIndex = elements.indexOf(document.activeElement);
      const direction = event.shiftKey ? -1 : 1;
      let nextIndex = currentIndex + direction;
      if (nextIndex < 0) nextIndex = elements.length - 1;
      if (nextIndex >= elements.length) nextIndex = 0;
      const nextElement = elements[nextIndex];
      nextElement?.focus();
      const itemIndex = itemRefs.current.indexOf(nextElement);
      if (itemIndex >= 0) {
        setActiveIndex(itemIndex);
      }
      return;
    }

    if (event.key === "ArrowDown") {
      if (!filteredItems.length) return;
      event.preventDefault();
      const next = (activeIndex + 1) % filteredItems.length;
      setActiveIndex(next);
      itemRefs.current[next]?.focus();
      return;
    }

    if (event.key === "ArrowUp") {
      if (!filteredItems.length) return;
      event.preventDefault();
      const next = (activeIndex - 1 + filteredItems.length) % filteredItems.length;
      setActiveIndex(next);
      itemRefs.current[next]?.focus();
      return;
    }

    if (event.key === "Enter") {
      const current = document.activeElement;
      if (current === inputRef.current && filteredItems[0]) {
        event.preventDefault();
        handleSelect(filteredItems[0]);
        return;
      }
      const itemIndex = itemRefs.current.indexOf(current);
      if (itemIndex >= 0) {
        event.preventDefault();
        handleSelect(filteredItems[itemIndex]);
      }
    }
  };

  const handleSelect = (item) => {
    closePalette();
    window.setTimeout(() => {
      if (item.action) {
        item.action();
      } else if (item.href) {
        navigate(item.href);
      }
    }, 0);
  };

  const registerItemRef = (node, index) => {
    if (node) {
      itemRefs.current[index] = node;
    }
  };

  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget) {
      closePalette();
    }
  };

  if (!open || !portalNode) {
    return null;
  }

  return createPortal(
    <div
      className="command-overlay"
      role="presentation"
      onMouseDown={handleOverlayClick}
      onKeyDown={handleKeyDown}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={`${dialogId}-title`}
        aria-describedby={listId}
        className="command-dialog"
      >
        <div className="sr-only" aria-live="polite" ref={liveRegionRef} />
        <div className="flex items-center justify-between px-5 pt-5">
          <h2 id={`${dialogId}-title`} className="text-sm font-semibold uppercase tracking-[0.28em]">
            {labels.heading}
          </h2>
          <span className="command-shortcut" aria-hidden>
            {labels.keyboardHint}
          </span>
        </div>
        <input
          ref={inputRef}
          type="search"
          className="command-search"
          placeholder={labels.placeholder}
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            setActiveIndex(0);
          }}
          aria-controls={listId}
        />
        <div className="px-5 pb-2">
          <span className="command-result-meta">
            {labels.formatResultCount(filteredItems.length)}
          </span>
        </div>
        <ul id={listId} role="listbox" aria-activedescendant={filteredItems[activeIndex]?.id} className="command-list">
          {filteredItems.length === 0 ? (
            <li className="command-empty">{labels.empty}</li>
          ) : (
            filteredItems.map((item, index) => (
              <li key={item.id}>
                <button
                  ref={(node) => registerItemRef(node, index)}
                  type="button"
                  role="option"
                  aria-selected={activeIndex === index}
                  className="command-item"
                  onClick={() => handleSelect(item)}
                  onMouseEnter={() => {
                    setActiveIndex(index);
                    item.prefetch?.();
                  }}
                  onFocus={() => {
                    setActiveIndex(index);
                    item.prefetch?.();
                  }}
                >
                  <div className="flex flex-col items-start">
                    <span className="text-sm font-semibold tracking-tight">{item.title}</span>
                    {item.description ? (
                      <span className="text-xs text-slate-500 dark:text-slate-300">
                        {item.description}
                      </span>
                    ) : null}
                  </div>
                  {item.shortcut ? (
                    <span className="command-shortcut" aria-hidden>
                      {item.shortcut}
                    </span>
                  ) : null}
                </button>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>,
    portalNode
  );
}
