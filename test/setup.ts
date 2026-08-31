import "@testing-library/jest-dom";

// Mock para window.matchMedia (usado no useReducedMotion e verificações de touch/mobile)
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  }),
});

// Mock para navigator.clipboard (usado no DirectContactForm)
Object.defineProperty(navigator, "clipboard", {
  writable: true,
  value: {
    writeText: async () => {},
  },
});
