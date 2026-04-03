"use client";

import { useI18n } from "@/i18n/I18nProvider";
import { type Locale } from "@/i18n/messages";

const locales: Locale[] = ["vi", "en"];

export function LanguageSwitcher() {
    const { locale, setLocale } = useI18n();

    return (
        <div className="fixed bottom-4 right-4 z-50 rounded-2xl border border-cyan-300/35 bg-slate-950/85 p-1.5 shadow-[0_0_24px_rgba(94,225,255,.22)] backdrop-blur-xl 2xl:bottom-auto 2xl:right-8 2xl:top-5">
            <div className="flex items-center gap-1">
                {locales.map((item) => (
                    <button
                        key={item}
                        type="button"
                        onClick={() => setLocale(item)}
                        className={`rounded-xl px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] transition ${locale === item
                            ? "border border-cyan-300/60 bg-cyan-300/20 text-cyan-100"
                            : "border border-slate-700/70 bg-slate-900/50 text-slate-300 hover:border-cyan-300/40 hover:text-cyan-100"
                            }`}
                    >
                        {item.toUpperCase()}
                    </button>
                ))}
            </div>
        </div>
    );
}
