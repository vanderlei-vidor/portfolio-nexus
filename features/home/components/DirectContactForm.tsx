"use client";

import { useState } from "react";
import { Copy, Check, Send, Sparkles } from "lucide-react";

export default function DirectContactForm() {
  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [copied, setCopied] = useState(false);

  const recipientEmail = "vanderleividor1@gmail.com";

  // Constroi a URL mailto inteligente com assunto e corpo pré-formatados
  const getMailtoUrl = () => {
    const defaultSubject = subject.trim() || `Contato do Portfolio Nexus - ${name || "Visitante"}`;
    const defaultBody = `Olá, Vanderlei!\n\n${message.trim() || "Gostaria de conversar sobre um projeto/oportunidade."}\n\nAtenciosamente,\n${name || "Visitante"}`;
    
    return `mailto:${recipientEmail}?subject=${encodeURIComponent(defaultSubject)}&body=${encodeURIComponent(defaultBody)}`;
  };

  const handleCopyFormatted = () => {
    const textToCopy = `Para: ${recipientEmail}\nAssunto: ${subject || "Contato Portfolio Nexus"}\n\n${message || "Gostaria de entrar em contato para novas oportunidades."}\n- ${name || "Visitante"}`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="contact-item relative p-8 rounded-3xl border border-white/10 bg-white/3 backdrop-blur-xl shadow-2xl overflow-hidden group">
      {/* Glow ambient background */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 blur-[100px] pointer-events-none -z-10" />

      <div className="flex items-center gap-3 mb-6">
        <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
          <Sparkles size={20} />
        </div>
        <div>
          <h3 className="text-xl font-bold text-white tracking-tight">Direct Message Generator</h3>
          <p className="text-xs text-zinc-400 font-mono">Zero delay • Opens directly in your mail app</p>
        </div>
      </div>

      <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
        <div>
          <label className="block text-xs font-mono uppercase tracking-widest text-zinc-400 mb-1.5">
            Your Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Sarah Connor"
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all text-sm font-light"
          />
        </div>

        <div>
          <label className="block text-xs font-mono uppercase tracking-widest text-zinc-400 mb-1.5">
            Subject
          </label>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="e.g. New Web Application Project"
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all text-sm font-light"
          />
        </div>

        <div>
          <label className="block text-xs font-mono uppercase tracking-widest text-zinc-400 mb-1.5">
            Message
          </label>
          <textarea
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Tell me a bit about your idea, timeline or goals..."
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all text-sm font-light resize-none"
          />
        </div>

        <div className="pt-2 flex flex-col sm:flex-row gap-3">
          <a
            href={getMailtoUrl()}
            className="flex-1 inline-flex items-center justify-center gap-2.5 px-6 py-3.5 bg-white text-black font-semibold rounded-xl hover:bg-blue-500 hover:text-white transition-all duration-300 transform hover:scale-[1.02] shadow-[0_0_25px_rgba(255,255,255,0.1)] text-sm"
          >
            <Send size={16} />
            <span>Open Email Client</span>
          </a>

          <button
            type="button"
            onClick={handleCopyFormatted}
            className="inline-flex items-center justify-center gap-2 px-5 py-3.5 border border-white/15 rounded-xl text-zinc-300 hover:text-white hover:bg-white/5 hover:border-white/30 transition-all text-sm font-medium"
            title="Copy pre-formatted text for webmail (Gmail/Outlook web)"
          >
            {copied ? (
              <>
                <Check size={16} className="text-green-400" />
                <span className="text-green-400">Copied!</span>
              </>
            ) : (
              <>
                <Copy size={16} />
                <span>Copy Message</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
