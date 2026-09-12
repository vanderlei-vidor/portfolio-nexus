"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Mail } from "lucide-react";
import { useTranslation } from "@/shared/i18n/useTranslation";

export default function Contact() {
  const { t } = useTranslation();

  return (
    <section className="relative overflow-hidden border-t border-white/10 px-6 py-32">
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#ffffff04_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-size-[56px_56px]" />

      <div className="mx-auto max-w-5xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-zinc-400">
            {t("contact.badge")}
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          viewport={{ once: true }}
          className="mb-10 text-5xl font-bold leading-[0.95] tracking-normal text-white md:text-7xl lg:text-8xl"
        >
          {t("contact.title")}
          <br />
          <span className="bg-linear-to-r from-blue-300 via-violet-300 to-pink-300 bg-clip-text text-transparent">
            {t("contact.titleGradient")}
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 0.9, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          viewport={{ once: true }}
          className="mx-auto mb-14 max-w-2xl text-lg font-light leading-relaxed text-zinc-300 md:text-xl"
        >
          {t("contact.subtitle")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Link
            href="/contact"
            className="group inline-flex w-full items-center justify-center gap-3 rounded-lg bg-white px-8 py-4 font-bold text-black shadow-[0_0_35px_rgba(255,255,255,0.12)] transition-colors duration-300 hover:bg-blue-400 sm:w-auto"
          >
            <span>{t("contact.startProject")}</span>
            <ArrowUpRight className="h-5 w-5 transition-transform duration-300 group-hover:rotate-45" aria-hidden="true" />
          </Link>

          <a
            href="mailto:vanderleividor1@gmail.com"
            className="inline-flex w-full items-center justify-center gap-3 rounded-lg border border-white/20 px-8 py-4 font-bold text-white transition-colors duration-300 hover:border-white/50 hover:bg-white/5 sm:w-auto"
          >
            <Mail className="h-5 w-5" aria-hidden="true" />
            <span>{t("contact.emailMe")}</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
