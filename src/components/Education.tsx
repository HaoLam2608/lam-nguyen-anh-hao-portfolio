"use client";

import { motion, useReducedMotion } from "framer-motion";
import { SectionTitle } from "./SectionTitle";
import { useI18n } from "@/i18n/I18nProvider";

export function Education() {
    const { t } = useI18n();
    const shouldReduceMotion = useReducedMotion();

    return (
        <section id="education" className="section-space px-4 md:px-8">
            <SectionTitle
                eyebrow={t.education.eyebrow}
                title={t.education.title}
                description={t.education.description}
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
                        <p className="text-sm uppercase tracking-[0.2em] text-cyan-100">{t.education.period}</p>
                        <h3 className="mt-2 text-xl font-semibold text-white">{t.education.degree}</h3>
                        <p className="text-sm uppercase tracking-[0.14em] text-orange-200/90">{t.education.university}</p>
                        <p className="mt-1 text-sm text-slate-300">{t.education.location}</p>

                        <ul className="mt-3 space-y-2 text-slate-300">
                            <li className="flex gap-2 leading-7">
                                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-200/85" />
                                <span>{t.education.bullets[0]}</span>
                            </li>
                            <li className="flex gap-2 leading-7">
                                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-200/85" />
                                <span>{t.education.bullets[1].split(":")[0]}: <strong className="text-cyan-400">3.42/4.0</strong></span>
                            </li>
                        </ul>
                    </motion.article>
                </div>
            </div>
        </section>
    );
}
