"use client";

import dynamic from "next/dynamic";
import { motion, useInView, useReducedMotion } from "framer-motion";
import type { CSSProperties } from "react";
import { useMemo, useRef, useState } from "react";
import type { OrbitSkill } from "./SkillsOrbit3D";
import { SectionTitle } from "./SectionTitle";
import { useI18n } from "@/i18n/I18nProvider";

const SkillsOrbit3D = dynamic(() => import("./SkillsOrbit3D").then((mod) => mod.SkillsOrbit3D), {
    ssr: false,
});

const MAX_VISIBLE_ORBITS = 5;
const DEFAULT_VISIBLE_SKILLS = ["Node.js", "ExpressJS", "NestJS", "Next.js", "Prisma ORM"];

const skills: OrbitSkill[] = [
    { name: "Node.js", percent: 90, orbit: 220, duration: 24, angle: 8, glow: "#68A063" },
    { name: "ExpressJS", percent: 89, orbit: 170, duration: 18, angle: 118, glow: "#9CA3AF" },
    { name: "NestJS", percent: 87, orbit: 270, duration: 30, angle: 58, glow: "#EA2845" },
    { name: "Next.js", percent: 86, orbit: 245, duration: 27, angle: 214, glow: "#E5E7EB" },
    { name: "ReactJS", percent: 85, orbit: 200, duration: 22, angle: 165, glow: "#61DAFB" },
    { name: "Prisma ORM", percent: 88, orbit: 195, duration: 20, angle: 284, glow: "#5EEAD4" },
    { name: "MySQL", percent: 85, orbit: 145, duration: 15, angle: 332, glow: "#60A5FA" },
    { name: "React Native", percent: 84, orbit: 305, duration: 34, angle: 36, glow: "#61DAFB" },
    { name: "Microsoft SQL", percent: 80, orbit: 160, duration: 22, angle: 250, glow: "#CC2927" },
    { name: "MongoDB", percent: 75, orbit: 180, duration: 26, angle: 140, glow: "#47A248" },
    { name: "CouchDB", percent: 70, orbit: 320, duration: 32, angle: 300, glow: "#E42528" },
    { name: "RESTful API", percent: 95, orbit: 210, duration: 25, angle: 80, glow: "#FF7043" },
    { name: "Docker", percent: 75, orbit: 290, duration: 35, angle: 190, glow: "#2496ED" },
    { name: "GitHub Actions", percent: 70, orbit: 240, duration: 29, angle: 45, glow: "#2088FF" },
    { name: "GitLab CI", percent: 65, orbit: 260, duration: 31, angle: 320, glow: "#FC6D26" },
    { name: "PHP", percent: 80, orbit: 200, duration: 23, angle: 165, glow: "#777BB4" },
    { name: "Python", percent: 75, orbit: 280, duration: 33, angle: 275, glow: "#3776AB" },
    { name: "Javascript", percent: 90, orbit: 150, duration: 19, angle: 10, glow: "#F7DF1E" },
    { name: "Git", percent: 90, orbit: 230, duration: 28, angle: 130, glow: "#F05032" },
    { name: "Postman", percent: 95, orbit: 185, duration: 21, angle: 220, glow: "#FF6C37" },
    { name: "Bun", percent: 85, orbit: 135, duration: 16, angle: 90, glow: "#FBF0DF" },
    { name: "TypeScript", percent: 88, orbit: 165, duration: 20, angle: 300, glow: "#3178C6" },
    { name: "Socket.IO", percent: 85, orbit: 215, duration: 25, angle: 150, glow: "#010101" },
    { name: "Fabric", percent: 80, orbit: 295, duration: 32, angle: 70, glow: "#2F3134" },
    { name: "Firebase", percent: 75, orbit: 190, duration: 22, angle: 230, glow: "#FFCA28" },
    { name: "IPFS", percent: 70, orbit: 255, duration: 30, angle: 280, glow: "#0090FF" },
    { name: "Hyperledger", percent: 65, orbit: 275, duration: 34, angle: 340, glow: "#2F3134" },
    { name: "Tailwind", percent: 85, orbit: 120, duration: 18, angle: 200, glow: "#38BDF8" },
    { name: "SQL Server", percent: 65, orbit: 260, duration: 31, angle: 320, glow: "#FC6D26" },
    { name: "Sequelize", percent: 80, orbit: 300, duration: 30, angle: 50, glow: "#FFFFFF" },

];

type TechnicalStackGroup = {
    label: string;
    items: string;
    orbitNames: string[];
};

