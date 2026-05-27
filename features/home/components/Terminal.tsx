// components/Terminal.tsx
"use client";
import { useState } from "react";

export default function Terminal() {
    const [output, setOutput] = useState<string>("Type 'help' to see available commands.");
    const [inputValue, setInputValue] = useState<string>("");

    // Tipamos o parâmetro 'cmd' como string
    const handleCommand = (cmd: string) => {
        const cleanCmd = cmd.trim().toLowerCase(); // Remove espaços e ignora maiúsculas/minúsculas

        if (cleanCmd === "projects") {
            setOutput("📂 Project1: AI Language App | Project2: Travel Guide Site");
        } else if (cleanCmd === "about") {
            setOutput("💻 Frontend Dev specialized in Next.js, Tailwind & Performance.");
        } else if (cleanCmd === "help") {
            setOutput("📜 Available commands: 'projects', 'about', 'clear'");
        } else if (cleanCmd === "clear") {
            setOutput("");
        } else {
            setOutput(`❌ Command not found: '${cmd}'. Type 'help' for instructions.`);
        }
    };

    // Tipamos o evento do teclado capturando o input HTML
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            handleCommand(inputValue);
            setInputValue(""); // Limpa o input depois que o usuário dá Enter
        }
    };

    return (
        <div className="bg-zinc-950 p-6 rounded-xl font-mono text-green-400 border border-zinc-800 shadow-2xl max-w-xl mx-auto">
            <div className="flex items-center gap-2 mb-4 border-b border-zinc-800 pb-2">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <span className="text-xs text-zinc-500 ml-2">portfolio-terminal.sh</span>
            </div>

            <div className="min-h-[60px] whitespace-pre-line">
                <p className="text-zinc-400">{output}</p>
            </div>

            <div className="flex items-center mt-4 text-zinc-200">
                <span className="text-green-500 mr-2">visitor@portfolio:~$&nbsp;</span>
                <input
                    type="text"
                    className="bg-transparent outline-none flex-1 font-mono text-green-400 caret-green-400"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="type here..."
                />
            </div>
        </div>
    );
}