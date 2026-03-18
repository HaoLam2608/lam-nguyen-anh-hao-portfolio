"use client";

import { Float, MeshDistortMaterial, Ring, Sphere, Stars } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import { MathUtils } from "three";
import type { Group, Mesh } from "three";

function CorePlanet() {
    const planetRef = useRef<Mesh>(null);

    useFrame((_, delta) => {
        if (!planetRef.current) {
            return;
        }

        planetRef.current.rotation.y += delta * 0.34;
        planetRef.current.rotation.x += delta * 0.08;
    });

    return (
        <Sphere ref={planetRef} args={[1.05, 64, 64]} position={[0, 0, 0]}>
            <MeshDistortMaterial
                color="#78dfff"
                emissive="#1f4cff"
                emissiveIntensity={0.7}
                roughness={0.18}
                metalness={0.35}
                distort={0.24}
                speed={1.4}
            />
        </Sphere>
    );
}

function OrbitRings() {
    const groupRef = useRef<Group>(null);

    useFrame((_, delta) => {
        if (!groupRef.current) {
            return;
        }

        groupRef.current.rotation.z += delta * 0.23;
        groupRef.current.rotation.x = 0.9;
    });

    return (
        <group ref={groupRef}>
            <Ring args={[1.65, 1.78, 64]}>
                <meshBasicMaterial color="#ffb07a" transparent opacity={0.65} />
            </Ring>
            <Ring args={[2.02, 2.1, 64]}>
                <meshBasicMaterial color="#87ecff" transparent opacity={0.35} />
            </Ring>
        </group>
    );
}

function SceneNodes() {
    const rigRef = useRef<Group>(null);
    const satellites = useMemo(
        () => [
            { color: "#8cecff", orbit: 2.8, speed: 0.54, size: 0.09 },
            { color: "#ffba8a", orbit: 2.35, speed: 0.8, size: 0.07 },
        ],
        []
    );

    useFrame((state, delta) => {
        const scrollY = typeof window === "undefined" ? 0 : window.scrollY;
        const viewportHeight = typeof window === "undefined" ? 1 : window.innerHeight;
        const progress = Math.min(scrollY / Math.max(viewportHeight, 1), 1.35);

        const targetZ = 6.3 - progress * 0.85;
        const targetY = 0.15 - progress * 0.2;
        const targetX = Math.sin(state.clock.elapsedTime * 0.28) * 0.12;

        state.camera.position.z = MathUtils.lerp(state.camera.position.z, targetZ, 1 - Math.exp(-delta * 3.2));
        state.camera.position.y = MathUtils.lerp(state.camera.position.y, targetY, 1 - Math.exp(-delta * 3.2));
        state.camera.position.x = MathUtils.lerp(state.camera.position.x, targetX, 1 - Math.exp(-delta * 2.6));
        state.camera.lookAt(0, 0, 0);

        if (rigRef.current) {
            rigRef.current.rotation.y += delta * 0.11;
        }
    });

    return (
        <group ref={rigRef}>
            <ambientLight intensity={0.55} />
            <pointLight position={[2.4, 2.4, 2.2]} intensity={28} color="#9ce7ff" />
            <pointLight position={[-2.2, -1.8, 1.5]} intensity={12} color="#ff9f72" />

            <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.5}>
                <CorePlanet />
            </Float>
            <OrbitRings />

            {satellites.map((satellite, index) => (
                <Float
                    key={satellite.color}
                    speed={satellite.speed}
                    rotationIntensity={0.7}
                    floatIntensity={0.65}
                    position={[
                        Math.cos((index + 1) * 1.4) * satellite.orbit,
                        Math.sin((index + 1) * 1.2) * 0.6,
                        Math.sin((index + 1) * 1.7) * 0.9,
                    ]}
                >
                    <Sphere args={[satellite.size, 18, 18]}>
                        <meshStandardMaterial emissive={satellite.color} emissiveIntensity={1.4} color={satellite.color} />
                    </Sphere>
                </Float>
            ))}

            <Stars radius={28} depth={18} count={320} factor={2} saturation={0} fade speed={0.35} />
        </group>
    );
}

export function HeroOrb3D() {
    return (
        <div className="hero-3d-shell h-full w-full">
            <Canvas dpr={[1, 1.5]} camera={{ fov: 42, position: [0, 0.15, 6.3] }} gl={{ antialias: true, powerPreference: "high-performance" }}>
                <SceneNodes />
            </Canvas>
        </div>
    );
}