const technicalStacks: TechnicalStackGroup[] = [
    {
        label: "Backend Development",
        items: "Node.js, ExpressJS, NestJS, Socket.IO",
        orbitNames: ["Node.js", "ExpressJS", "NestJS", "Socket.IO"],
    },
    {
        label: "Frontend Development",
        items: "ReactJS, Next.js, React Native",
        orbitNames: ["ReactJS", "Next.js", "React Native"],
    },
    {
        label: "Blockchain Technology",
        items: "Hyperledger Fabric, IPFS",
        orbitNames: ["Hyperledger", "Fabric", "IPFS"],
    },
    {
        label: "Databases",
        items: "MySQL, SQL Server, MongoDB, Firebase",
        orbitNames: ["MySQL", "SQL Server", "Microsoft SQL", "MongoDB", "Firebase"],
    },
    {
        label: "ORM & API",
        items: "Prisma ORM, Sequelize, RESTful API",
        orbitNames: ["Prisma ORM", "Sequelize", "RESTful API"],
    },
    {
        label: "DevOps & Cloud",
        items: "Docker, GitHub Actions, GitLab CI",
        orbitNames: ["Docker", "GitHub Actions", "GitLab CI"],
    },
    {
        label: "Programming Languages",
        items: "TypeScript, JavaScript, Python, PHP",
        orbitNames: ["TypeScript", "Javascript", "Python", "PHP"],
    },
    {
        label: "Other Tools",
        items: "Git, Postman, Bun",
        orbitNames: ["Git", "Postman", "Bun"],
    },
];

function buildFixedVisibleSkills(seedNames: string[], allSkillNames: string[]) {
    const valid = seedNames.filter((name) => allSkillNames.includes(name));
    const unique = Array.from(new Set(valid));

    if (unique.length > MAX_VISIBLE_ORBITS) {
        const trimmed = [...unique];
        while (trimmed.length > MAX_VISIBLE_ORBITS) {
            const randomIndex = Math.floor(Math.random() * trimmed.length);
            trimmed.splice(randomIndex, 1);
        }
        return trimmed;
    }

    const remainingPool = allSkillNames.filter((name) => !unique.includes(name));
    const completed = [...unique];
    while (completed.length < MAX_VISIBLE_ORBITS && remainingPool.length > 0) {
        const randomIndex = Math.floor(Math.random() * remainingPool.length);
        const [picked] = remainingPool.splice(randomIndex, 1);
        if (picked) {
            completed.push(picked);
        }
    }

    return completed;
}

