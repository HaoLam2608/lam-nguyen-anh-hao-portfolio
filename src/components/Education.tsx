"use client";

import { motion, useReducedMotion } from "framer-motion";
import { GraduationCap } from "lucide-react";
import { SectionTitle } from "./SectionTitle";

export function Education() {
    const shouldReduceMotion = useReducedMotion();

    return (
        <section id="education" className="section-space px-4 md:px-8">
            <SectionTitle
                eyebrow="Education"
                title="Academic Background"
                description="My educational journey and academic achievements."
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
                        <p className="text-sm uppercase tracking-[0.2em] text-cyan-100">Sep. 2022 -- 2026</p>
                        <h3 className="mt-2 text-xl font-semibold text-white">Bachelor of Computer Science</h3>
                        <p className="text-sm uppercase tracking-[0.14em] text-orange-200/90">Ho Chi Minh City University of Industry and Trade (HUIT)</p>
                        <p className="mt-1 text-sm text-slate-300">Ho Chi Minh City, Vietnam</p>

                        <ul className="mt-3 space-y-2 text-slate-300">
                            <li className="flex gap-2 leading-7">
                                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-200/85" />
                                <span>Academic focus on software engineering fundamentals, data structures, algorithms, and practical system development.</span>
                            </li>
                            <li className="flex gap-2 leading-7">
                                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-200/85" />
                                <span>GPA: <strong className="text-cyan-400">3.42/4.0</strong></span>
                            </li>
                        </ul>
                    </motion.article>
                </div>
            </div>
        </section>
    );
}
