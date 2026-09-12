"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ArrowLeft, Check, Copy, GitBranch, Lightbulb, LinkIcon, Mail } from "lucide-react";
import Link from "next/link";
import { useTranslation } from "@/shared/i18n/useTranslation";
import DirectContactForm from "./DirectContactForm";

export default function ContactPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);
  const { t } = useTranslation();
  const copyTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const email = "vanderleividor1@gmail.com";
  const briefItems = [
    t("contact.briefItemOne"),
    t("contact.briefItemTwo"),
    t("contact.briefItemThree"),
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".contact-item",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",
          delay: 0.1,
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const copyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);

    if (copyTimerRef.current) clearTimeout(copyTimerRef.current);
    copyTimerRef.current = setTimeout(() => setCopied(false), 2000);
  };
  useEffect(() => {
    return () => {
      if (copyTimerRef.current) clearTimeout(copyTimerRef.current);
    };
  }, []);

  return (
    <main
      ref={containerRef}
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#030303] px-6 py-16 text-white md:py-24"
    >
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff04_1px,transparent_1px)] bg-size-[56px_56px]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-white/20 to-transparent" />

      <div className="relative z-10 w-full max-w-6xl">
        <Link href="/" className="contact-item group mb-10 inline-flex items-center gap-2 font-mono text-sm uppercase tracking-wider text-zinc-400 transition-colors hover:text-white">
          <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-1" aria-hidden="true" />
          {t("contact.backToHome")}
        </Link>

        <header className="contact-item mb-12 max-w-3xl">
          <p className="mb-5 font-mono text-xs uppercase tracking-[0.3em] text-blue-300">{t("contact.badge")}</p>
          <h1 className="mb-6 text-5xl font-bold leading-[0.95] tracking-normal text-white sm:text-6xl md:text-7xl">
            {t("contact.pageTitle")}
          </h1>
          <p className="max-w-2xl text-base font-light leading-relaxed text-zinc-300 sm:text-lg">
            {t("contact.pageSubtitle")}
          </p>
        </header>

        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <DirectContactForm />
          </div>

          <aside className="space-y-5 lg:col-span-5">
            <section className="contact-item rounded-lg border border-white/10 bg-white/[0.03] p-6">
              <div className="mb-5 flex items-center gap-3">
                <div className="rounded-lg border border-blue-400/20 bg-blue-400/10 p-2.5 text-blue-300" aria-hidden="true">
                  <Lightbulb size={20} />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-white">{t("contact.briefTitle")}</h2>
                  <p className="mt-1 text-sm leading-relaxed text-zinc-400">{t("contact.briefSubtitle")}</p>
                </div>
              </div>

              <ul className="space-y-3">
                {briefItems.map((item) => (
                  <li key={item} className="flex gap-3 text-sm leading-relaxed text-zinc-300">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-300" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="contact-item rounded-lg border border-white/10 bg-white/[0.03] p-6 transition-colors duration-300 hover:border-blue-400/30 hover:bg-white/[0.05]">
              <div className="flex flex-wrap items-center justify-between gap-4 sm:flex-nowrap">
                <div className="flex min-w-0 items-center gap-4">
                  <div className="rounded-lg border border-blue-400/20 bg-blue-400/10 p-3 text-blue-300" aria-hidden="true">
                    <Mail size={22} />
                  </div>
                  <div className="min-w-0">
                    <p className="mb-0.5 font-mono text-xs uppercase tracking-widest text-zinc-400">{t("contact.emailDirectly")}</p>
                    <p className="break-all text-base font-medium text-zinc-100 selection:bg-blue-500 sm:text-lg">{email}</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={copyEmail}
                  className="ml-auto rounded-lg border border-white/10 bg-white/5 p-2.5 text-zinc-300 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:ml-0"
                  aria-label={t("contact.copyEmail")}
                  title={t("contact.copyEmail")}
                >
                  {copied ? <Check size={18} className="text-green-400" aria-hidden="true" /> : <Copy size={18} aria-hidden="true" />}
                </button>
              </div>
            </section>

            <div className="grid grid-cols-1 gap-4">
              <a
                href="https://linkedin.com/in/vanderlei-vidor-979593410"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-item group flex items-center gap-4 rounded-lg border border-white/10 bg-white/[0.03] p-6 transition-colors duration-300 hover:border-blue-400/30 hover:bg-white/[0.05]"
              >
                <div className="rounded-lg border border-blue-400/20 bg-blue-400/10 p-3 text-blue-300 transition-transform duration-300 group-hover:scale-105" aria-hidden="true">
                  <LinkIcon size={22} />
                </div>
                <div>
                  <p className="mb-0.5 font-mono text-xs uppercase tracking-widest text-zinc-400">{t("contact.professionalNetwork")}</p>
                  <p className="text-lg font-medium text-zinc-100">{t("contact.linkedinProfile")}</p>
                </div>
              </a>

              <a
                href="https://github.com/vanderlei-vidor"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-item group flex items-center gap-4 rounded-lg border border-white/10 bg-white/[0.03] p-6 transition-colors duration-300 hover:border-zinc-400/30 hover:bg-white/[0.05]"
              >
                <div className="rounded-lg border border-white/10 bg-zinc-500/10 p-3 text-zinc-300 transition-transform duration-300 group-hover:scale-105" aria-hidden="true">
                  <GitBranch size={22} />
                </div>
                <div>
                  <p className="mb-0.5 font-mono text-xs uppercase tracking-widest text-zinc-400">{t("contact.sourceCode")}</p>
                  <p className="text-lg font-medium text-zinc-100">{t("contact.githubProfile")}</p>
                </div>
              </a>
            </div>
          </aside>
        </div>

        <footer className="contact-item mt-16 border-t border-white/10 pt-8 text-center">
          <p className="font-mono text-sm text-zinc-500">
            <span>© 2026</span> <span aria-hidden="true">•</span> <span>Portfolio Nexus</span> <span aria-hidden="true">•</span> <span>{t("contact.allRightsReserved")}</span>
          </p>
        </footer>
      </div>
    </main>
  );
}
