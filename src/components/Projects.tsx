"use client";

import type { PointerEvent as ReactPointerEvent } from "react";
import { useMemo, useState } from "react";
import {
    AnimatePresence,
    motion,
    useMotionTemplate,
    useMotionValue,
    useReducedMotion,
    useSpring,
    useTransform,
} from "framer-motion";
import { ExternalLink, Rocket } from "lucide-react";
import { SectionTitle } from "./SectionTitle";

type Category = "All" | "Education Platform" | "E-commerce Platform" | "Blockchain Platform" | "Management System";

type Project = {
    title: string;
    description: string;
    category: Category;
    role: string;
    technologies: string;
    highlights: string[];
    demo: string;
    articleLink?: string;
};

const categories: Category[] = ["All", "Education Platform", "E-commerce Platform", "Blockchain Platform", "Management System"];

const projects: Project[] = [
    {
        title: "Work Management System | Web & Mobile App",
        description: "A cross-platform solution for efficient task delegation and tracking, featuring real-time collaboration and mobile attendance.",
        category: "Management System",
        role: "Full Stack Developer",
        technologies: "Next.js; React Native Expo; Node.js; Express; Docker; GitHub Actions; Socket.IO; Firebase",
        highlights: [
            "Manager Dashboard (Web): Developed comprehensive project management tools featuring drag-and-drop Kanban, Calendar, and Timeline views; implemented task delegation and strict approval workflows.",
            "Employee Workspace (Web/Mobile): Built personal dashboards for tracking Tasks/Subtasks, managing deadlines (Overdue/Due Soon), and updating status according to business workflows.",
            "Timesheet & Worklog Management: Implemented detailed daily time tracking features with seamless synchronization of create/edit/delete operations between Web and Mobile platforms.",
            "Mobile Application (React Native): Developed core business screens (Dashboard, Tasks, Available Subtasks, Kanban, Profile) optimized for mobile UX and performance.",
            "Real-time Infrastructure: Integrated Socket.IO for live collaboration and Firebase Cloud Messaging for instant mobile notifications; implemented Role-Based Access Control (RBAC) and robust cross-platform data synchronization.",
            "DevOps Implementation: Written Dockerfiles for containerizing web services and established CI/CD pipelines using GitHub Actions for automated build and deployment.",
        ],
        demo: "https://github.com/HaoLam2608/quanlycongviec.git",
    },
    {
        title: "Degree Verification System | Blockchain & AI Platform",
        description: "Architected a decentralized degree verification system ensuring data integrity and non-repudiation.",
        category: "Blockchain Platform",
        role: "Full Stack Developer & System Architect",
        technologies: "Hyperledger Fabric; Node.js; ReactJS; React Native; Python; IPFS",
        highlights: [
            "System Architecture: Designed a comprehensive 5-step API flow: AI Verification → RSA Digital Signature → IPFS Storage → Ledger Recording, ensuring Data Integrity and Non-repudiation.",
            "Backend & Blockchain: Designed RESTful APIs and developed Node.js Gateway for Hyperledger Fabric; optimized architecture by offloading static files to IPFS and storing only Metadata/CID on-chain to maximize TPS.",
            "Frontend & Algorithms: Built a React Admin Panel with strict RBAC; implemented Fuzzy Auto-mapping algorithms for Excel Batch Import and concurrent processing of large image datasets.",
            "Mobile App (React Native): Handled the User flow for the Student group, including login, fetching Profile Identity via API Gateway, viewing details, and visually displaying the Blockchain Credentials wallet containing personal degrees/certificates (Front/Back) on mobile devices.",
            "AI Integration: Designed a Cross-check Validation Engine to automatically highlight discrepancies between OCR data and original records, streamlining the verification process.",
        ],
        demo: "https://svnckh.huit.edu.vn/researchtopic/topic/librarydetail/2573?year=2025",
    },
    {
        title: "Smarthmath | Smart Math Learning Platform",
        description: "Built a production-ready learning platform backend with real-time analytics and a comprehensive admin architecture.",
        category: "Education Platform",
        role: "Backend Developer",
        technologies: "Bun; TypeScript (ESM, strict); ExpressJS; Prisma ORM; MySQL",
        highlights: [
            "Built an analytical Dashboard to help students track detailed learning progress and test results in real-time.",
            "Developed a robust Admin Module with a flexible architecture to comprehensively manage courses, chapters, lessons, and classes.",
            "Designed Notification System: automated popup reminders for students to maintain engagement, integrated with a manual trigger for Admins to send urgent coordination announcements, boosting retention rates.",
        ],
        demo: "https://www.smartmath.edu.vn/",
    },
    {
        title: "Tafas | Modern Fashion E-commerce Platform",
        description: "Engineered a multi-tier promotion system and high-reliability discount workflows for a modern commerce platform.",
        category: "E-commerce Platform",
        role: "Backend Developer",
        technologies: "Bun; TypeScript; NestJS; Prisma ORM; MySQL",
        highlights: [
            "Designed and developed a comprehensive Multi-tier Promotion Engine including Flash Sales, Vouchers (public/private), Combo Deals, Bundle Deals, and Gifts With Purchase.",
            "Built an Admin Panel allowing flexible configuration (CRUD) of promotion rules and strict lifecycle management.",
            "Client-side Optimization: Automated Bundle Deal suggestions on product pages, displayed applicable Vouchers, and calculated/displayed discounted prices directly in the shopping cart.",
            "Performance Optimization & Bug Fixing: Handled real-world user issues, standardized price rounding calculations, and ensured synchronization constraints when calculating discounts at large order levels.",
        ],
        demo: "https://tafas.vn/",
    },
];

