import React, { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import SEO from "../components/SEO";
import { useLanguage } from "../context/LanguageContext";
import { getBlogPostBySlug } from "../data/blogPosts";
import useViewTransitionNavigate, {
  createViewTransitionClickHandler,
} from "../hooks/useViewTransitionNavigate";

const fallbackCopy = {
  nl: {
    title: "Artikel niet gevonden",
    body: "De gevraagde blog bestaat niet meer of is verplaatst. Ga terug naar de homepage om andere artikelen te bekijken.",
    cta: "Terug naar home",
  },
  en: {
    title: "Article not found",
    body: "The requested blog post does not exist or has been moved. Return to the homepage to explore other resources.",
    cta: "Back to home",
  },
};

export default function BlogArticle() {
  const { slug } = useParams();
  const { language } = useLanguage();
  const post = getBlogPostBySlug(slug);
  const copy = fallbackCopy[language];
  const navigateWithTransition = useViewTransitionNavigate();
  const homeLinkHandler = useMemo(
    () => createViewTransitionClickHandler(navigateWithTransition, "/"),
    [navigateWithTransition]
  );

  const content = useMemo(() => {
    if (!post) return null;

    return {
      title: post.title[language],
      intro: post.intro[language],
      readingTime: post.readingTime[language],
      sections: post.sections.map((section) => ({
        heading: section.heading[language],
        paragraphs: section.paragraphs[language],
        list: section.list
          ? {
              type: section.list.type,
              items: section.list.items[language],
            }
          : null,
      })),
      keyTakeaways: post.keyTakeaways
        ? {
            heading: post.keyTakeaways.heading[language],
            bullets: post.keyTakeaways.bullets[language],
          }
        : null,
      seoTitle: post.seoTitle[language],
      seoDescription: post.seoDescription[language],
    };
  }, [language, post]);

  if (!post || !content) {
    return (
      <>
        <SEO title={copy.title} description={copy.body} />
        <main
          role="main"
          aria-labelledby="blog-fallback-title"
          className="flex min-h-[60vh] items-center justify-center bg-surface-light px-6 py-24 text-center "
        >
          <div className="max-w-xl space-y-6">
            <h1
              id="blog-fallback-title"
              className="text-3xl font-semibold text-neutral-900  focus:outline-none"
              data-focus-target
              tabIndex={-1}
            >
              {copy.title}
            </h1>
            <p className="text-neutral-600 ">{copy.body}</p>
            <Link
              to="/"
              className="inline-flex items-center justify-center rounded-full bg-brand-blue px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white shadow-[0_16px_36px_rgba(59,130,246,0.35)] transition hover:-translate-y-0.5 hover:shadow-[0_22px_48px_rgba(59,130,246,0.45)]"
              onClick={homeLinkHandler}
            >
              {copy.cta}
            </Link>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <SEO title={content.seoTitle} description={content.seoDescription} />
      <main
        role="main"
        aria-labelledby="blog-hero-title"
        className="relative overflow-hidden bg-surface-light pb-24 pt-24 "
      >
        <div className="glow-orb glow-orb--primary -left-24 top-8 h-[26rem] w-[26rem] opacity-60" aria-hidden />
        <div className="glow-orb glow-orb--primary-soft right-0 top-1/2 h-[24rem] w-[24rem] opacity-55" aria-hidden />
        <div className="grain-overlay" aria-hidden />

        <div className="relative mx-auto max-w-4xl px-6 vt-hero-visual">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/60 bg-white/80 px-4 py-1 text-xs font-semibold uppercase tracking-[0.28em] text-neutral-600 shadow-sm backdrop-blur   ">
            Blog
          </span>
          <h1
            id="blog-hero-title"
            className="mt-8 text-balance text-4xl font-bold tracking-tight text-neutral-900  sm:text-5xl vt-hero-title focus:outline-none"
            data-focus-target
            tabIndex={-1}
          >
            {content.title}
          </h1>
          <p className="mt-6 text-lg text-neutral-700 ">{content.intro}</p>
          <div className="mt-6 inline-flex items-center gap-3 text-sm font-medium text-neutral-500 ">
            <span className="inline-flex items-center gap-2 rounded-full border border-neutral-200/70 bg-white/80 px-3 py-1 shadow-sm backdrop-blur   ">
              {content.readingTime}
            </span>
          </div>

          <article className="mt-12 space-y-12 text-base leading-relaxed text-neutral-700 ">
            {content.sections.map((section) => (
              <section key={section.heading} className="space-y-4">
                <h2 className="text-2xl font-semibold text-neutral-900  sm:text-3xl">
                  {section.heading}
                </h2>
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph} className="text-neutral-700 ">
                    {paragraph}
                  </p>
                ))}
                {section.list && (
                  section.list.type === "ordered" ? (
                    <ol className="list-decimal space-y-2 pl-5 text-neutral-700 marker:text-brand-blue  ">
                      {section.list.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ol>
                  ) : (
                    <ul className="list-disc space-y-2 pl-5 text-neutral-700 marker:text-brand-blue  ">
                      {section.list.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  )
                )}
              </section>
            ))}
          </article>

          {content.keyTakeaways && (
            <div className="mt-16 rounded-3xl border border-white/60 bg-white/80 p-8 shadow-[18px_28px_70px_rgba(15,23,42,0.18)] backdrop-blur   ">
              <h2 className="text-2xl font-semibold text-neutral-900 ">
                {content.keyTakeaways.heading}
              </h2>
              <ul className="mt-5 space-y-3 text-neutral-700 ">
                {content.keyTakeaways.bullets.map((bullet) => (
                  <li key={bullet} className="flex gap-3">
                    <span aria-hidden className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-brand-blue " />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
