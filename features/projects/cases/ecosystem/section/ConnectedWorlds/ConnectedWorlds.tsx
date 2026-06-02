"use client";

import { useEffect, useState } from "react";
import {
    Music,
    Brain,
    LayoutDashboard,
    Eye,
    Radio,
    Activity,
    Cpu,
} from "lucide-react";
import "./ConnectedWorlds.css";

const nodes = [
    {
        icon: Music,
        title: "Experience",
        subtitle: "Music Player",
        position: "top",
        color: "cyan",
        status: "LIVE",
        coords: "N 01",
    },
    {
        icon: Brain,
        title: "Intelligence",
        subtitle: "AI Tutor",
        position: "right",
        color: "purple",
        status: "ACTIVE",
        coords: "E 02",
    },
    {
        icon: LayoutDashboard,
        title: "Control",
        subtitle: "SaaS Platform",
        position: "bottom",
        color: "emerald",
        status: "ONLINE",
        coords: "S 03",
    },
    {
        icon: Eye,
        title: "Vision",
        subtitle: "Portfolio Nexus",
        position: "left",
        color: "amber",
        status: "SYNCED",
        coords: "W 04",
    },
];

export default function ConnectedWorlds() {
    const [isRevealed, setIsRevealed] = useState(false);
    const [time, setTime] = useState("");

    useEffect(() => {
        const timer = setTimeout(() => setIsRevealed(true), 300);
        return () => clearTimeout(timer);
    }, []);

    // Relógio HUD em tempo real
    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            setTime(
                now.toLocaleTimeString("en-US", {
                    hour12: false,
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                })
            );
        };
        updateTime();
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section className={`connected-worlds ${isRevealed ? "is-active" : ""}`}>
            {/* Camadas de background cinematográficas */}
            <div className="cw-bg-grid" />
            <div className="cw-bg-nebula cw-bg-nebula-1" />
            <div className="cw-bg-nebula cw-bg-nebula-2" />
            <div className="cw-bg-nebula cw-bg-nebula-3" />
            <div className="cw-bg-stars" />
            <div className="cw-scanline" />

            {/* HUD Corners (telemetria nos cantos) */}
            <div className="cw-hud cw-hud-tl">
                <span className="hud-label">SYS.STATUS</span>
                <span className="hud-value hud-online">
                    <span className="hud-dot" />
                    ONLINE
                </span>
            </div>

            <div className="cw-hud cw-hud-tr">
                <span className="hud-label">UPLINK</span>
                <span className="hud-value">{time} UTC</span>
            </div>

            <div className="cw-hud cw-hud-bl">
                <span className="hud-label">NETWORK</span>
                <span className="hud-value">4 NODES // SYNCED</span>
            </div>

            <div className="cw-hud cw-hud-br">
                <span className="hud-label">LATENCY</span>
                <span className="hud-value">12ms</span>
            </div>

            <div className="connected-worlds__container">
                {/* HEADER */}
                <div className="reveal-step-20">
                    <span className="connected-worlds__label">
                        <span className="label-dot" />
                        THE ECOSYSTEM
                        <span className="label-version">v2.6.0</span>
                    </span>
                    <h2 className="connected-worlds__title">
                        <span className="title-word">Connected</span>
                        <span className="title-word title-word-gradient">Worlds.</span>
                        <br />
                        <span className="title-word">Unified</span>
                        <span className="title-word title-word-gradient-alt">Vision.</span>
                    </h2>
                </div>

                <p className="connected-worlds__description reveal-step-35">
                    Each product explores a different dimension of the digital experience.
                    Together they form a connected ecosystem of entertainment, intelligence,
                    productivity and innovation — synchronized in real-time.
                </p>

                {/* MAPA DO ECOSSISTEMA */}
                <div className="ecosystem-map">
                    {/* ORB CENTRAL ÉPICA */}
                    <div className="ecosystem-orb reveal-step-50">
                        {/* Múltiplas camadas de glow */}
                        <div className="orb-glow orb-glow-outer" />
                        <div className="orb-glow orb-glow-inner" />

                        {/* Anéis orbitais */}
                        <div className="orb-ring orb-ring-1" />
                        <div className="orb-ring orb-ring-2" />
                        <div className="orb-ring orb-ring-3" />

                        {/* Radar sweep */}
                        <div className="orb-radar" />

                        {/* Microtexto circular */}
                        <svg className="orb-circular-text" viewBox="0 0 200 200">
                            <defs>
                                <path
                                    id="circlePath"
                                    d="M 100, 100 m -75, 0 a 75,75 0 1,1 150,0 a 75,75 0 1,1 -150,0"
                                />
                            </defs>
                            <text>
                                <textPath href="#circlePath">
                                    CONNECTED ECOSYSTEM • NEXUS v2.6 • SYNCHRONIZED • REAL-TIME •
                                </textPath>
                            </text>
                        </svg>

                        {/* Conteúdo central */}
                        <div className="orb-core">
                            <div className="orb-core-icon">
                                <Cpu />
                            </div>
                            <span className="orb-label">PORTFOLIO</span>
                            <strong className="orb-title">NEXUS</strong>
                            <span className="orb-status">
                                <span className="orb-status-dot" />
                                CORE ONLINE
                            </span>
                        </div>
                    </div>

                    {/* CONEXÕES COM DATA FLOW */}
                    <div className="reveal-step-65">
                        <svg className="connections-svg" viewBox="0 0 1000 850" preserveAspectRatio="none">
                            <defs>
                                <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" stopColor="transparent" />
                                    <stop offset="50%" stopColor="#60a5fa" />
                                    <stop offset="100%" stopColor="transparent" />
                                </linearGradient>
                                <filter id="glow">
                                    <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                                    <feMerge>
                                        <feMergeNode in="coloredBlur" />
                                        <feMergeNode in="SourceGraphic" />
                                    </feMerge>
                                </filter>
                            </defs>

                            {/* Linhas base */}
                            <line x1="500" y1="425" x2="500" y2="140" stroke="url(#lineGrad)" strokeWidth="1" opacity="0.4" />
                            <line x1="500" y1="425" x2="820" y2="425" stroke="url(#lineGrad)" strokeWidth="1" opacity="0.4" />
                            <line x1="500" y1="425" x2="500" y2="710" stroke="url(#lineGrad)" strokeWidth="1" opacity="0.4" />
                            <line x1="500" y1="425" x2="180" y2="425" stroke="url(#lineGrad)" strokeWidth="1" opacity="0.4" />

                            {/* Partículas viajando (data flow) */}
                            <circle className="data-particle dp-1" r="3" fill="#60a5fa" filter="url(#glow)">
                                <animateMotion dur="3s" repeatCount="indefinite" path="M 500,425 L 500,140" />
                            </circle>
                            <circle className="data-particle dp-2" r="3" fill="#a78bfa" filter="url(#glow)">
                                <animateMotion dur="3.5s" repeatCount="indefinite" path="M 500,425 L 820,425" />
                            </circle>
                            <circle className="data-particle dp-3" r="3" fill="#10b981" filter="url(#glow)">
                                <animateMotion dur="4s" repeatCount="indefinite" path="M 500,425 L 500,710" />
                            </circle>
                            <circle className="data-particle dp-4" r="3" fill="#f59e0b" filter="url(#glow)">
                                <animateMotion dur="3.2s" repeatCount="indefinite" path="M 500,425 L 180,425" />
                            </circle>
                        </svg>
                    </div>

                    {/* NODES */}
                    {nodes.map((node, index) => {
                        const Icon = node.icon;
                        return (
                            <div
                                key={node.title}
                                className={`ecosystem-node ecosystem-node--${node.position} ecosystem-node--${node.color} reveal-step-80`}
                                style={{ "--node-index": index } as React.CSSProperties}
                            >
                                {/* HUD corner decorations */}
                                <div className="node-corner node-corner-tl" />
                                <div className="node-corner node-corner-tr" />
                                <div className="node-corner node-corner-bl" />
                                <div className="node-corner node-corner-br" />

                                {/* Borda gradiente animada */}
                                <div className="node-gradient-border" />

                                {/* Coordenadas */}
                                <span className="node-coords">{node.coords}</span>

                                {/* Status indicator */}
                                <div className="node-status">
                                    <span className="node-status-dot" />
                                    <span className="node-status-text">{node.status}</span>
                                </div>

                                {/* Ícone */}
                                <div className="ecosystem-node__icon">
                                    <Icon strokeWidth={1.5} />
                                </div>

                                {/* Conteúdo */}
                                <h3>{node.title}</h3>
                                <span className="node-subtitle">{node.subtitle}</span>

                                {/* Footer do node */}
                                <div className="node-footer">
                                    <span className="node-id">ID: {String(index + 1).padStart(3, "0")}</span>
                                    <span className="node-link">→</span>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* EASTER EGG TRANSITION */}
                <div className="easter-egg-transition reveal-step-100">
                    <div className="flow-line">
                        <div className="flow-line-pulse" />
                    </div>

                    <div className="flow-steps">
                        {["Experience", "Intelligence", "Control", "Vision"].map((step, i) => (
                            <div key={step} className="flow-step" style={{ animationDelay: `${i * 0.2}s` }}>
                                <span className="flow-step-number">{String(i + 1).padStart(2, "0")}</span>
                                <span className="flow-step-label">{step}</span>
                                {i < 3 && <span className="flow-arrow">↓</span>}
                            </div>
                        ))}
                    </div>

                    <div className="evolution-trigger">
                        <span className="evolution-pulse" />
                        <span className="next-section-preview">NEXT LEVEL: EVOLUTION</span>
                        <span className="evolution-arrow">→</span>
                    </div>
                </div>
            </div>
        </section>
    );
}