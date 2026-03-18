"use client";

import { motion, useSpring } from "framer-motion";
import { Star } from "lucide-react";
import { useEffect, useState } from "react";

export function CustomCursor() {
    const [enabled, setEnabled] = useState(() => {
        if (typeof window === "undefined") {
            return false;
        }

        return window.matchMedia("(pointer:fine)").matches;
    });
    const [position, setPosition] = useState({ x: -100, y: -100 });

    const springX = useSpring(position.x, { stiffness: 360, damping: 32, mass: 0.6 });
    const springY = useSpring(position.y, { stiffness: 360, damping: 32, mass: 0.6 });

    useEffect(() => {
        const media = window.matchMedia("(pointer:fine)");

        const onMove = (event: MouseEvent) => {
            setPosition({ x: event.clientX, y: event.clientY });
        };

        const onChange = (event: MediaQueryListEvent) => {
            setEnabled(event.matches);
        };

        window.addEventListener("mousemove", onMove);
        media.addEventListener("change", onChange);

        return () => {
            window.removeEventListener("mousemove", onMove);
            media.removeEventListener("change", onChange);
        };
    }, []);

    if (!enabled) {
        return null;
    }

    return (
        <motion.div
            aria-hidden
            className="custom-star-cursor"
            style={{ x: springX, y: springY }}
            animate={{ scale: [1, 1.08, 1], opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 1.3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        >
            <Star className="h-4 w-4" fill="currentColor" />
        </motion.div>
    );
}
