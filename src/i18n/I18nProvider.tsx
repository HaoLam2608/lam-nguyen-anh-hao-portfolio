"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { messages, type AppMessages, type Locale } from "./messages";

type I18nContextValue = {
    locale: Locale;
    setLocale: (locale: Locale) => void;
    t: AppMessages;
};

const STORAGE_KEY = "portfolio.locale";

const I18nContext = createContext<I18nContextValue | null>(null);

type I18nProviderProps = {
    children: React.ReactNode;
};

export function I18nProvider({ children }: I18nProviderProps) {
    const [locale, setLocale] = useState<Locale>("vi");

    useEffect(() => {
        const storedLocale = window.localStorage.getItem(STORAGE_KEY);
        if (storedLocale === "en" || storedLocale === "vi") {
            setLocale(storedLocale);
        }
    }, []);

    useEffect(() => {
        document.documentElement.lang = locale;
        window.localStorage.setItem(STORAGE_KEY, locale);
    }, [locale]);

    const value = useMemo<I18nContextValue>(() => {
        return {
            locale,
            setLocale,
            t: messages[locale],
        };
    }, [locale]);

    return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
    const context = useContext(I18nContext);
    if (!context) {
        throw new Error("useI18n must be used within I18nProvider");
    }
    return context;
}
