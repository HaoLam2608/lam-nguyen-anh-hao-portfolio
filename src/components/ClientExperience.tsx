"use client";

import { useMemo, useState } from "react";
import { About } from "./About";
import { Contact } from "./Contact";
import { CustomCursor } from "./CustomCursor";
import { Footer } from "./Footer";
import { Hero } from "./Hero";
import { LoadingScreen } from "./LoadingScreen";
import { Navbar } from "./Navbar";
import { Projects } from "./Projects";
import { Awards } from "./Awards";
import { Education } from "./Education";
import { Skills } from "./Skills";
import { SmoothScroll } from "./SmoothScroll";
import { SpaceBackground } from "./SpaceBackground";
import { Timeline } from "./Timeline";

export function ClientExperience() {
    const [loaded, setLoaded] = useState(false);

    const bodyClass = useMemo(() => (loaded ? "opacity-100" : "opacity-0"), [loaded]);

    return (
        <>
            <LoadingScreen onDone={() => setLoaded(true)} />
            <SmoothScroll />
            <CustomCursor />
            <SpaceBackground />
            <div className={`transition-opacity duration-500 ${bodyClass}`}>
                <Navbar />
                <main>
                    <Hero />
                    <About />
                    <Skills />
                    <Timeline />
                    <Education />
                    <Awards />
                    <Projects />
                    <Contact />
                </main>
                <Footer />
            </div>
        </>
    );
}
