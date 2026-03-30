"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll } from "framer-motion";
import { Menu, Rocket, X } from "lucide-react";
import clsx from "clsx";
import { useI18n } from "@/i18n/I18nProvider";

export function Navbar() {
    const { t } = useI18n();
    const { scrollY } = useScroll();
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const links = t.navbar.links;

    useEffect(() => {
        return scrollY.on("change", (latest) => {
            setScrolled(latest > 24);
        });
    }, [scrollY]);

    return (
        <header className="fixed inset-x-0 top-0 z-40 px-4 py-4 md:px-8">
            <nav
                className={clsx(
                    "mx-auto flex w-full max-w-6xl items-center justify-between rounded-2xl border px-4 py-3 transition-all duration-400 md:px-6",
                    scrolled
                        ? "border-[rgba(94,225,255,.45)] bg-[rgba(7,12,28,.7)] shadow-[0_0_30px_rgba(54,201,255,.23)] backdrop-blur-xl"
                        : "border-transparent bg-transparent"
                )}
            >
                <a href="#home" className="group flex items-center gap-2 text-sm font-semibold tracking-[0.18em] text-white">
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-cyan-300/65 bg-cyan-500/20 transition group-hover:scale-105 group-hover:shadow-[0_0_18px_rgba(94,225,255,.6)]">
                        <Rocket className="h-4 w-4 text-cyan-200" />
                    </span>
                    {t.navbar.brand}
                </a>

                <ul className="hidden items-center gap-6 text-xs font-medium uppercase tracking-[0.19em] text-slate-200 lg:flex">
                    {links.map((link) => (
                        <li key={link.href}>
                            <a className="link-neon" href={link.href}>
                                {link.label}
                            </a>
                        </li>
                    ))}
                </ul>

                <button
                    type="button"
                    className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-200/30 bg-slate-900/40 text-cyan-100 md:hidden"
                    onClick={() => setIsOpen((v) => !v)}
                    aria-label={t.navbar.toggleMenuAria}
                >
                    {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </button>
            </nav>

            <AnimatePresence>
                {isOpen ? (
                    <motion.div
                        initial={{ opacity: 0, x: 56 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 44 }}
                        transition={{ duration: 0.28 }}
                        className="absolute right-4 top-20 w-64 rounded-2xl border border-cyan-300/35 bg-slate-950/92 p-4 shadow-[0_0_24px_rgba(94,225,255,.3)] backdrop-blur-xl md:hidden"
                    >
                        <ul className="space-y-3 text-xs uppercase tracking-[0.19em] text-cyan-50">
                            {links.map((link) => (
                                <li key={link.href}>
                                    <a
                                        href={link.href}
                                        onClick={() => setIsOpen(false)}
                                        className="block rounded-lg px-3 py-2 transition hover:bg-cyan-400/10"
                                    >
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                ) : null}
            </AnimatePresence>
        </header>
    );
}
