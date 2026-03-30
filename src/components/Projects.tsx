"use client";

import type { PointerEvent as ReactPointerEvent } from "react";
import { useEffect, useMemo, useState } from "react";
import {
    AnimatePresence,
    motion,
    useMotionTemplate,
    useMotionValue,
    useReducedMotion,
    useSpring,
    useTransform,
} from "framer-motion";
import { CheckCircle2, ExternalLink, Rocket, X } from "lucide-react";
import { SectionTitle } from "./SectionTitle";
import { useI18n } from "@/i18n/I18nProvider";
import { projectsByLocale, type ProjectCategory, type ProjectItem } from "@/i18n/messages";

const categories: ProjectCategory[] = ["all", "education", "ecommerce", "blockchain", "management", "landing"];

function getProjectCoverImage(project: ProjectItem) {
    if (!project.gallery || project.gallery.length === 0) {
        return null;
    }

    const mainImage = project.gallery.find((item) => /\/main\.(png|jpe?g|webp)$/i.test(item));
    return mainImage ?? project.gallery[0];
}

function FeaturedProjectCard({ project, onOpen, t }: { project: ProjectItem; onOpen: (p: ProjectItem) => void; t: any }) {
    const coverImage = getProjectCoverImage(project);

    return (
        <motion.article
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="group relative flex flex-col md:flex-row items-stretch gap-6 overflow-hidden rounded-[24px] bg-slate-900/40 border border-slate-800 p-4 md:p-6 transition-all hover:bg-slate-900/60 hover:shadow-[0_0_40px_rgba(59,130,246,0.1)]"
        >
            {/* Left side: Large Screenshot */}
            <div className="relative w-full md:w-[60%] overflow-hidden rounded-[16px] bg-slate-800/50 aspect-[16/10] group-hover:shadow-lg transition-all duration-500">
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none" />
                {coverImage ? (
                    <img
                        src={coverImage}
                        alt={`${project.title} cover`}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                        loading="lazy"
                    />
                ) : (
                    <div className="h-full w-full bg-slate-800" />
                )}
            </div>

            {/* Right side: Content */}
            <div className="flex flex-col justify-center w-full md:w-[40%] px-2 md:px-6 py-4">
                <div className="flex items-center justify-between mb-4">
                    <span className="inline-flex items-center rounded-full bg-blue-500/10 px-3 py-1 font-medium text-blue-400 text-xs uppercase tracking-wider border border-blue-500/20">
                        Top Featured
                    </span>
                    <span className="px-3 py-1 text-sm font-semibold text-slate-400 bg-slate-800/50 rounded-full border border-slate-700/50">
                        {project.time}
                    </span>
                </div>

                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 leading-tight group-hover:text-blue-400 transition-colors">
                    {project.title}
                </h3>

                <p className="text-slate-300 md:text-lg mb-6 leading-relaxed">
                    {project.description}
                </p>

                <div className="flex flex-wrap items-center gap-3 mt-auto">
                    <a
                        href={project.demo}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-semibold text-white transition-all hover:bg-blue-500 hover:shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:scale-105"
                    >
                        {t.projects.visitProject} <ExternalLink className="h-4 w-4" />
                    </a>
                    <button
                        onClick={() => onOpen(project)}
                        className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-transparent px-6 py-3.5 text-sm font-semibold text-white transition-all hover:bg-white/5 hover:border-white/40 hover:scale-105"
                    >
                        {t.projects.viewCaseStudy} <Rocket className="h-4 w-4" />
                    </button>
                </div>
            </div>
        </motion.article>
    );
}

