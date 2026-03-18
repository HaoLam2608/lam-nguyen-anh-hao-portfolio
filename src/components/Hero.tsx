"use client";

import dynamic from "next/dynamic";
import { useEffect, useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, Send } from "lucide-react";

const rotatingRoles = ["Backend Developer", "Full Stack Developer", "Computer Science Graduate"];
const HeroOrb3D = dynamic(() => import("./HeroOrb3D").then((mod) => mod.HeroOrb3D), {
    ssr: false,
});

export function Hero() {
    const shouldReduceMotion = useReducedMotion();
    const [roleIndex, setRoleIndex] = useState(0);
    const [typed, setTyped] = useState("");
    const [show3D, setShow3D] = useState(() => {
        if (typeof window === "undefined") {
            return false;
        }

        return window.matchMedia("(min-width: 1024px)").matches;
    });

    const roleText = useMemo(() => rotatingRoles[roleIndex], [roleIndex]);

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
                        Tan Phu District, Ho Chi Minh City, Vietnam
                    </p>
                    <h1 className="text-4xl font-bold leading-tight text-white sm:text-5xl md:text-6xl">
                        Hello, I am Lam Nguyen Anh Hao
                        <span className="block bg-gradient-to-r from-cyan-200 via-sky-400 to-orange-300 bg-clip-text text-transparent">
                            {typed}
                            <span className="typing-caret">|</span>
                        </span>
                    </h1>
                    <p className="max-w-2xl text-base leading-8 text-slate-300 md:text-lg">
                        As a Computer Science graduate, I am highly oriented towards in-depth Backend development, focusing on designing optimal APIs,
                        database architecture, and processing complex system logic. My short-term goal is to contribute effectively to product performance
                        and stability, then expand to full-stack architectural ownership.
                    </p>

                    <div className="flex flex-wrap gap-4">
                        <a href="#projects" className="btn-neon-primary">
                            View Projects
                        </a>
                        <a href="#contact" className="btn-neon-secondary inline-flex items-center gap-2">
                            Contact Me <Send className="h-4 w-4" />
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
                                <p className="relative z-10 text-center text-sm uppercase tracking-[0.22em] text-cyan-100">Launch Ready</p>
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
                aria-label="Scroll to about"
            >
                <ArrowDown className="h-7 w-7 animate-bounce" />
            </a>
        </section>
    );
}
