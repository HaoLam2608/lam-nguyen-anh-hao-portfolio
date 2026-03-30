"use client";

import { motion, useReducedMotion } from "framer-motion";
import { SectionTitle } from "./SectionTitle";
import { useI18n } from "@/i18n/I18nProvider";

type TimelineEntry = {
    period: string;
    title: string;
    organization: string;
    location?: string;
    bullets: string[];
    linkLabel?: string;
    link?: string;
};

export function Timeline() {
    const { t } = useI18n();
    const shouldReduceMotion = useReducedMotion();
    const timeline: TimelineEntry[] = [
        {
            period: t.timeline.period,
            title: t.timeline.role,
            organization: t.timeline.company,
            location: t.timeline.location,
            bullets: [...t.timeline.bullets],
        },
    ];

    return (
        <section id="experience" className="section-space px-4 md:px-8">
            <SectionTitle
                eyebrow={t.timeline.eyebrow}
                title={t.timeline.title}
                description={t.timeline.description}
            />

            <div className="mx-auto w-full max-w-5xl">
                <div className="relative border-l border-cyan-300/35 pl-7">
                    {timeline.map((item, index) => (
                        <motion.article
                            key={item.period + item.title}
                            className="timeline-item"
                            initial={shouldReduceMotion ? undefined : { opacity: 0, x: 20 }}
                            whileInView={shouldReduceMotion ? undefined : { opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.08 }}
                        >
                            <span className="timeline-dot" />
                            <p className="text-sm uppercase tracking-[0.2em] text-cyan-100">{item.period}</p>
                            <h3 className="mt-2 text-xl font-semibold text-white">{item.title}</h3>
                            <p className="text-sm uppercase tracking-[0.14em] text-orange-200/90">{item.organization}</p>
                            {item.location ? <p className="mt-1 text-sm text-slate-300">{item.location}</p> : null}

                            <ul className="mt-3 space-y-2 text-slate-300">
                                {item.bullets.map((bullet) => (
                                    <li key={bullet} className="flex gap-2 leading-7">
                                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-200/85" />
                                        <span>{bullet}</span>
                                    </li>
                                ))}
                            </ul>

                            {item.link && item.linkLabel ? (
                                <a
                                    href={item.link}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="mt-3 inline-flex text-sm font-medium text-cyan-100 hover:text-white"
                                >
                                    {item.linkLabel}
                                </a>
                            ) : null}
                        </motion.article>
                    ))}
                </div>
            </div>
        </section>
    );
}
