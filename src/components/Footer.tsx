"use client";

import { useEffect, useState } from "react";
import { useI18n } from "@/i18n/I18nProvider";

export function Footer() {
    const { t, locale } = useI18n();
    const [visitCount, setVisitCount] = useState<number | null>(null);

    useEffect(() => {
        let cancelled = false;

        const updateVisitCount = async () => {
            try {
                const response = await fetch("https://api.counterapi.dev/v1/haolamnguyenanhhao-portfolio/visits/up", {
                    cache: "no-store",
                });

                if (!response.ok) {
                    throw new Error("Failed to update visit count");
                }

                const data: { value?: number; count?: number } = await response.json();
                const nextCount = typeof data.count === "number" ? data.count : data.value;
                if (!cancelled && typeof nextCount === "number") {
                    setVisitCount(nextCount);
                }
            } catch {
                const storageKey = "portfolio-local-visit-count";
                const current = Number(localStorage.getItem(storageKey) ?? "0");
                const next = Number.isFinite(current) ? current + 1 : 1;
                localStorage.setItem(storageKey, String(next));
                if (!cancelled) {
                    setVisitCount(next);
                }
            }
        };

        void updateVisitCount();

        return () => {
            cancelled = true;
        };
    }, []);

    return (
        <footer className="border-t border-cyan-300/15 px-4 py-8 text-center text-sm text-slate-400 md:px-8">
            <p>{t.footer.text}</p>
            <p className="mt-2 text-xs text-cyan-100/80">
                {t.footer.visitsLabel}: {visitCount !== null ? visitCount.toLocaleString(locale === "vi" ? "vi-VN" : "en-US") : "..."}
            </p>
        </footer>
    );
}
