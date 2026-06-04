import {
    Disc,
    Layers,
    Sliders,
    Music,
    Radio,
    PlusCircle
} from "lucide-react";

export const offlinePlayerSteps = [
    {
        id: "step-1",
        chapter: "01",
        tag: "Gateway / Experience",
        title: "Initial Hub Architecture",
        desc: "The home screen sets the tone with clever contextual situations and responsive three-dimensional cards.",
        img: "/projects/music-player/textures/tela_inicial.webp",
        color: "#3b82f6",
        icon: Music
    },

    {
        id: "step-2",
        chapter: "01",
        tag: "System / Navigation",
        title: "High-Fidelity Side Menu",
        desc: "A side panel designed for absolute control with advanced equalization and surgical navigation.",
        img: "/projects/music-player/textures/tela_menu_lateral.webp",
        color: "#2563eb",
        icon: Sliders
    },

    {
        id: "step-3",
        chapter: "02",
        tag: "Ecosystem / Customization",
        title: "Functional Minimalism",
        desc: "A playlist journey designed to reduce cognitive load through strategic negative space.",
        img: "/projects/music-player/textures/tela_inicial_playlist_personalizada.webp",
        color: "#10b981",
        icon: Layers
    },

    {
        id: "step-4",
        chapter: "02",
        tag: "Interactions / Modals",
        title: "Fluid Micro-Interactions",
        desc: "Smooth modals with visual depth and cinematic Gaussian blurs.",
        img: "/projects/music-player/textures/tela_criar_nova_playlist.webp",
        color: "#059669",
        icon: PlusCircle
    },

    {
        id: "step-5",
        chapter: "03",
        tag: "Data Curation / Playlists",
        title: "Advanced Management",
        desc: "Modular organization of local libraries with instant feedback and dynamic metadata.",
        img: "/projects/music-player/textures/tela_playlist.webp",
        color: "#8b5cf6",
        icon: Radio
    },

    {
        id: "step-6",
        chapter: "03",
        tag: "Immersion / Audio Engine",
        title: "The Choreographic and Functional Player",
        desc: "Vivid volumetric gradients and reactive lighting synchronized with the sound atmosphere.",
        img: "/projects/music-player/textures/tela_player.webp",
        color: "#7c3aed",
        icon: Disc
    }
];