export function Skills() {
    const { t } = useI18n();
    const shouldReduceMotion = useReducedMotion();
    const panelRef = useRef<HTMLDivElement>(null);
    const isPanelInView = useInView(panelRef, { amount: 0.36 });
    const allSkillNames = useMemo(() => skills.map((skill) => skill.name), []);
    const [activeSkillIndex, setActiveSkillIndex] = useState<number | null>(null);
    const [activeGroupLabel, setActiveGroupLabel] = useState<string | null>(null);
    const [visibleSkillNames, setVisibleSkillNames] = useState<string[]>(() => buildFixedVisibleSkills(DEFAULT_VISIBLE_SKILLS, allSkillNames));
    const skillNameSet = useMemo(() => new Set(allSkillNames), [allSkillNames]);
    const reducedQuality = useMemo(() => {
        if (typeof window === "undefined") {
            return false;
        }

        const memory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory;
        const cores = navigator.hardwareConcurrency ?? 8;
        const coarsePointer = window.matchMedia("(pointer: coarse)").matches;

        return coarsePointer || (memory !== undefined && memory <= 8) || cores <= 8;
    }, []);
    const shouldPauseOrbit = Boolean(shouldReduceMotion) || !isPanelInView;

    const toggleSkillVisibility = (skillName: string) => {
        setActiveGroupLabel(null);
        setVisibleSkillNames((previous) => {
            const current = previous.filter((name) => skillNameSet.has(name));
            if (current.includes(skillName)) {
                const removed = current.filter((name) => name !== skillName);
                return buildFixedVisibleSkills(removed, allSkillNames);
            }

            if (current.length < MAX_VISIBLE_ORBITS) {
                return buildFixedVisibleSkills([...current, skillName], allSkillNames);
            }

            const randomIndex = Math.floor(Math.random() * current.length);
            const replaced = current.filter((_, index) => index !== randomIndex);
            return buildFixedVisibleSkills([...replaced, skillName], allSkillNames);
        });
    };

    const activateGroup = (group: TechnicalStackGroup) => {
        setActiveGroupLabel(group.label);
        setActiveSkillIndex(null);
        setVisibleSkillNames(() => {
            const uniqueGroupSkills = Array.from(new Set(group.orbitNames.filter((name) => skillNameSet.has(name))));
            return buildFixedVisibleSkills(uniqueGroupSkills, allSkillNames);
        });
    };

    return (
        <section id="skills" className="section-space px-4 md:px-8">
            <SectionTitle
                eyebrow={t.skills.eyebrow}
                title={t.skills.title}
                description={t.skills.description}
            />

            <div className="mx-auto grid w-full max-w-[108rem] gap-6 lg:grid-cols-[1.9fr_.62fr] lg:items-center">
                <motion.div
                    initial={shouldReduceMotion ? undefined : { opacity: 0, y: 24 }}
                    whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="skills-3d-panel"
                    ref={panelRef}
                >
                    <SkillsOrbit3D
                        skills={skills}
                        paused={shouldPauseOrbit}
                        reducedQuality={reducedQuality || Boolean(shouldReduceMotion)}
                        highlightedSkillIndex={activeSkillIndex}
                        onHighlightChange={setActiveSkillIndex}
                        visibleSkillNames={visibleSkillNames}
                    />
                </motion.div>

                <motion.aside
                    initial={shouldReduceMotion ? undefined : { opacity: 0, x: 20 }}
                    whileInView={shouldReduceMotion ? undefined : { opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.55, delay: 0.12 }}
                    className="skills-legend"
                >
                    <div className="rounded-2xl border border-cyan-500/10 bg-slate-900/60 p-5 shadow-2xl backdrop-blur-sm">
                        <p className="mb-4 text-xs font-bold uppercase tracking-[0.16em] text-cyan-400">{t.skills.ecosystem}</p>
                        <div className="space-y-4">
                            {technicalStacks.map((group) => (
                                <div key={group.label}>
                                    <button
                                        type="button"
                                        onClick={() => activateGroup(group)}
                                        className={`mb-2 text-left text-sm font-semibold transition-colors ${activeGroupLabel === group.label
                                            ? "text-cyan-200"
                                            : "text-slate-300 hover:text-cyan-200"
                                            }`}
                                    >
                                        {group.label === "Backend Development" && t.skills.groups.backend}
                                        {group.label === "Frontend Development" && t.skills.groups.frontend}
                                        {group.label === "Blockchain Technology" && t.skills.groups.blockchain}
                                        {group.label === "Databases" && t.skills.groups.databases}
                                        {group.label === "ORM & API" && t.skills.groups.ormApi}
                                        {group.label === "DevOps & Cloud" && t.skills.groups.devops}
                                        {group.label === "Programming Languages" && t.skills.groups.languages}
                                        {group.label === "Other Tools" && t.skills.groups.tools}
                                    </button>
                                    <div className="flex flex-wrap gap-2">
                                        {group.items.split(", ").map((itemText) => {
                                            const normalizedText = itemText.trim();
                                            const skillIndex = skills.findIndex(
                                                (skill) =>
                                                    normalizedText.toLowerCase().includes(skill.name.toLowerCase()) ||
                                                    skill.name.toLowerCase().includes(normalizedText.toLowerCase())
                                            );
                                            const isInteractive = skillIndex >= 0;
                                            const skill = isInteractive ? skills[skillIndex] : null;
                                            const isVisible = skill && visibleSkillNames.includes(skill.name);

                                            return (
                                                <button
                                                    key={itemText}
                                                    type="button"
                                                    disabled={!isInteractive}
                                                    onClick={() => isInteractive && skill && toggleSkillVisibility(skill.name)}
                                                    onMouseEnter={() => isInteractive && isVisible && setActiveSkillIndex(skillIndex)}
                                                    onMouseLeave={() => isInteractive && setActiveSkillIndex(null)}
                                                    onFocus={() => isInteractive && isVisible && setActiveSkillIndex(skillIndex)}
                                                    onBlur={() => isInteractive && setActiveSkillIndex(null)}
                                                    className={`
                                                        rounded-md border px-2.5 py-1 text-xs font-medium transition-all duration-300
                                                        ${isInteractive
                                                            ? isVisible
                                                                ? "border-cyan-400 bg-cyan-400/20 text-cyan-100 shadow-[0_0_15px_rgba(34,211,238,0.3)]"
                                                                : "border-slate-700 bg-slate-800/30 text-slate-400 hover:border-cyan-500/50 hover:bg-slate-800 hover:text-cyan-200"
                                                            : "cursor-default border-transparent bg-slate-800/20 text-slate-500/50"
                                                        }
                                                    `}
                                                >
                                                    {/* If it's a 3D skill, show a tiny dot if visible */}
                                                    {isInteractive && (
                                                        <span
                                                            className={`mr-1.5 inline-block h-1.5 w-1.5 rounded-full transition-colors duration-300 ${isVisible ? '' : 'bg-slate-600'}`}
                                                            style={isVisible ? { backgroundColor: skill?.glow, boxShadow: activeSkillIndex === skillIndex ? `0 0 8px ${skill?.glow}` : 'none' } : {}}
                                                        />
                                                    )}
                                                    {normalizedText}
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.aside>
            </div>
        </section>
    );
}
