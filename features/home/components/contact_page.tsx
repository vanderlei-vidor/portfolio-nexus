"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ArrowLeft, Check, Copy, GitBranch, LinkIcon, Mail } from "lucide-react";
import Link from "next/link";
import { useTranslation } from "@/shared/i18n/useTranslation";
import DirectContactForm from "./DirectContactForm";

export default function ContactPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);
  const { t } = useTranslation();

  const email = "vanderleividor1@gmail.com";

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".contact-item",
        {
          y: 30,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
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
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main
      ref={containerRef}
      className="relative flex min-h-screen flex-col items-center justify-center bg-[#030303] px-6 py-16 text-white md:py-24"
    >
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-size-[60px_60px]" />
      <div className="pointer-events-none absolute left-1/2 top-0 h-full w-full -translate-x-1/2 bg-linear-to-b from-blue-500/10 via-transparent to-transparent" />

      <div className="relative z-10 w-full max-w-5xl">
        <Link href="/" className="contact-item group mb-8 inline-flex items-center gap-2 font-mono text-sm uppercase tracking-wider text-zinc-400 transition-colors hover:text-white">
          <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-1" aria-hidden="true" />
          {t("contact.backToHome")}
        </Link>

        <header className="contact-item mb-12">
          <h1 className="mb-4 text-5xl font-bold tracking-tighter text-white sm:text-6xl">{t("contact.pageTitle")}</h1>
          <p className="text-lg font-light text-zinc-300">{t("contact.pageSubtitle")}</p>
        </header>

        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <DirectContactForm />
          </div>

          <div className="space-y-6 lg:col-span-5">
            <div className="contact-item group relative rounded-2xl border border-white/10 bg-white/3 p-6 transition-all duration-300 hover:border-blue-500/30 hover:bg-white/6">
              <div className="flex flex-wrap items-center justify-between gap-4 sm:flex-nowrap">
                <div className="flex min-w-0 items-center gap-4">
                  <div className="rounded-xl border border-blue-500/20 bg-blue-500/10 p-3 text-blue-400" aria-hidden="true">
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
                  className="ml-auto rounded-lg border border-white/5 bg-white/5 p-2.5 text-zinc-300 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:ml-0"
                  aria-label={t("contact.copyEmail")}
                  title={t("contact.copyEmail")}
                >
                  {copied ? <Check size={18} className="text-green-400" aria-hidden="true" /> : <Copy size={18} aria-hidden="true" />}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
              <a
                href="https://linkedin.com/in/vanderlei-vidor-979593410"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-item group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/3 p-6 transition-all duration-300 hover:border-blue-500/30 hover:bg-white/6"
              >
                <div className="rounded-xl border border-blue-500/20 bg-blue-500/10 p-3 text-blue-400 transition-transform duration-300 group-hover:scale-110" aria-hidden="true">
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
                className="contact-item group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/3 p-6 transition-all duration-300 hover:border-zinc-500/30 hover:bg-white/6"
              >
                <div className="rounded-xl border border-white/10 bg-zinc-500/10 p-3 text-zinc-300 transition-transform duration-300 group-hover:scale-110" aria-hidden="true">
                  <GitBranch size={22} />
                </div>
                <div>
                  <p className="mb-0.5 font-mono text-xs uppercase tracking-widest text-zinc-400">{t("contact.sourceCode")}</p>
                  <p className="text-lg font-medium text-zinc-100">{t("contact.githubProfile")}</p>
                </div>
              </a>
            </div>
          </div>
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
