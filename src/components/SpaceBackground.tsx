"use client";

import { motion } from "framer-motion";
import { GlobalParallax } from "./GlobalParallax";
import { ParticleField } from "./ParticleField";

export function SpaceBackground() {
    return (
        <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_20%,rgba(78,239,255,.14),transparent_35%),radial-gradient(circle_at_75%_10%,rgba(255,127,80,.11),transparent_32%),radial-gradient(circle_at_50%_80%,rgba(155,126,255,.16),transparent_40%),linear-gradient(180deg,#040611_0%,#070b17_45%,#04040a_100%)]" />
            <GlobalParallax />
            <ParticleField />

            <div className="star-layer" />
            <div className="star-layer star-layer-mid" />
            <div className="star-layer star-layer-near" />

            <motion.div
                className="absolute left-[8%] top-[18%] h-40 w-40 rounded-full bg-[radial-gradient(circle_at_30%_25%,#68f0ff_0,#2e4cff_52%,transparent_72%)] opacity-45 blur-sm"
                animate={{ x: [0, 30, -20, 0], y: [0, -25, 20, 0] }}
                transition={{ duration: 18, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            />
            <motion.div
                className="absolute bottom-[16%] right-[10%] h-44 w-44 rounded-full bg-[radial-gradient(circle_at_30%_25%,#ff8a5b_0,#9245ff_58%,transparent_76%)] opacity-35 blur-sm"
                animate={{ x: [0, 30, -20, 0], y: [0, -25, 20, 0] }}
                transition={{ duration: 18, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 1.6 }}
            />
        </div>
    );
}
