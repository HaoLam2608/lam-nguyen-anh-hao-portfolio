"use client";

import { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { useReducedMotion } from "framer-motion";

export function ParticleField() {
    const shouldReduceMotion = useReducedMotion();
    const [ready, setReady] = useState(false);
    const [lowPower, setLowPower] = useState(() => {
        if (typeof window === "undefined") {
            return false;
        }

        const memory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory;
        const coarsePointer = window.matchMedia("(pointer: coarse)").matches;
        return Boolean(coarsePointer || (memory !== undefined && memory <= 4));
    });

    useEffect(() => {
        void initParticlesEngine(async (engine) => {
            await loadSlim(engine);
        }).then(() => setReady(true));
    }, []);

    useEffect(() => {
        if (typeof window === "undefined") {
            return;
        }

        const media = window.matchMedia("(pointer: coarse)");
        const onChange = (event: MediaQueryListEvent) => {
            setLowPower(event.matches);
        };

        media.addEventListener("change", onChange);
        return () => {
            media.removeEventListener("change", onChange);
        };
    }, []);

    const effectiveLowPower = lowPower || shouldReduceMotion;

    const options = useMemo(
        () => ({
            fullScreen: { enable: false },
            fpsLimit: effectiveLowPower ? 30 : 60,
            detectRetina: true,
            pauseOnBlur: true,
            pauseOnOutsideViewport: true,
            particles: {
                number: {
                    value: effectiveLowPower ? 26 : 68,
                    density: { enable: true, area: effectiveLowPower ? 1200 : 900 },
                },
                color: { value: ["#d9f7ff", "#89e6ff", "#ffbe8c"] },
                links: {
                    enable: !effectiveLowPower,
                    distance: 120,
                    opacity: 0.2,
                    color: "#86def7",
                    width: 1,
                },
                move: {
                    enable: true,
                    speed: effectiveLowPower ? 0.3 : 0.5,
                    outModes: "out" as const,
                },
                size: {
                    value: { min: 0.7, max: 2.4 },
                },
                opacity: {
                    value: { min: 0.3, max: 0.8 },
                },
            },
            interactivity: {
                events: {
                    onHover: {
                        enable: !effectiveLowPower,
                        mode: "grab",
                    },
                    resize: {
                        enable: true,
                        delay: 0.5,
                    },
                },
                modes: {
                    grab: {
                        distance: 150,
                        links: {
                            opacity: 0.35,
                        },
                    },
                },
            },
            background: {
                color: "transparent",
            },
        }),
        [effectiveLowPower]
    );

    if (!ready) {
        return null;
    }

    return <Particles id="space-particles" className="particle-canvas" options={options} />;
}
