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

const categories: ProjectCategory[] = ["all", "education", "ecommerce", "blockchain", "management"];

function getProjectCoverImage(project: ProjectItem) {
    if (!project.gallery || project.gallery.length === 0) {
        return null;
    }

    const mainImage = project.gallery.find((item) => /\/main\.(png|jpe?g|webp)$/i.test(item));
    return mainImage ?? project.gallery[0];
}

type ProjectCardProps = {
    project: ProjectItem;
    index: number;
    shouldReduceMotion: boolean;
    onOpen: (project: ProjectItem) => void;
};

function ProjectCard({ project, index, shouldReduceMotion, onOpen }: ProjectCardProps) {
    const { t } = useI18n();
    const coverImage = getProjectCoverImage(project);
    const rotateX = useMotionValue(0);
    const rotateY = useMotionValue(0);
    const lift = useMotionValue(0);
    const glareX = useMotionValue(50);
    const glareY = useMotionValue(50);
    const glareOpacity = useMotionValue(0);

    const smoothRotateX = useSpring(rotateX, { stiffness: 220, damping: 22, mass: 0.65 });
    const smoothRotateY = useSpring(rotateY, { stiffness: 220, damping: 22, mass: 0.65 });
    const smoothLift = useSpring(lift, { stiffness: 190, damping: 22, mass: 0.7 });
    const smoothGlareOpacity = useSpring(glareOpacity, { stiffness: 170, damping: 20, mass: 0.6 });

    const glareXPercent = useTransform(glareX, (value) => `${value}%`);
    const glareYPercent = useTransform(glareY, (value) => `${value}%`);
    const glareBackground = useMotionTemplate`radial-gradient(circle at ${glareXPercent} ${glareYPercent}, rgba(143,235,255,.42), rgba(255,168,112,.18) 30%, transparent 64%)`;

    const handleMove = (event: ReactPointerEvent<HTMLElement>) => {
        if (shouldReduceMotion || event.pointerType === "touch") {
            return;
        }

        const rect = event.currentTarget.getBoundingClientRect();
        const px = (event.clientX - rect.left) / rect.width;
        const py = (event.clientY - rect.top) / rect.height;

        rotateY.set((px - 0.5) * 14);
        rotateX.set((0.5 - py) * 12);
        glareX.set(px * 100);
        glareY.set(py * 100);
    };

    const handleEnter = () => {
        if (shouldReduceMotion) {
            return;
        }

        lift.set(-7);
        glareOpacity.set(1);
    };

    const handleLeave = () => {
        rotateX.set(0);
        rotateY.set(0);
        lift.set(0);
        glareOpacity.set(0);
    };

    return (
        <motion.article
            initial={shouldReduceMotion ? undefined : { opacity: 0, y: 24 }}
            whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.48, delay: index * 0.07 }}
            className="project-card project-card-tilt"
            style={
                shouldReduceMotion
                    ? undefined
                    : {
                        rotateX: smoothRotateX,
                        rotateY: smoothRotateY,
                        y: smoothLift,
                        transformPerspective: 1100,
                    }
            }
            onPointerMove={handleMove}
            onPointerEnter={handleEnter}
            onPointerLeave={handleLeave}
        >
            <motion.div
                aria-hidden
                className="project-glare"
                style={
                    shouldReduceMotion
                        ? undefined
                        : {
                            opacity: smoothGlareOpacity,
                            backgroundImage: glareBackground,
                        }
                }
            />

            <div className="project-card-content">
                {coverImage ? (
                    <img
                        src={coverImage}
                        alt={`${project.title} cover`}
                        className="project-cover w-full object-cover"
                        loading="lazy"
                    />
                ) : (
                    <div className="project-cover" />
                )}
                <h3 className="mt-4 text-xl font-semibold text-white">{project.title}</h3>
                <p className="mt-2 text-slate-300">{project.description}</p>
                <p className="mt-2 text-sm text-cyan-100/90">{t.projects.roleLabel}: {project.role}</p>

                <div className="mt-4 flex flex-wrap gap-2">
                    {project.technologies.split(";").map((tech) => (
                        <span key={tech} className="tech-tag">
                            {tech.trim()}
                        </span>
                    ))}
                </div>

                <div className="mt-5 flex items-center gap-3">
                    <a href={project.demo} className="icon-btn" target="_blank" rel="noreferrer">
                        <ExternalLink className="h-4 w-4" />
                    </a>
                    <button
                        type="button"
                        className="ml-auto inline-flex items-center gap-2 text-sm text-cyan-100"
                        onClick={() => onOpen(project)}
                    >
                        {t.projects.details} <Rocket className="h-4 w-4" />
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

            <div className="mx-auto grid w-full max-w-6xl gap-6 md:grid-cols-2 xl:grid-cols-3">
                {filtered.map((project, index) => (
                    <ProjectCard
                        key={project.title}
                        project={project}
                        index={index}
                        shouldReduceMotion={Boolean(shouldReduceMotion)}
                        onOpen={setActiveProject}
                    />
                ))}
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
