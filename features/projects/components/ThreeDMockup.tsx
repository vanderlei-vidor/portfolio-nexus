"use client";

import { Canvas, useFrame } from "@react-three/fiber";
// Removemos a 'Sphere' e o 'MeshDistortMaterial' e adicionamos 'useGLTF' e 'OrbitControls'
import { Float, PerspectiveCamera, ContactShadows, useGLTF, OrbitControls, Center, useTexture } from "@react-three/drei";
import { useRef, Suspense, useLayoutEffect, useMemo } from "react";
import * as THREE from "three";

interface ThreeDMockupProps {
    slug: string;
}

function NotebookModel({ slug }: { slug: string }) {
    const { scene } = useGLTF("/models/laptop.glb", "https://www.gstatic.com/draco/versioned/decoders/1.5.5/");

    // Tenta carregar uma textura baseada no nome do projeto. 
    // Certifique-se de ter imagens em public/textures/[slug].jpg
    const texture = useTexture(`/textures/${slug}.jpg`);
    const screenTexture = useMemo(() => {
        const clonedTexture = texture.clone();
        clonedTexture.flipY = false;
        clonedTexture.needsUpdate = true;

        return clonedTexture;
    }, [texture]);

    const modelRef = useRef<THREE.Group>(null);

    useLayoutEffect(() => {
        scene.traverse((obj) => {
            // Procura pela malha que representa a tela (geralmente chamada de "Screen" ou "Plane")
            if ((obj as THREE.Mesh).isMesh && (obj.name.includes("Screen") || obj.name.includes("Display"))) {
                (obj as THREE.Mesh).material = new THREE.MeshBasicMaterial({ map: screenTexture });
            }
        });
    }, [scene, screenTexture]);

    useFrame((state) => {
        if (modelRef.current) {
            modelRef.current.rotation.y = state.clock.getElapsedTime() * 0.15;
        }
    });

    return (
        <Center top>
            <primitive
                ref={modelRef}
                object={scene}
                position={[0, 0, 0]}
                scale={5} // Ajustado para uma escala padrão (entre 1 e 2)
            />
        </Center>
    );
}

function ModelSkeleton() {
    return (
        <div className="absolute inset-0 flex items-center justify-center bg-black/10 backdrop-blur-sm z-10 pointer-events-none">
            <div className="w-64 h-40 bg-zinc-900/40 rounded-xl border border-white/5 animate-pulse flex flex-col items-center justify-center gap-4">
                <div className="w-12 h-12 border-2 border-accent/20 border-t-accent rounded-full animate-spin" />
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest text-center px-4">
                    Initialising 3D Core...
                </span>
            </div>
        </div>
    );
}

function Scene({ slug }: { slug: string }) {
    return (
        <>
            <PerspectiveCamera makeDefault position={[0, 0, 4.5]} fov={60} />
            <ambientLight intensity={2.0} />
            <pointLight position={[5, 5, 5]} intensity={2} color="#ffffff" />
            <pointLight position={[-5, 5, 2]} intensity={3} color="#3b82f6" />
            <pointLight position={[0, 0, -4]} intensity={5} color="#00ffaa" />

            <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.4}>
                <NotebookModel slug={slug} />
            </Float>

            <OrbitControls
                enableZoom={false}
                minPolarAngle={Math.PI / 3}
                maxPolarAngle={Math.PI / 2}
            />
            <ContactShadows position={[0, -1.8, 0]} opacity={0.5} scale={8} blur={1.8} far={4} />
        </>
    );
}

export default function ThreeDMockup({ slug }: ThreeDMockupProps) {
    return (
        <div className="w-full h-full min-h-[350px] bg-transparent cursor-grab active:cursor-grabbing relative">
            <Suspense fallback={<ModelSkeleton />}>
                <Canvas shadows dpr={[1, 2]}>
                    <Scene slug={slug} />
                </Canvas>
            </Suspense>
        </div>
    );
}

// Boa prática: Deixa o arquivo engatilhado no cache do navegador
// Copie exatamente assim no final do arquivo:
useGLTF.preload("/models/laptop.glb", "https://www.gstatic.com/draco/versioned/decoders/1.5.5/");
