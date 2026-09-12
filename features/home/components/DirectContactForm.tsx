"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Copy, Send, Sparkles } from "lucide-react";
import { useTranslation } from "@/shared/i18n/useTranslation";

export default function DirectContactForm() {
  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [copied, setCopied] = useState(false);
  const { t } = useTranslation();
  const copyTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

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

    if (copyTimerRef.current) clearTimeout(copyTimerRef.current);
    copyTimerRef.current = setTimeout(() => setCopied(false), 2500);
  };
  useEffect(() => {
    return () => {
      if (copyTimerRef.current) clearTimeout(copyTimerRef.current);
    };
  }, []);

  return (
    <section className="contact-item relative overflow-hidden rounded-lg border border-white/10 bg-white/[0.03] p-6 shadow-2xl backdrop-blur-xl sm:p-8">
      <div className="mb-7 flex items-center gap-3">
        <div className="rounded-lg border border-blue-400/20 bg-blue-400/10 p-2.5 text-blue-300" aria-hidden="true">
          <Sparkles size={20} />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-white">{t("contact.generatorTitle")}</h2>
          <p className="mt-1 text-sm leading-relaxed text-zinc-400">{t("contact.generatorSubtitle")}</p>
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
            className="w-full rounded-lg border border-white/10 bg-black/30 px-4 py-3 text-sm font-light text-white transition-colors placeholder:text-zinc-500 focus:border-blue-400/50 focus:outline-none focus:ring-2 focus:ring-blue-400/30"
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
            className="w-full rounded-lg border border-white/10 bg-black/30 px-4 py-3 text-sm font-light text-white transition-colors placeholder:text-zinc-500 focus:border-blue-400/50 focus:outline-none focus:ring-2 focus:ring-blue-400/30"
          />
        </div>

        <div>
          <label htmlFor="contact-message" className="mb-1.5 block font-mono text-xs uppercase tracking-widest text-zinc-400">
            {t("contact.messageLabel")}
          </label>
          <textarea
            id="contact-message"
            rows={5}
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            placeholder={t("contact.messagePlaceholder")}
            className="w-full resize-none rounded-lg border border-white/10 bg-black/30 px-4 py-3 text-sm font-light text-white transition-colors placeholder:text-zinc-500 focus:border-blue-400/50 focus:outline-none focus:ring-2 focus:ring-blue-400/30"
          />
        </div>

        <div className="flex flex-col gap-3 pt-2 sm:flex-row">
          <a
            href={getMailtoUrl()}
            className="inline-flex flex-1 items-center justify-center gap-2.5 rounded-lg bg-white px-6 py-3.5 text-sm font-semibold text-black shadow-[0_0_25px_rgba(255,255,255,0.1)] transition-colors duration-300 hover:bg-blue-400 hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            <Send size={16} aria-hidden="true" />
            <span>{t("contact.openEmailClient")}</span>
          </a>

          <button
            type="button"
            onClick={handleCopyFormatted}
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/15 px-5 py-3.5 text-sm font-medium text-zinc-300 transition-colors hover:border-white/30 hover:bg-white/5 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
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
    </section>
  );
}
