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
import { I18nProvider } from "@/i18n/I18nProvider";
import { LanguageSwitcher } from "./LanguageSwitcher";

export function ClientExperience() {
    const [loaded, setLoaded] = useState(false);

    const bodyClass = useMemo(() => (loaded ? "opacity-100" : "opacity-0"), [loaded]);

    return (
        <I18nProvider>
            <LoadingScreen onDone={() => setLoaded(true)} />
            <SmoothScroll />
            <CustomCursor />
            <SpaceBackground />
            <div className={`transition-opacity duration-500 ${bodyClass}`}>
                <Navbar />
                <LanguageSwitcher />
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
        </I18nProvider>
    );
}
