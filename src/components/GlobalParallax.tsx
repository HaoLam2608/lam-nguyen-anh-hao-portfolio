"use client";

import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { useEffect } from "react";

export function GlobalParallax() {
    const shouldReduceMotion = useReducedMotion();
    const pointerX = useMotionValue(0);
    const pointerY = useMotionValue(0);

    const smoothX = useSpring(pointerX, { stiffness: 56, damping: 24, mass: 1.1 });
    const smoothY = useSpring(pointerY, { stiffness: 56, damping: 24, mass: 1.1 });

    const backX = useTransform(smoothX, (value) => value * 12);
    const backY = useTransform(smoothY, (value) => value * 9);

    const midX = useTransform(smoothX, (value) => value * 22);
    const midY = useTransform(smoothY, (value) => value * 16);

    const frontX = useTransform(smoothX, (value) => value * 34);
    const frontY = useTransform(smoothY, (value) => value * 22);
    const frontRotateX = useTransform(smoothY, (value) => value * -2.2);
    const frontRotateY = useTransform(smoothX, (value) => value * 3.1);

    useEffect(() => {
        if (shouldReduceMotion || typeof window === "undefined") {
            return;
        }

        const media = window.matchMedia("(pointer:fine)");
        if (!media.matches) {
            return;
        }

        let rafId = 0;
        const onMove = (event: MouseEvent) => {
            const normalizedX = (event.clientX / window.innerWidth - 0.5) * 2;
            const normalizedY = (event.clientY / window.innerHeight - 0.5) * 2;

            cancelAnimationFrame(rafId);
            rafId = requestAnimationFrame(() => {
                pointerX.set(normalizedX);
                pointerY.set(normalizedY);
            });
        };

        window.addEventListener("mousemove", onMove, { passive: true });

        return () => {
            window.removeEventListener("mousemove", onMove);
            cancelAnimationFrame(rafId);
        };
    }, [pointerX, pointerY, shouldReduceMotion]);

    if (shouldReduceMotion) {
        return null;
    }

    return (
        <>
            <motion.div className="parallax-layer parallax-back" style={{ x: backX, y: backY }} />
            <motion.div className="parallax-layer parallax-mid" style={{ x: midX, y: midY }} />
            <motion.div
                className="parallax-layer parallax-front"
                style={{ x: frontX, y: frontY, rotateX: frontRotateX, rotateY: frontRotateY }}
            />
        </>
    );
}
