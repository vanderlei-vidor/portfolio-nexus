"use client";

import { useState } from "react";
import { Check, Copy, Send, Sparkles } from "lucide-react";
import { useTranslation } from "@/shared/i18n/useTranslation";

export default function DirectContactForm() {
  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [copied, setCopied] = useState(false);
  const { t } = useTranslation();

  const recipientEmail = "vanderleividor1@gmail.com";

  const getMailtoUrl = () => {
    const visitor = name.trim() || t("contact.defaultVisitor");
    const defaultSubject = subject.trim() || `${t("contact.defaultSubject")} - ${visitor}`;
    const defaultBody = `${t("contact.defaultGreeting")}\n\n${message.trim() || t("contact.defaultBody")}\n\n${t("contact.defaultSignoff")}\n${visitor}`;

    return `mailto:${recipientEmail}?subject=${encodeURIComponent(defaultSubject)}&body=${encodeURIComponent(defaultBody)}`;
  };

  const handleCopyFormatted = () => {
    const visitor = name.trim() || t("contact.defaultVisitor");
    const textToCopy = `To: ${recipientEmail}\nSubject: ${subject.trim() || t("contact.defaultSubject")}\n\n${message.trim() || t("contact.defaultCopyMessage")}\n- ${visitor}`;

    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="contact-item relative overflow-hidden rounded-3xl border border-white/10 bg-white/3 p-8 shadow-2xl backdrop-blur-xl">
      <div className="absolute right-0 top-0 -z-10 h-64 w-64 bg-blue-500/10 blur-[100px] pointer-events-none" />

      <div className="mb-6 flex items-center gap-3">
        <div className="rounded-xl border border-blue-500/20 bg-blue-500/10 p-2.5 text-blue-400" aria-hidden="true">
          <Sparkles size={20} />
        </div>
        <div>
          <h3 className="text-xl font-bold tracking-tight text-white">{t("contact.generatorTitle")}</h3>
          <p className="font-mono text-xs text-zinc-400">{t("contact.generatorSubtitle")}</p>
        </div>
      </div>

      <form onSubmit={(event) => event.preventDefault()} className="space-y-4">
        <div>
          <label htmlFor="contact-name" className="mb-1.5 block font-mono text-xs uppercase tracking-widest text-zinc-400">
            {t("contact.nameLabel")}
          </label>
          <input
            id="contact-name"
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder={t("contact.namePlaceholder")}
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-light text-white transition-all placeholder:text-zinc-500 focus:border-blue-500/50 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
          />
        </div>

        <div>
          <label htmlFor="contact-subject" className="mb-1.5 block font-mono text-xs uppercase tracking-widest text-zinc-400">
            {t("contact.subjectLabel")}
          </label>
          <input
            id="contact-subject"
            type="text"
            value={subject}
            onChange={(event) => setSubject(event.target.value)}
            placeholder={t("contact.subjectPlaceholder")}
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-light text-white transition-all placeholder:text-zinc-500 focus:border-blue-500/50 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
          />
        </div>

        <div>
          <label htmlFor="contact-message" className="mb-1.5 block font-mono text-xs uppercase tracking-widest text-zinc-400">
            {t("contact.messageLabel")}
          </label>
          <textarea
            id="contact-message"
            rows={4}
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            placeholder={t("contact.messagePlaceholder")}
            className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-light text-white transition-all placeholder:text-zinc-500 focus:border-blue-500/50 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
          />
        </div>

        <div className="flex flex-col gap-3 pt-2 sm:flex-row">
          <a
            href={getMailtoUrl()}
            className="inline-flex flex-1 items-center justify-center gap-2.5 rounded-xl bg-white px-6 py-3.5 text-sm font-semibold text-black shadow-[0_0_25px_rgba(255,255,255,0.1)] transition-all duration-300 hover:scale-[1.02] hover:bg-blue-500 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            <Send size={16} aria-hidden="true" />
            <span>{t("contact.openEmailClient")}</span>
          </a>

          <button
            type="button"
            onClick={handleCopyFormatted}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 px-5 py-3.5 text-sm font-medium text-zinc-300 transition-all hover:border-white/30 hover:bg-white/5 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            title={t("contact.copyWebmail")}
            aria-label={copied ? t("contact.copied") : t("contact.copyMessage")}
          >
            {copied ? (
              <>
                <Check size={16} className="text-green-400" aria-hidden="true" />
                <span className="text-green-400">{t("contact.copied")}</span>
              </>
            ) : (
              <>
                <Copy size={16} aria-hidden="true" />
                <span>{t("contact.copyMessage")}</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
