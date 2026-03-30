"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Rocket } from "lucide-react";
import { useEffect, useState } from "react";
import { useI18n } from "@/i18n/I18nProvider";

const LOADING_DURATION_MS = 1850;

type LoadingScreenProps = {
    onDone?: () => void;
};

export function LoadingScreen({ onDone }: LoadingScreenProps) {
    const { t } = useI18n();
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const timer = window.setTimeout(() => {
            setVisible(false);
            onDone?.();
        }, LOADING_DURATION_MS);

        return () => {
            window.clearTimeout(timer);
        };
    }, [onDone]);

    return (
        <AnimatePresence>
            {visible ? (
                <motion.div
                    className="fixed inset-0 z-[100] grid place-items-center bg-[radial-gradient(circle_at_50%_20%,#0b2045_0%,#050711_56%,#030309_100%)]"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, transition: { duration: 0.45, ease: "easeOut" } }}
                >
                    <div className="relative flex flex-col items-center gap-5">
                        <motion.div
                            className="loader-orbit"
                            initial={{ scale: 0.8, opacity: 0.2 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.7 }}
                        >
                            <motion.span
                                className="loader-rocket"
                                animate={{ x: [-80, 0, 86], y: [38, -22, -45], rotate: [-18, -4, 22] }}
                                transition={{ duration: 1.6, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                            >
                                <Rocket className="h-7 w-7" />
                            </motion.span>
                        </motion.div>
                        <motion.p
                            className="text-sm uppercase tracking-[0.33em] text-cyan-100"
                            animate={{ opacity: [0.5, 1, 0.5] }}
                            transition={{ duration: 1.2, repeat: Number.POSITIVE_INFINITY }}
                        >
                            {t.loading.text}
                        </motion.p>
                    </div>
                </motion.div>
            ) : null}
        </AnimatePresence>
    );
}
