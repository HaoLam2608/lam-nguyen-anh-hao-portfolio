"use client";

import dynamic from "next/dynamic";
import { motion, useInView, useReducedMotion } from "framer-motion";
import type { CSSProperties } from "react";
import { useMemo, useRef, useState } from "react";
import type { OrbitSkill } from "./SkillsOrbit3D";
import { SectionTitle } from "./SectionTitle";

const SkillsOrbit3D = dynamic(() => import("./SkillsOrbit3D").then((mod) => mod.SkillsOrbit3D), {
    ssr: false,
});

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
];

const technicalStacks = [
    { label: "Backend Development", items: "Node.js, ExpressJS, NestJS, Socket.IO" },
    { label: "Frontend Development", items: "ReactJS, Next.js, React Native, Tailwind" },
    { label: "Blockchain & Security", items: "Hyperledger Fabric, IPFS, JWT" },
    { label: "Databases", items: "MySQL, SQL Server, MongoDB, Firebase" },
    { label: "ORM & API", items: "Prisma ORM, Sequelize, RESTful API" },
    { label: "DevOps & Cloud", items: "Docker, GitHub Actions, GitLab CI" },
    { label: "Programming Languages", items: "TypeScript, JavaScript, Python, PHP" },
    { label: "Other Tools", items: "Git, Postman, Bun" },
];

export function Skills() {
    const shouldReduceMotion = useReducedMotion();
    const panelRef = useRef<HTMLDivElement>(null);
    const isPanelInView = useInView(panelRef, { amount: 0.36 });
    const [activeSkillIndex, setActiveSkillIndex] = useState<number | null>(null);
    const [visibleSkillNames, setVisibleSkillNames] = useState<string[]>(["Node.js", "ExpressJS", "NestJS", "Next.js", "Prisma ORM", "MySQL", "React Native"]);
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

    return (
        <section id="skills" className="section-space px-4 md:px-8">
            <SectionTitle
                eyebrow="Skills"
                title="Technical Skills"
                description="Complete technical stack extracted from my CV, with backend as the core foundation and full-stack execution across production systems."
            />

            <div className="mx-auto grid w-full max-w-[84rem] gap-6 lg:grid-cols-[1.45fr_.75fr] lg:items-center">
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
                        <p className="mb-4 text-xs font-bold uppercase tracking-[0.16em] text-cyan-400">Technical Ecosystem</p>
                        <div className="space-y-4">
                            {technicalStacks.map((group) => (
                                <div key={group.label}>
                                    <p className="mb-2 text-sm font-semibold text-slate-300">{group.label}</p>
                                    <div className="flex flex-wrap gap-2">
                                        {group.items.split(", ").map((itemText) => {
                                            const normalizedText = itemText.trim();
                                            // Find if this item (or part of it) matches a skill in the 3D view
                                            const skillIndex = skills.findIndex((s) =>
                                                normalizedText.toLowerCase().includes(s.name.toLowerCase()) ||
                                                s.name.toLowerCase().includes(normalizedText.toLowerCase())
                                            );
                                            const isInteractive = skillIndex !== -1;
                                            const skill = isInteractive ? skills[skillIndex] : null;
                                            const isVisible = skill && visibleSkillNames.includes(skill.name);

                                            return (
                                                <button
                                                    key={itemText}
                                                    type="button"
                                                    disabled={!isInteractive}
                                                    onClick={() => isInteractive && skill && setVisibleSkillNames(prev =>
                                                        prev.includes(skill.name)
                                                            ? prev.filter(n => n !== skill.name)
                                                            : [...prev, skill.name]
                                                    )}
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
