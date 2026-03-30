"use client";

import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Briefcase, Code, Activity, Cpu } from "lucide-react";
import { SectionTitle } from "./SectionTitle";
import { useI18n } from "@/i18n/I18nProvider";

const statIcons = [Briefcase, Code, Activity, Cpu];

export function About() {
    const { t, locale } = useI18n();
    const shouldReduceMotion = useReducedMotion();
    const [isViewerOpen, setIsViewerOpen] = useState(false);
    const [cvLang, setCvLang] = useState<'en' | 'vi'>(locale);
    const stats = t.about.stats.map((item, index) => ({ ...item, icon: statIcons[index] ?? Briefcase }));

    const cvUrls = {
        en: "/LamNguyenAnhHao_FullstackDev_CV.pdf",
        vi: "/LamNguyenAnhHao_FullstackDev_CV_VN.pdf"
    };

    const currentCvUrl = cvUrls[cvLang];

    return (
        <section id="about" className="section-space px-4 md:px-8">
            <SectionTitle
                eyebrow={t.about.eyebrow}
                title={t.about.title}
                description={t.about.description}
            />

            <div className="mx-auto grid w-full max-w-6xl gap-10 md:grid-cols-2 md:items-center">
                <motion.div
                    initial={shouldReduceMotion ? undefined : { opacity: 0, x: -30 }}
                    whileInView={shouldReduceMotion ? undefined : { opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.75 }}
                    className="relative mx-auto flex flex-col items-center"
                >
                    <div className="relative aspect-[3/4] w-64 overflow-hidden rounded-[2rem] border-4 border-cyan-500 bg-slate-800 shadow-[0_0_100px_-20px_rgba(6,182,212,0.4)] md:w-80">
                        <img
                            className="h-full w-full object-cover transition-transform duration-700 hover:scale-110"
                            src="/avatar.jpg"
                            alt="Avatar"
                            onError={(e) => {
                                e.currentTarget.style.display = 'none';
                                e.currentTarget.parentElement!.classList.add('flex', 'items-center', 'justify-center');
                                e.currentTarget.parentElement!.innerHTML = '<span class="text-4xl font-black text-cyan-500/50">LNAH</span>';
                            }}
                        />
                        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-cyan-500/30 bg-slate-950/80 px-6 py-2 text-sm font-bold uppercase tracking-wider text-cyan-50 backdrop-blur-md shadow-lg">
                            Lam Nguyen Anh Hao
                        </div>
                    </div>

                    <button
                        onClick={() => {
                            setCvLang(locale);
                            setIsViewerOpen(true);
                        }}
                        className="mt-12 group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-slate-800/50 p-4 px-8 font-medium text-cyan-50 shadow-[0_0_40px_-10px_rgba(34,211,238,0.3)] ring-1 ring-cyan-500/30 backdrop-blur-md transition-all hover:bg-slate-700/50 hover:shadow-[0_0_60px_-15px_rgba(34,211,238,0.5)] hover:ring-cyan-400"
                    >
                        <span className="relative z-10 flex items-center gap-2">
                            {t.about.viewCv}
                            <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                        </span>
                        <div className="absolute inset-0 z-0 bg-gradient-to-r from-cyan-600/20 to-indigo-600/20 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                    </button>
                </motion.div>

                <motion.div
                    initial={shouldReduceMotion ? undefined : { opacity: 0, x: 30 }}
                    whileInView={shouldReduceMotion ? undefined : { opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.75 }}
                    className="space-y-6"
                >
                    <p className="text-lg leading-8 text-slate-300">
                        {t.about.paragraphs[0]}
                    </p>
                    <p className="text-lg leading-8 text-slate-300">
                        {t.about.paragraphs[1]}
                    </p>

                    <div className="grid grid-cols-2 gap-4">
                        {stats.map((stat) => {
                            const Icon = stat.icon;
                            return (
                                <div key={stat.label} className="glass-card flex flex-col items-center rounded-2xl p-4 text-center transition-transform hover:scale-105">
                                    <Icon className="mb-2 h-8 w-8 text-cyan-400" />
                                    <p className="text-3xl font-bold text-cyan-50">{stat.value}</p>
                                    <p className="mt-1 text-sm font-medium text-slate-300">{stat.label}</p>
                                </div>
                            );
                        })}
                    </div>

                    <div className="mt-6 rounded-xl border border-cyan-500/20 bg-slate-900/40 p-5 backdrop-blur-sm transition-colors hover:border-cyan-500/40 hover:bg-slate-900/60">
                        <h4 className="mb-3 flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-cyan-400">
                            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_currentColor]"></span>
                            {t.about.languageTitle}
                        </h4>
                        <div className="space-y-3">
                            <div className="flex flex-wrap gap-x-6 gap-y-2 text-slate-200">
                                <div className="flex items-center gap-2">
                                    <span className="font-semibold text-white">{t.about.languageEnglish}:</span>
                                    <span className="rounded bg-cyan-900/30 px-2 py-0.5 text-sm font-medium text-cyan-200">VSTEP B1</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="font-semibold text-white">{t.about.languageVietnamese}:</span>
                                    <span className="rounded bg-cyan-900/30 px-2 py-0.5 text-sm font-medium text-cyan-200">{t.about.nativeSpeaker}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>

            <AnimatePresence>
                {isViewerOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-sm sm:p-6"
                        onClick={() => setIsViewerOpen(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                            className="relative flex h-full max-h-[90vh] w-full max-w-6xl flex-col overflow-hidden rounded-2xl border border-white/10 bg-slate-900 shadow-2xl"
                        >
                            <div className="flex items-center justify-between border-b border-white/10 bg-slate-800/50 p-4">
                                <div className="flex items-center gap-4">
                                    <h3 className="text-lg font-medium text-white">{t.about.modalTitle}</h3>
                                    <div className="flex items-center rounded-lg border border-cyan-500/30 bg-slate-900/50 p-1">
                                        <button
                                            onClick={() => setCvLang('en')}
                                            className={`rounded-md px-3 py-1 text-sm transition-all ${cvLang === 'en' ? 'bg-cyan-500 text-white shadow-sm' : 'text-slate-400 hover:text-white'}`}
                                        >
                                            EN
                                        </button>
                                        <button
                                            onClick={() => setCvLang('vi')}
                                            className={`rounded-md px-3 py-1 text-sm transition-all ${cvLang === 'vi' ? 'bg-cyan-500 text-white shadow-sm' : 'text-slate-400 hover:text-white'}`}
                                        >
                                            VI
                                        </button>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <a
                                        href={currentCvUrl}
                                        download
                                        className="text-sm font-medium text-cyan-400 transition-colors hover:text-cyan-300"
                                    >
                                        {t.about.downloadPdf}
                                    </a>
                                    <button
                                        onClick={() => setIsViewerOpen(false)}
                                        className="rounded-full bg-slate-800 p-2 text-slate-400 transition-colors hover:bg-slate-700 hover:text-white"
                                    >
                                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                            <div className="flex-1 overflow-hidden bg-slate-100">
                                <object
                                    key={currentCvUrl}
                                    data={`${currentCvUrl}#toolbar=0`}
                                    type="application/pdf"
                                    className="h-full w-full"
                                >
                                    <div className="flex h-full flex-col items-center justify-center p-8 text-center text-slate-600">
                                        <p className="mb-4 text-lg">{t.about.cannotDisplayPdf}</p>
                                        <a
                                            href={currentCvUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="rounded-lg bg-cyan-600 px-6 py-2 tracking-wide text-white transition-colors hover:bg-cyan-700 font-medium"
                                        >
                                            {t.about.openInNewTab}
                                        </a>
                                    </div>
                                </object>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
