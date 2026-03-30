"use client";

import { motion, useReducedMotion } from "framer-motion";
import { SectionTitle } from "./SectionTitle";
import { useI18n } from "@/i18n/I18nProvider";

export function Awards() {
    const { t } = useI18n();
    const shouldReduceMotion = useReducedMotion();

    return (
        <section id="awards" className="section-space px-4 md:px-8">
            <SectionTitle
                eyebrow={t.awards.eyebrow}
                title={t.awards.title}
                description={t.awards.description}
            />

            <div className="mx-auto w-full max-w-5xl">
                <div className="relative border-l border-cyan-300/35 pl-7">
                    <motion.article
                        className="timeline-item"
                        initial={shouldReduceMotion ? undefined : { opacity: 0, x: 20 }}
                        whileInView={shouldReduceMotion ? undefined : { opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <span className="timeline-dot" />
                        <p className="text-sm uppercase tracking-[0.2em] text-cyan-100">{t.awards.period}</p>
                        <h3 className="mt-2 text-xl font-semibold text-white">{t.awards.award}</h3>
                        <p className="text-sm uppercase tracking-[0.14em] text-orange-200/90">{t.awards.organization}</p>

                        <p className="mt-3 leading-7 text-slate-300">
                            {t.awards.topic}
                        </p>

                        <a
                            href="https://svnckh.huit.edu.vn/researchtopic/topic/librarydetail/2573?year=2025"
                            target="_blank"
                            rel="noreferrer"
                            className="mt-3 inline-flex text-sm font-medium text-cyan-100 hover:text-white"
                        >
                            {t.awards.viewArticle}
                        </a>
                    </motion.article>
                </div>
            </div>
        </section>
    );
}