function GridProjectCard({ project, index, onOpen, t }: { project: ProjectItem; index: number; onOpen: (p: ProjectItem) => void; t: any }) {
    const coverImage = getProjectCoverImage(project);

    return (
        <motion.article
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
            className="group relative flex flex-col overflow-hidden rounded-[20px] bg-slate-900/40 border border-slate-800 transition-all hover:bg-slate-900/60 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)] h-full"
        >
            <div className="relative h-[220px] w-full overflow-hidden bg-slate-800">
                <div className="absolute top-3 right-3 z-20">
                    <span className="px-2.5 py-1 text-xs font-semibold text-white/90 bg-black/50 backdrop-blur-md rounded-lg border border-white/10 shadow-sm">
                        {project.time}
                    </span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-900/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 pointer-events-none" />
                {coverImage ? (
                    <img
                        src={coverImage}
                        alt={`${project.title} cover`}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                        loading="lazy"
                    />
                ) : (
                    <div className="h-full w-full bg-slate-800" />
                )}
            </div>

            <div className="flex flex-col flex-grow p-5 md:p-6">
                <h3 className="text-lg md:text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors line-clamp-2">
                    {project.title}
                </h3>
                <p className="text-sm text-slate-400 mb-6 line-clamp-2">
                    {project.description}
                </p>

                <div className="mt-auto pt-4 flex items-center justify-between gap-3 border-t border-slate-800 group-hover:border-slate-700 transition-colors">
                    <a
                        href={project.demo}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-blue-600/10 text-blue-400 px-3 py-2 text-sm font-medium transition-colors hover:bg-blue-600 hover:text-white"
                        title={t.projects.visitProject}
                    >
                        Demo <ExternalLink className="h-4 w-4" />
                    </a>
                    <button
                        onClick={() => onOpen(project)}
                        className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-slate-700 bg-transparent text-slate-300 px-3 py-2 text-sm font-medium transition-colors hover:bg-white/10 hover:text-white hover:border-slate-500"
                        title={t.projects.viewCaseStudy}
                    >
                        {t.projects.viewCaseStudy} <Rocket className="h-4 w-4" />
                    </button>
                </div>
            </div>
        </motion.article>
    );
}

