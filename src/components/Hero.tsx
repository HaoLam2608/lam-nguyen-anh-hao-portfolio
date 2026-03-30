"use client";

import dynamic from "next/dynamic";
import { useEffect, useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, Send } from "lucide-react";
import { useI18n } from "@/i18n/I18nProvider";
const HeroOrb3D = dynamic(() => import("./HeroOrb3D").then((mod) => mod.HeroOrb3D), {
    ssr: false,
});

export function Hero() {
    const { t } = useI18n();
    const shouldReduceMotion = useReducedMotion();
    const [roleIndex, setRoleIndex] = useState(0);
    const [typed, setTyped] = useState("");
    const [show3D, setShow3D] = useState(() => {
        if (typeof window === "undefined") {
            return false;
        }

        return window.matchMedia("(min-width: 1024px)").matches;
    });

    const rotatingRoles = t.hero.roles;
    const roleText = useMemo(() => rotatingRoles[roleIndex], [roleIndex, rotatingRoles]);

    useEffect(() => {
        if (roleIndex >= rotatingRoles.length) {
            setRoleIndex(0);
            setTyped("");
        }
    }, [roleIndex, rotatingRoles.length]);

    useEffect(() => {
        let current = 0;
        const typeTimer = setInterval(() => {
            current += 1;
            setTyped(roleText.slice(0, current));
            if (current >= roleText.length) {
                clearInterval(typeTimer);
            }
        }, 75);

        const swapTimer = setTimeout(() => {
            setRoleIndex((prev) => (prev + 1) % rotatingRoles.length);
            setTyped("");
        }, 2400);

        return () => {
            clearInterval(typeTimer);
            clearTimeout(swapTimer);
        };
    }, [roleText]);

    useEffect(() => {
        const media = window.matchMedia("(min-width: 1024px)");

        const onChange = (event: MediaQueryListEvent) => {
            setShow3D(event.matches);
        };

        media.addEventListener("change", onChange);
        return () => {
            media.removeEventListener("change", onChange);
        };
    }, []);

    return (
        <section id="home" className="relative flex min-h-screen items-center px-4 pt-24 md:px-8">
            <div className="mx-auto grid w-full max-w-6xl gap-10 md:grid-cols-[1.15fr_.85fr] md:items-center">
                <motion.div
                    initial={shouldReduceMotion ? undefined : { opacity: 0, y: 28 }}
                    whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className="space-y-6"
                >
                    <p className="inline-flex rounded-full border border-cyan-200/50 bg-cyan-300/12 px-4 py-1 text-xs uppercase tracking-[0.25em] text-cyan-100">
                        {t.hero.location}
                    </p>
                    <h1 className="text-4xl font-bold leading-tight text-white sm:text-5xl md:text-6xl">
                        {t.hero.greeting}
                        <span className="block bg-gradient-to-r from-cyan-200 via-sky-400 to-orange-300 bg-clip-text text-transparent">
                            {typed}
                            <span className="typing-caret">|</span>
                        </span>
                    </h1>
                    <p className="max-w-2xl text-base leading-8 text-slate-300 md:text-lg">
                        {t.hero.intro}
                    </p>

                    <div className="flex flex-wrap gap-4">
                        <a href="#projects" className="btn-neon-primary">
                            {t.hero.viewProjects}
                        </a>
                        <a href="#contact" className="btn-neon-secondary inline-flex items-center gap-2">
                            {t.hero.contactMe} <Send className="h-4 w-4" />
                        </a>
                    </div>
                </motion.div>

                <motion.div
                    initial={shouldReduceMotion ? undefined : { opacity: 0, scale: 0.9 }}
                    whileInView={shouldReduceMotion ? undefined : { opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="relative mx-auto h-[340px] w-[340px] max-w-full lg:h-[380px] lg:w-[380px]"
                >
                    {show3D && !shouldReduceMotion ? (
                        <HeroOrb3D />
                    ) : (
                        <>
                            <div className="astronaut-card h-full w-full">
                                <div className="planet-ring" />
                                <div className="planet-core" />
                                <p className="relative z-10 text-center text-sm uppercase tracking-[0.22em] text-cyan-100">{t.hero.launchReady}</p>
                            </div>
                            <div className="orbit-satellite orbit-satellite-one" />
                            <div className="orbit-satellite orbit-satellite-two" />
                        </>
                    )}
                </motion.div>
            </div>

            <a
                href="#about"
                className="absolute bottom-8 left-1/2 -translate-x-1/2 text-cyan-100/80 transition hover:text-cyan-100"
                aria-label={t.hero.scrollToAbout}
            >
                <ArrowDown className="h-7 w-7 animate-bounce" />
            </a>
        </section>
    );
}
