"use client";

import { motion, useReducedMotion } from "framer-motion";
import { SectionTitle } from "./SectionTitle";

type TimelineEntry = {
    period: string;
    title: string;
    organization: string;
    location?: string;
    bullets: string[];
    linkLabel?: string;
    link?: string;
};

const timeline: TimelineEntry[] = [
    {
        period: "Mar. 2024 -- Present",
        title: "Full Stack Developer",
        organization: "SOF - Solution of Future",
        location: "Ho Chi Minh City, Vietnam",
        bullets: [
            "Developed core modules for the Enterprise Resource Planning (ERP) system, focusing on the sales module to optimize order management and processing workflows.",
            "Successfully integrated payment gateways such as SePay and ZaloPay into the ERP ecosystem, ensuring a secure, fast, and accurate online transaction flow.",
            "Designed and implemented the internal Task Management module within the ERP, applying Kanban methodology to optimize task delegation and team collaboration.",
            "Took charge of comprehensive full-stack development for the ERP system, ensuring backend stability and a seamless frontend experience.",
        ],
    },
];

export function Timeline() {
    const shouldReduceMotion = useReducedMotion();

    return (
        <section id="experience" className="section-space px-4 md:px-8">
            <SectionTitle
                eyebrow="Experience"
                title="Professional Experience"
                description="My career journey, including key roles, responsibilities, and impactful outcomes."
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