export function Projects() {
    const { t, locale } = useI18n();
    const shouldReduceMotion = useReducedMotion();
    const [activeFilter, setActiveFilter] = useState<ProjectCategory>("all");
    const [activeProject, setActiveProject] = useState<ProjectItem | null>(null);
    const [activePreviewImage, setActivePreviewImage] = useState<string | null>(null);
    const projects = projectsByLocale[locale];

    const categoryLabels: Record<ProjectCategory, string> = {
        all: t.projects.categories.all,
        education: t.projects.categories.education,
        ecommerce: t.projects.categories.ecommerce,
        blockchain: t.projects.categories.blockchain,
        management: t.projects.categories.management,
        landing: t.projects.categories.landing,
    };

    useEffect(() => {
        setActiveProject(null);
        setActivePreviewImage(null);
    }, [locale]);

    useEffect(() => {
        if (!activeProject) {
            setActivePreviewImage(null);
        }
    }, [activeProject]);

    useEffect(() => {
        if (!activeProject) {
            return;
        }

        window.dispatchEvent(new CustomEvent("projects-modal-scroll-lock", { detail: { locked: true } }));

        const previousBodyOverflow = document.body.style.overflow;
        const previousBodyPosition = document.body.style.position;
        const previousBodyTop = document.body.style.top;
        const previousBodyLeft = document.body.style.left;
        const previousBodyRight = document.body.style.right;
        const previousBodyWidth = document.body.style.width;
        const previousBodyScrollBehavior = document.body.style.scrollBehavior;
        const previousHtmlOverflow = document.documentElement.style.overflow;
        const previousHtmlScrollBehavior = document.documentElement.style.scrollBehavior;
        const currentScrollY = window.scrollY;

        document.body.style.overflow = "hidden";
        document.body.style.position = "fixed";
        document.body.style.top = `-${currentScrollY}px`;
        document.body.style.left = "0";
        document.body.style.right = "0";
        document.body.style.width = "100%";
        document.documentElement.style.overflow = "hidden";

        return () => {
            document.body.style.overflow = previousBodyOverflow;
            document.body.style.position = previousBodyPosition;
            document.body.style.top = previousBodyTop;
            document.body.style.left = previousBodyLeft;
            document.body.style.right = previousBodyRight;
            document.body.style.width = previousBodyWidth;
            document.documentElement.style.overflow = previousHtmlOverflow;

            document.body.style.scrollBehavior = "auto";
            document.documentElement.style.scrollBehavior = "auto";
            window.scrollTo({ top: currentScrollY, left: 0, behavior: "auto" });
            document.body.style.scrollBehavior = previousBodyScrollBehavior;
            document.documentElement.style.scrollBehavior = previousHtmlScrollBehavior;

            requestAnimationFrame(() => {
                window.dispatchEvent(new CustomEvent("projects-modal-scroll-lock", { detail: { locked: false } }));
            });
        };
    }, [activeProject]);

    const filtered = useMemo(() => {
        if (activeFilter === "all") {
            return projects;
        }
        return projects.filter((project) => project.category === activeFilter);
    }, [activeFilter, projects]);

    const detailGallery = useMemo(() => {
        if (!activeProject) {
            return [] as string[];
        }

        if (activeProject.gallery && activeProject.gallery.length > 0) {
            return activeProject.gallery.slice(0, 6);
        }

        return Array.from({ length: 6 }, (_, index) => `placeholder-${index + 1}`);
    }, [activeProject]);

    const detailSections = useMemo(() => {
        if (!activeProject) {
            return { achievements: [] as string[], keyFeatures: [] as string[], techStack: [] as string[] };
        }

        const achievementTag = locale === "vi" ? "kết quả" : "outcome";
        const achievementItems = activeProject.highlights.filter((item) => item.toLowerCase().includes(achievementTag));
        const featureItems = activeProject.highlights.filter((item) => !item.toLowerCase().includes(achievementTag));

        const achievements = activeProject.achievements && activeProject.achievements.length > 0
            ? activeProject.achievements.slice(0, 4)
            : achievementItems.slice(0, 4);
        const keyFeatures = activeProject.keyFeatures && activeProject.keyFeatures.length > 0
            ? activeProject.keyFeatures.slice(0, 8)
            : featureItems.slice(0, 8);
        const techStack = activeProject.technologies.split(";").map((item) => item.trim()).filter(Boolean);

        return { achievements, keyFeatures, techStack };
    }, [activeProject, locale]);

    return (
        <section id="projects" className="section-space px-4 md:px-8">
            <SectionTitle
                eyebrow={t.projects.eyebrow}
                title={t.projects.title}
                description={t.projects.description}
            />

            <div className="mx-auto mb-8 flex w-full max-w-6xl flex-wrap justify-center gap-2">
                {categories.map((category) => (
                    <button
                        key={category}
                        type="button"
                        onClick={() => setActiveFilter(category)}
                        className={`rounded-full px-4 py-2 text-xs uppercase tracking-[0.18em] transition ${activeFilter === category
                            ? "bg-cyan-300/25 text-cyan-100 shadow-[0_0_18px_rgba(94,225,255,.33)]"
                            : "bg-slate-900/65 text-slate-300 hover:bg-cyan-300/12"
                            }`}
                    >
                        {categoryLabels[category]}
                    </button>
                ))}
            </div>

            <div className="mx-auto block w-full max-w-6xl">
                {filtered.length > 0 && (
                    <div className="mb-8 w-full">
                        <FeaturedProjectCard
                            project={filtered[0]}
                            onOpen={setActiveProject}
                            t={t}
                        />
                    </div>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filtered.slice(1).map((project, index) => (
                        <div key={project.title} className="h-full">
                            <GridProjectCard
                                project={project}
                                index={index}
                                onOpen={setActiveProject}
                                t={t}
                            />
                        </div>
                    ))}
                </div>
            </div>

            <AnimatePresence>
                {activeProject ? (
                    <motion.div
                        className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 px-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setActiveProject(null)}
                    >
                        <motion.div
                            initial={{ y: 32, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: 20, opacity: 0 }}
                            transition={{ duration: 0.32 }}
                            className="max-h-[90vh] w-full max-w-6xl overflow-y-auto overscroll-contain rounded-3xl border border-cyan-300/35 bg-slate-950/95 p-4 md:p-6"
                            onClick={(event) => event.stopPropagation()}
                            onWheelCapture={(event) => event.stopPropagation()}
                            onTouchMoveCapture={(event) => event.stopPropagation()}
                        >
                            <div className="flex items-start justify-between gap-3 border-b border-white/10 pb-4">
                                <div>
                                    <h3 className="text-xl font-semibold text-white md:text-2xl">{activeProject.title}</h3>
                                    <p className="mt-2 text-sm text-cyan-100/90">{t.projects.roleLabel}: {activeProject.role}</p>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => setActiveProject(null)}
                                    className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-cyan-300/25 bg-slate-900/60 text-cyan-100 transition hover:border-cyan-300/50 hover:text-white"
                                    aria-label={t.projects.close}
                                >
                                    <X className="h-4 w-4" />
                                </button>
                            </div>

                            <div className="mt-5 pr-1">
                                {activeProject.landingPages && activeProject.landingPages.length > 0 ? (
                                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                        {activeProject.landingPages.map((page, index) => {
                                            const hostname = page.url.replace(/^https?:\/\//, '').replace(/\/$/, '');
                                            return (
                                                <div key={index} className="flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white shadow-xl">
                                                    <div className="flex items-center gap-2 bg-[#f3f4f6] px-3 py-2 border-b border-[#e5e7eb]">
                                                        <div className="flex gap-1.5">
                                                            <div className="h-3 w-3 rounded-full bg-[#ff5f56]"></div>
                                                            <div className="h-3 w-3 rounded-full bg-[#ffbd2e]"></div>
                                                            <div className="h-3 w-3 rounded-full bg-[#27c93f]"></div>
                                                        </div>
                                                        <div className="mx-auto flex h-6 w-full max-w-[280px] items-center justify-center rounded-md bg-[#e5e7eb]/50 px-2 text-[11px] font-medium text-[#6b7280]">
                                                            <span className="mr-1.5 h-2 w-2 rounded-full bg-[#10b981]"></span>
                                                            <span className="truncate">{page.url}</span>
                                                        </div>
                                                    </div>
                                                    <div className="relative aspect-[4/3] w-full bg-slate-50 md:aspect-[16/10]">
                                                        <iframe src={page.url} className="absolute top-0 left-0 h-full w-full border-0 pointer-events-auto" loading="lazy" />
                                                    </div>
                                                    <div className="border-t border-slate-100 bg-white p-4">
                                                        <div className="flex items-center justify-between">
                                                            <div>
                                                                <h4 className="text-[15px] font-bold text-slate-800">{page.title}</h4>
                                                                {page.category && <p className="mt-0.5 text-xs text-slate-500">{page.category}</p>}
                                                            </div>
                                                            <a href={page.url} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-slate-600 transition">
                                                                <ExternalLink className="h-5 w-5" />
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
                                        {detailGallery.map((item, index) => (
                                            item.startsWith("placeholder-") ? (
                                                <div
                                                    key={item}
                                                    className="relative aspect-[4/3] overflow-hidden rounded-xl border border-cyan-300/20 bg-[linear-gradient(140deg,rgba(22,30,48,0.95),rgba(12,18,30,0.96))]"
                                                >
                                                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(94,225,255,0.18),transparent_42%),radial-gradient(circle_at_80%_80%,rgba(255,159,114,0.16),transparent_44%)]" />
                                                    <p className="absolute bottom-2 left-2 rounded-md border border-cyan-300/20 bg-slate-950/70 px-2 py-1 text-[10px] uppercase tracking-[0.14em] text-cyan-100">
                                                        {t.projects.screenLabel} {index + 1}
                                                    </p>
                                                </div>
                                            ) : (
                                                <div key={item} className="relative aspect-[4/3] overflow-hidden rounded-xl border border-cyan-300/20">
                                                    <button
                                                        type="button"
                                                        className="h-full w-full cursor-zoom-in"
                                                        onClick={() => setActivePreviewImage(item)}
                                                    >
                                                        <img src={item} alt={`${activeProject.title} ${t.projects.screenLabel} ${index + 1}`} className="h-full w-full object-cover" />
                                                    </button>
                                                </div>
                                            )
                                        ))}
                                    </div>
                                )}

                                <div className="mt-5 grid gap-4 lg:grid-cols-[1.65fr_.85fr]">
                                    <section className="rounded-2xl border border-cyan-300/20 bg-slate-900/50 p-4">
                                        <h4 className="text-lg font-semibold text-white">{t.projects.overview}</h4>
                                        <p className="mt-3 text-sm leading-7 text-slate-300">{activeProject.overview ?? activeProject.description}</p>
                                    </section>

                                    <aside className="rounded-2xl border border-cyan-300/20 bg-slate-900/50 p-4">
                                        <h4 className="text-lg font-semibold text-white">{t.projects.achievements}</h4>
                                        <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-200">
                                            {detailSections.achievements.map((item) => (
                                                <li key={item} className="flex items-start gap-2">
                                                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                                                    <span>{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </aside>
                                </div>

                                <div className="mt-4 grid gap-4 lg:grid-cols-[1.65fr_.85fr]">
                                    <section className="rounded-2xl border border-cyan-300/20 bg-slate-900/50 p-4">
                                        <h4 className="text-lg font-semibold text-white">{t.projects.keyFeatures}</h4>
                                        <div className="mt-3 grid gap-2 md:grid-cols-2">
                                            {detailSections.keyFeatures.map((item) => (
                                                <div key={item} className="rounded-xl border border-cyan-300/15 bg-slate-950/70 px-3 py-2 text-sm text-slate-200">
                                                    <p className="flex gap-2 leading-6">
                                                        <CheckCircle2 className="mt-1 h-3.5 w-3.5 shrink-0 text-emerald-400" />
                                                        <span>{item}</span>
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                    </section>

                                    <aside className="rounded-2xl border border-cyan-300/20 bg-slate-900/50 p-4">
                                        <h4 className="text-lg font-semibold text-white">{t.projects.techStack}</h4>
                                        <div className="mt-3 flex flex-wrap gap-2">
                                            {detailSections.techStack.map((item) => (
                                                <span key={item} className="rounded-full border border-slate-700 bg-slate-950/80 px-2.5 py-1 text-xs text-slate-200">
                                                    {item}
                                                </span>
                                            ))}
                                        </div>
                                    </aside>
                                </div>

                                <div className="mt-5 flex justify-end">
                                    <a
                                        href={activeProject.demo}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="btn-neon-primary"
                                    >
                                        {t.projects.visitProject} <ExternalLink className="h-4 w-4" />
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                ) : null}
            </AnimatePresence>

            <AnimatePresence>
                {activePreviewImage ? (
                    <motion.div
                        className="fixed inset-0 z-[70] flex items-center justify-center bg-black/85 px-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setActivePreviewImage(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.94, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.96, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="relative max-h-[90vh] w-full max-w-6xl"
                            onClick={(event) => event.stopPropagation()}
                        >
                            <img src={activePreviewImage} alt="Project preview" className="max-h-[90vh] w-full rounded-2xl object-contain" />
                            <button
                                type="button"
                                onClick={() => setActivePreviewImage(null)}
                                className="absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-full border border-cyan-200/40 bg-slate-950/70 text-cyan-100 hover:border-cyan-200/70"
                                aria-label={t.projects.close}
                            >
                                <X className="h-4 w-4" />
                            </button>
                        </motion.div>
                    </motion.div>
                ) : null}
            </AnimatePresence>
        </section>
    );
}
