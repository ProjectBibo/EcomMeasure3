import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { CalendarDays, Mail, MessageCircle } from "lucide-react";

const contactOptions = [
  {
    icon: Mail,
    title: "Plan een kennismaking",
    description:
      "Vertel kort over je project en ontvang binnen 1 werkdag een reactie met een voorstel voor een intakecall.",
    action: {
      href: "mailto:info@ecommeasure.com?subject=Kennismaken%20met%20EcomMeasure",
      label: "Mail direct",
    },
  },
  {
    icon: CalendarDays,
    title: "Boek een strategiesessie",
    description:
      "Een sparsessie van 45 minuten waarin we je data doornemen, quick wins spotten en de vervolgstappen bepalen.",
    action: {
      href: "https://cal.com/",
      label: "Kies een moment",
    },
  },
  {
    icon: MessageCircle,
    title: "Stuur een bericht",
    description:
      "Lievere vragen via WhatsApp? Laat een bericht achter en ik kom dezelfde dag bij je terug.",
    action: {
      href: "https://wa.me/31612345678",
      label: "Open WhatsApp",
    },
  },
];

export default function Contact() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="contact"
      data-snap-section
      className="relative overflow-hidden py-24 sm:py-28 bg-gradient-to-br from-brand-blue/5 via-brand-teal/5 to-brand-yellow/5 dark:from-surface-dark dark:via-surface-dark/95 dark:to-surface-dark"
    >
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.8 }}
          whileInView={
            shouldReduceMotion ? { opacity: 0.2 } : { opacity: 0.25, scale: 1 }
          }
          transition={
            shouldReduceMotion ? undefined : { duration: 1.2, ease: "easeOut" }
          }
          viewport={shouldReduceMotion ? undefined : { once: true }}
          className="mx-auto mt-10 h-[420px] w-[420px] rounded-full bg-brand-blue/30 blur-3xl"
        />
      </div>
      <div className="absolute inset-0 opacity-50">
        <div className="grain-overlay" aria-hidden />
      </div>

      <div className="relative max-w-6xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto">
          <motion.span
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            viewport={shouldReduceMotion ? undefined : { once: true }}
            transition={
              shouldReduceMotion ? undefined : { delay: 0.1, duration: 0.6 }
            }
            className="inline-flex items-center px-3 py-1 rounded-full bg-white/70 dark:bg-white/10 text-sm font-medium text-brand-blue shadow-sm"
          >
            Klaar om samen te werken?
          </motion.span>
          <motion.h2
            initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
            whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            viewport={shouldReduceMotion ? undefined : { once: true }}
            transition={
              shouldReduceMotion ? undefined : { delay: 0.2, duration: 0.7 }
            }
            className="mt-6 text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900 dark:text-white"
          >
            Kies het kanaal dat het beste bij jou past
          </motion.h2>
          <motion.p
            initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
            whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            viewport={shouldReduceMotion ? undefined : { once: true }}
            transition={
              shouldReduceMotion ? undefined : { delay: 0.3, duration: 0.7 }
            }
            className="mt-4 text-base sm:text-lg text-neutral-600 dark:text-gray-400"
          >
            Je krijgt altijd persoonlijk contact met Rens. Samen onderzoeken we welke optimalisaties de meeste impact maken voor jouw webshop.
          </motion.p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {contactOptions.map(({ icon: Icon, title, description, action }, index) => (
            <motion.article
              key={title}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
              whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
              viewport={shouldReduceMotion ? undefined : { once: true }}
              transition={
                shouldReduceMotion
                  ? undefined
                  : { delay: 0.15 * index, duration: 0.5 }
              }
              className="group relative h-full rounded-2xl border border-white/70 bg-white/80 p-6 shadow-sm backdrop-blur transition hover:-translate-y-1 hover:shadow-lg dark:border-white/10 dark:bg-surface-dark/80"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-blue/10 text-brand-blue">
                <Icon size={22} />
              </div>
              <h3 className="mt-5 text-xl font-semibold text-neutral-900 dark:text-white">{title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-neutral-600 dark:text-gray-400">
                {description}
              </p>
              <a
                href={action.href}
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand-blue transition group-hover:translate-x-0.5"
              >
                {action.label}
                <span aria-hidden="true">→</span>
              </a>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 30 }}
          whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          viewport={shouldReduceMotion ? undefined : { once: true }}
          transition={
            shouldReduceMotion ? undefined : { delay: 0.2, duration: 0.6 }
          }
          className="mt-16 rounded-3xl bg-neutral-900 px-6 py-10 text-white shadow-xl ring-1 ring-white/10 dark:bg-neutral-800"
        >
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h3 className="text-2xl font-semibold">Sneller schakelen?</h3>
              <p className="mt-2 text-sm text-neutral-300 lg:max-w-xl">
                Bel direct via <a href="tel:+31612345678" className="underline decoration-brand-yellow decoration-2 underline-offset-4">+31 6 12345678</a> of stuur je Analytics-profiel mee zodat we gericht kunnen voorbereiden.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a
                href="mailto:info@ecommeasure.com"
                className="inline-flex items-center justify-center rounded-full bg-white px-5 py-2 text-sm font-semibold text-neutral-900 transition hover:bg-brand-yellow"
              >
                info@ecommeasure.com
              </a>
              <a
                href="https://www.linkedin.com/"
                className="inline-flex items-center justify-center rounded-full border border-white/40 px-5 py-2 text-sm font-semibold text-white transition hover:border-brand-yellow hover:text-brand-yellow"
              >
                Volg op LinkedIn
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
