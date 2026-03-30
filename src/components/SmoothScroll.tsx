"use client";

import Lenis from "lenis";
import { useEffect, useState } from "react";

export function SmoothScroll() {
    const [locked, setLocked] = useState(false);

    useEffect(() => {
        const onScrollLock = (event: Event) => {
            const customEvent = event as CustomEvent<{ locked?: boolean }>;
            setLocked(Boolean(customEvent.detail?.locked));
        };

        window.addEventListener("projects-modal-scroll-lock", onScrollLock as EventListener);

        return () => {
            window.removeEventListener("projects-modal-scroll-lock", onScrollLock as EventListener);
        };
    }, []);

    useEffect(() => {
        if (locked) {
            return;
        }

        const lenis = new Lenis({
            duration: 1.15,
            smoothWheel: true,
        });

        let rafId = 0;

        const raf = (time: number) => {
            lenis.raf(time);
            rafId = requestAnimationFrame(raf);
        };

        rafId = requestAnimationFrame(raf);

        return () => {
            cancelAnimationFrame(rafId);
            lenis.destroy();
        };
    }, [locked]);

    return null;
}
