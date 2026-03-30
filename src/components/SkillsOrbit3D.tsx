"use client";

import { Html, Sphere, Stars, Torus } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { memo, useEffect, useMemo, useRef, useState } from "react";
import { DoubleSide, MathUtils } from "three";
import type { Group, Mesh, MeshStandardMaterial } from "three";

export type OrbitSkill = {
    name: string;
    percent: number;
    orbit: number;
    duration: number;
    angle: number;
    glow: string;
};

type SkillsOrbit3DProps = {
    skills: OrbitSkill[];
    paused: boolean;
    reducedQuality: boolean;
    highlightedSkillIndex?: number | null;
    onHighlightChange?: (index: number | null) => void;
    visibleSkillNames?: string[];
};

type OrbitSystemProps = SkillsOrbit3DProps;
const FIXED_ORBIT_COUNT = 5;

type DisplayedOrbitSkill = {
    skill: OrbitSkill;
    globalIndex: number;
};

function OrbitSystem({ skills, paused, reducedQuality, highlightedSkillIndex = null, onHighlightChange, visibleSkillNames }: OrbitSystemProps) {
    const systemBaseY = -0.18;
    const rigRef = useRef<Group>(null);
    const sunRef = useRef<Mesh>(null);
    const sunAuraRef = useRef<Mesh>(null);
    const asteroidRefs = useRef<Array<Mesh | null>>([]);
    const asteroidMaterialRefs = useRef<Array<MeshStandardMaterial | null>>([]);
    const orbitAnglesRef = useRef<number[]>([]);
    const [activeGlobalIndex, setActiveGlobalIndex] = useState<number | null>(null);
    const focusedGlobalIndex = highlightedSkillIndex ?? activeGlobalIndex;

    const displayedSkills = useMemo<DisplayedOrbitSkill[]>(() => {
        if (!visibleSkillNames || visibleSkillNames.length === 0) {
            return skills.slice(0, FIXED_ORBIT_COUNT).map((skill, index) => ({ skill, globalIndex: index }));
        }

        const byName = new Map(skills.map((skill, index) => [skill.name, { skill, globalIndex: index }]));
        return visibleSkillNames
            .map((name) => byName.get(name))
            .filter((entry): entry is DisplayedOrbitSkill => Boolean(entry))
            .slice(0, FIXED_ORBIT_COUNT);
    }, [skills, visibleSkillNames]);

    useEffect(() => {
        orbitAnglesRef.current = skills.map((skill) => MathUtils.degToRad(skill.angle));
    }, [skills]);

    const orbitRadii = useMemo(() => Array.from({ length: FIXED_ORBIT_COUNT }, (_, index) => 1.58 + index * 0.27), []);
    const orbitTilts = useMemo(
        () => orbitRadii.map((_, index) => (index % 2 === 0 ? 1 : -1) * (0.24 + (index % 3) * 0.2)),
        [orbitRadii]
    );
    const baseScale = reducedQuality ? 1.65 : 2.35;
    const maxOrbitRadius = useMemo(() => orbitRadii.reduce((max, radius) => Math.max(max, radius), 0), [orbitRadii]);
    const visualRadius = maxOrbitRadius + 0.92;

    useFrame((state, delta) => {
        if (rigRef.current) {
            if (!paused) {
                rigRef.current.rotation.y += delta * 0.045;
            }

            rigRef.current.rotation.x = MathUtils.lerp(rigRef.current.rotation.x, state.pointer.y * 0.018, 1 - Math.exp(-delta * 3));

            const viewportAtTarget = state.viewport.getCurrentViewport(state.camera, [0, systemBaseY, 0]);
            const safeFrameRadius = Math.min(viewportAtTarget.width, viewportAtTarget.height) * 0.64;
            const maxScaleToFit = safeFrameRadius > 0 ? safeFrameRadius / visualRadius : baseScale;
            const targetScale = Math.min(baseScale, maxScaleToFit);
            const nextScale = MathUtils.lerp(rigRef.current.scale.x || targetScale, targetScale, 1 - Math.exp(-delta * 8));
            rigRef.current.scale.setScalar(nextScale);
        }

        if (sunRef.current && !paused) {
            sunRef.current.rotation.y += delta * 0.08;
            sunRef.current.rotation.x += delta * 0.04;
        }

        if (sunAuraRef.current && !reducedQuality) {
            const pulse = 1 + Math.sin(state.clock.elapsedTime * 1.15) * 0.05;
            sunAuraRef.current.scale.setScalar(pulse);
        }

        const targetX = paused ? 0 : state.pointer.x * 0.1;
        const targetY = paused ? 0.1 : 0.1 + state.pointer.y * 0.03;
        const targetZ = 4.65;

        state.camera.position.x = MathUtils.lerp(state.camera.position.x, targetX, 1 - Math.exp(-delta * 4));
        state.camera.position.y = MathUtils.lerp(state.camera.position.y, targetY, 1 - Math.exp(-delta * 4));
        state.camera.position.z = MathUtils.lerp(state.camera.position.z, targetZ, 1 - Math.exp(-delta * 4));
        state.camera.lookAt(0, systemBaseY, 0);

        displayedSkills.forEach(({ skill, globalIndex }, orbitIndex) => {
            const asteroid = asteroidRefs.current[orbitIndex];
            if (!asteroid) {
                return;
            }

            const radius = orbitRadii[orbitIndex];
            const baseAngle = MathUtils.degToRad(skill.angle);
            const dir = orbitIndex % 2 === 0 ? 1 : -1;
            const speed = (Math.PI * 2) / (skill.duration * 1.04);
            const shouldPauseFocusedOrbit = focusedGlobalIndex === globalIndex && focusedGlobalIndex !== null && !paused;
            const previousAngle = orbitAnglesRef.current[globalIndex] ?? baseAngle;
            const animatedAngle = paused || shouldPauseFocusedOrbit ? previousAngle : previousAngle + delta * speed * dir;
            orbitAnglesRef.current[globalIndex] = animatedAngle;

            // X, Y plane calculation because the parent group handles the 3D tilt
            const x = Math.cos(animatedAngle) * radius;
            const y = Math.sin(animatedAngle) * radius;

            asteroid.position.set(x, y, 0);
            asteroid.rotation.x += delta * 0.68;
            asteroid.rotation.y += delta * 1.05;

            const targetScale = focusedGlobalIndex === globalIndex ? 1.35 : 1;
            const nextScale = MathUtils.lerp(asteroid.scale.x, targetScale, 1 - Math.exp(-delta * 8));
            asteroid.scale.setScalar(nextScale);

            const material = asteroidMaterialRefs.current[orbitIndex];
            if (material) {
                const targetEmissive = focusedGlobalIndex === globalIndex ? 1.45 : 0.92;
                material.emissiveIntensity = MathUtils.lerp(material.emissiveIntensity, targetEmissive, 1 - Math.exp(-delta * 8));
            }
        });
    });

    const handleFocusAsteroid = (globalIndex: number | null) => {
        setActiveGlobalIndex(globalIndex);
        onHighlightChange?.(globalIndex);
    };

    return (
        <group ref={rigRef} position={[0, systemBaseY, 0]} scale={1}>
            <ambientLight intensity={0.36} />
            <pointLight position={[3.2, 4.2, 3]} intensity={19} color="#9ce9ff" />
            <pointLight position={[-3, -2, 2]} intensity={10} color="#ffab72" />
            <pointLight position={[0, 1.8, -3.5]} intensity={6} color="#7ec6ff" />

            {displayedSkills.map(({ skill, globalIndex }, orbitIndex) => {
                const radius = orbitRadii[orbitIndex];
                return (
                    <group
                        key={`track-${skill.name}`}
                        position={[0, 0, ((orbitIndex % 3) - 1) * 0.08]}
                        rotation={[Math.PI / 2 - orbitTilts[orbitIndex] * 0.75, orbitIndex * 0.22, orbitIndex * 0.35]}
                    >
                        <Torus args={[radius, 0.0038, 8, reducedQuality ? 64 : 112]} frustumCulled={false}>
                            <meshBasicMaterial
                                color={skill.glow}
                                transparent
                                opacity={0.32}
                                side={DoubleSide}
                                depthWrite={false}
                                depthTest={false}
                            />
                        </Torus>

                        <mesh
                            ref={(node) => {
                                asteroidRefs.current[orbitIndex] = node;
                            }}
                            onPointerOver={() => handleFocusAsteroid(globalIndex)}
                            onPointerOut={() => handleFocusAsteroid(null)}
                        >
                            <icosahedronGeometry args={[0.082 + (orbitIndex % 3) * 0.015, 0]} />
                            <meshStandardMaterial
                                ref={(material) => {
                                    asteroidMaterialRefs.current[orbitIndex] = material;
                                }}
                                color={skill.glow}
                                emissive={skill.glow}
                                emissiveIntensity={0.9}
                                roughness={0.28}
                                metalness={0.24}
                            />
                        </mesh>
                    </group>
                );
            })}

            <Sphere ref={sunAuraRef} args={[1.08, reducedQuality ? 16 : 24, reducedQuality ? 16 : 24]}>
                <meshBasicMaterial color="#ffd8a3" transparent opacity={0.14} />
            </Sphere>

            <Sphere args={[1.34, reducedQuality ? 14 : 20, reducedQuality ? 14 : 20]}>
                <meshBasicMaterial color="#ffcd93" transparent opacity={0.045} />
            </Sphere>

            <Sphere args={[0.14, 14, 14]} position={[0.18, 0.14, 0.34]}>
                <meshBasicMaterial color="#fff5dd" transparent opacity={0.8} />
            </Sphere>

            <Sphere args={[0.08, 10, 10]} position={[-0.26, -0.1, 0.3]}>
                <meshBasicMaterial color="#ffd7a8" transparent opacity={0.55} />
            </Sphere>

            <Torus args={[0.78, 0.004, 8, reducedQuality ? 52 : 80]} rotation={[Math.PI / 2, 0.4, 0.12]}>
                <meshBasicMaterial color="#ffd9ac" transparent opacity={0.33} />
            </Torus>

            <Sphere ref={sunRef} args={[0.59, reducedQuality ? 22 : 32, reducedQuality ? 22 : 32]}>
                <meshStandardMaterial
                    color="#fff0cc"
                    emissive="#ff8a33"
                    emissiveIntensity={1.68}
                    roughness={0.18}
                    metalness={0.1}
                />
            </Sphere>

            <Stars radius={14} depth={10} count={reducedQuality ? 74 : 118} factor={1.66} saturation={0} fade speed={0.14} />

            {focusedGlobalIndex !== null ? (
                <Html position={[0, -1.3, 0]} center>
                    <div className="skill-orbit-hud">
                        <p className="skill-orbit-hud-name">{skills[focusedGlobalIndex].name}</p>
                        <p className="skill-orbit-hud-value">{skills[focusedGlobalIndex].percent}%</p>
                    </div>
                </Html>
            ) : null}
        </group>
    );
}

export const SkillsOrbit3D = memo(function SkillsOrbit3D({
    skills,
    paused,
    reducedQuality,
    highlightedSkillIndex = null,
    onHighlightChange,
    visibleSkillNames,
}: SkillsOrbit3DProps) {
    return (
        <div className="skills-orbit-canvas">
            <Canvas
                dpr={reducedQuality ? [1, 1] : [1, 1.15]}
                camera={{ position: [0, 0.04, 4.55], fov: 45 }}
                gl={{ antialias: !reducedQuality, powerPreference: "high-performance" }}
                performance={{ min: reducedQuality ? 0.35 : 0.5 }}
                onCreated={({ gl }) => {
                    gl.toneMappingExposure = reducedQuality ? 1.08 : 1.2;
                }}
            >
                <OrbitSystem
                    skills={skills}
                    paused={paused}
                    reducedQuality={reducedQuality}
                    highlightedSkillIndex={highlightedSkillIndex}
                    onHighlightChange={onHighlightChange}
                    visibleSkillNames={visibleSkillNames}
                />
            </Canvas>
        </div>
    );
});
