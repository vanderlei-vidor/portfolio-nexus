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
        title: "Arquitetura do Hub Inicial",
        desc: "A tela de entrada estabelece tom com saudações contextuais inteligentes e cards tridimensionais responsivos.",
        img: "/projects/music-player/textures/tela_inicial.webp",
        color: "#3b82f6",
        icon: Music
    },

    {
        id: "step-2",
        chapter: "01",
        tag: "System / Navigation",
        title: "Menu Lateral de Alta Fidelidade",
        desc: "Um painel lateral projetado para controle absoluto com equalização avançada e navegação cirúrgica.",
        img: "/projects/music-player/textures/tela_menu_lateral.webp",
        color: "#2563eb",
        icon: Sliders
    },

    {
        id: "step-3",
        chapter: "02",
        tag: "Ecosystem / Customization",
        title: "Minimalismo Funcional",
        desc: "A jornada de playlists desenhada para reduzir carga cognitiva através de espaço negativo estratégico.",
        img: "/projects/music-player/textures/tela_inicial_playlist_personalizada.webp",
        color: "#10b981",
        icon: Layers
    },

    {
        id: "step-4",
        chapter: "02",
        tag: "Interactions / Modals",
        title: "Micro-Interações Fluidas",
        desc: "Modais suaves com profundidade visual e desfoques Gaussianos cinematográficos.",
        img: "/projects/music-player/textures/tela_criar_nova_playlist.webp",
        color: "#059669",
        icon: PlusCircle
    },

    {
        id: "step-5",
        chapter: "03",
        tag: "Data Curation / Playlists",
        title: "Gerenciamento Avançado",
        desc: "Organização modular de bibliotecas locais com feedback instantâneo e metadata dinâmica.",
        img: "/projects/music-player/textures/tela_playlist.webp",
        color: "#8b5cf6",
        icon: Radio
    },

    {
        id: "step-6",
        chapter: "03",
        tag: "Immersion / Audio Engine",
        title: "O Player Coreográfico",
        desc: "Gradientes volumétricos vivos e iluminação reativa sincronizada com a atmosfera sonora.",
        img: "/projects/music-player/textures/tela_player.webp",
        color: "#7c3aed",
        icon: Disc
    }
];