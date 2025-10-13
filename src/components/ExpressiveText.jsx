import React, { useMemo, Fragment, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

const KEYWORDS = {
  en: ["measure", "measurement", "optimize", "optimise", "optimization", "grow", "growth"],
  nl: ["meten", "measurement", "optimaliseren", "optimalisatie", "groei", "groeien"],
};

const wordVariants = {
  hidden: { opacity: 0, y: "100%" },
  visible: {
    opacity: 1,
    y: "0%",
    transition: { duration: 0.65, ease: [0.33, 1, 0.68, 1] },
  },
};

function combineClassNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function getKeywords(language = "en") {
  return KEYWORDS[language] ?? KEYWORDS.en;
}

function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function createHighlightNodes(value, language, renderKeyword) {
  if (typeof value !== "string") {
    return value;
  }

  const keywords = getKeywords(language);
  if (!keywords?.length) {
    return value;
  }

  const normalized = keywords.map((word) => word.toLowerCase());
  const matcher = new RegExp(`(${keywords.map(escapeRegExp).join("|")})`, "gi");

  return value.split(matcher).filter(Boolean).map((segment, index) => {
    if (normalized.includes(segment.toLowerCase())) {
      return renderKeyword(segment, index);
    }
    return <Fragment key={`segment-${index}`}>{segment}</Fragment>;
  });
}

export function AnimatedKeyword({ children }) {
  const shouldReduceMotion = useReducedMotion();
  const [active, setActive] = useState(false);

  if (shouldReduceMotion) {
    return <span className="keyword-animate">{children}</span>;
  }

  return (
    <motion.span
      className="keyword-animate"
      data-active={active}
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.06, y: -1 }}
      viewport={{ once: true, amount: 0.9 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      onViewportEnter={() => setActive(true)}
    >
      {children}
    </motion.span>
  );
}

export function AnimatedHeading({
  as = "h2",
  children,
  className = "",
  delay = 0,
}) {
  const shouldReduceMotion = useReducedMotion();
  const Component = as;
  const combined = combineClassNames("typography-display", className);

  if (typeof children !== "string") {
    return <Component className={combined}>{children}</Component>;
  }

  const words = useMemo(() => children.trim().split(/\s+/), [children]);

  if (shouldReduceMotion) {
    return <Component className={combined}>{children}</Component>;
  }

  return (
    <Component className={combined}>
      <motion.span
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.75 }}
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              delay,
              staggerChildren: 0.07,
              ease: [0.33, 1, 0.68, 1],
            },
          },
        }}
        className="inline-block overflow-hidden"
      >
        {words.map((word, index) => (
          <Fragment key={`${word}-${index}`}>
            <motion.span className="inline-block" variants={wordVariants}>
              {word}
            </motion.span>
            {index < words.length - 1 ? " " : null}
          </Fragment>
        ))}
      </motion.span>
    </Component>
  );
}

export function AnimatedParagraph({
  text,
  children,
  className = "",
  language = "en",
  highlight = false,
  delay = 0,
}) {
  const shouldReduceMotion = useReducedMotion();
  const content = text ?? children;
  const combined = combineClassNames("typography-body", className);

  const highlighted = useMemo(() => {
    if (!highlight) {
      return content;
    }

    return createHighlightNodes(content, language, (segment, index) => (
      <AnimatedKeyword key={`keyword-${segment}-${index}`}>{segment}</AnimatedKeyword>
    ));
  }, [content, highlight, language]);

  if (shouldReduceMotion) {
    return <p className={combined}>{highlighted}</p>;
  }

  return (
    <motion.p
      className={combined}
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.85 }}
      transition={{ delay, duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
    >
      {highlighted}
    </motion.p>
  );
}
