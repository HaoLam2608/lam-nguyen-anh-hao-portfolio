"use client";

import { useI18n } from "@/i18n/I18nProvider";

export function Footer() {
    const { t } = useI18n();

    return (
        <footer className="border-t border-cyan-300/15 px-4 py-8 text-center text-sm text-slate-400 md:px-8">
            <p>{t.footer.text}</p>
        </footer>
    );
}