type ProjectCardProps = {
    project: Project;
    index: number;
    shouldReduceMotion: boolean;
    onOpen: (project: Project) => void;
};

function ProjectCard({ project, index, shouldReduceMotion, onOpen }: ProjectCardProps) {
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
                <div className="project-cover" />
                <h3 className="mt-4 text-xl font-semibold text-white">{project.title}</h3>
                <p className="mt-2 text-slate-300">{project.description}</p>
                <p className="mt-2 text-sm text-cyan-100/90">Role: {project.role}</p>

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
                        Details <Rocket className="h-4 w-4" />
                    </button>
                </div>
            </div>
        </motion.article>
    );
}

export function Projects() {
    const shouldReduceMotion = useReducedMotion();
    const [activeFilter, setActiveFilter] = useState<Category>("All");
    const [activeProject, setActiveProject] = useState<Project | null>(null);

    const filtered = useMemo(() => {
        if (activeFilter === "All") {
            return projects;
        }
        return projects.filter((project) => project.category === activeFilter);
    }, [activeFilter]);

    return (
        <section id="projects" className="section-space px-4 md:px-8">
            <SectionTitle
                eyebrow="Projects"
                title="Projects"
                description="Full project history from my CV with complete responsibilities, technologies, and implementation outcomes."
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
                        {category}
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
                            className="w-full max-w-3xl rounded-3xl border border-cyan-300/35 bg-slate-950/90 p-6"
                            onClick={(event) => event.stopPropagation()}
                        >
                            <h3 className="text-2xl font-semibold text-white">{activeProject.title}</h3>
                            <p className="mt-3 text-sm text-cyan-100/90">Role: {activeProject.role}</p>
                            <p className="mt-2 text-sm text-slate-300">Technologies used: {activeProject.technologies}</p>

                            <ul className="mt-4 space-y-2 text-sm leading-6 text-slate-200">
                                {activeProject.highlights.map((item) => (
                                    <li key={item} className="flex gap-2">
                                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-200/80" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>

                            <a
                                href={activeProject.demo}
                                target="_blank"
                                rel="noreferrer"
                                className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-cyan-100 hover:text-white"
                            >
                                Visit live project <ExternalLink className="h-4 w-4" />
                            </a>

                            <div className="mt-6 flex justify-end">
                                <button type="button" onClick={() => setActiveProject(null)} className="btn-neon-secondary px-5 py-2">
                                    Close
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                ) : null}
            </AnimatePresence>
        </section>
    );
}
