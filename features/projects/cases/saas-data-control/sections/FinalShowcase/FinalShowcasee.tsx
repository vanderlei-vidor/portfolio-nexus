"use client";

import Link from "next/link";
import { ArrowRight, Cpu, HardDrive, Terminal } from "lucide-react";
import { useTranslation } from "@/shared/i18n/useTranslation";

export function FinalShowcase() {
  const { t } = useTranslation();

  return (
    <section className="relative overflow-hidden bg-[#060913] py-35">
      <div
        className="pointer-events-none absolute -bottom-50 left-1/2 z-0 h-150 w-150 -translate-x-1/2 bg-[radial-gradient(circle,rgba(37,99,235,0.15),transparent_70%)]"
        aria-hidden="true"
      />

      <div className="mx-auto w-full max-w-5xl px-4">
        <div className="relative z-10 rounded-[28px] border border-white/5 bg-[#0f172a]/60 p-8 shadow-[0_40px_100px_rgba(0,0,0,0.4)] backdrop-blur-sm md:p-16">
          <div className="mb-14 flex flex-col items-center gap-5 text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-blue-600/20 bg-blue-600/10 px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#60a5fa]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#3b82f6] shadow-[0_0_12px_#3b82f6]" aria-hidden="true" />
              Production Ready
            </span>

            <h2 className="max-w-175 text-[clamp(2rem,3.5vw,2.75rem)] font-extrabold leading-[1.1] tracking-tight text-white">
              Ready to Scale in the{" "}
              <span className="bg-linear-to-br from-[#3b82f6] to-[#a78bfa] bg-clip-text text-transparent">
                Enterprise
              </span>{" "}
              Landscape
            </h2>

            <p className="max-w-145 text-lg leading-[1.7] text-[#94a3b8]">
              saas_data_control consolidates clean architecture, robust Java performance, and a flawless user experience under high corporate demands.
            </p>
          </div>

          <div className="mb-14 grid grid-cols-1 gap-6 md:grid-cols-3">
            <ConsoleMetric icon={Cpu} value="< 45ms" label="Response Time (API)" />
            <ConsoleMetric icon={HardDrive} value="100% ACID" label="Relational Persistence" />
            <ConsoleMetric icon={Terminal} value="Zero Leak" label="Memory Management" />
          </div>

          <div className="flex flex-col gap-8">
            <div className="h-px w-full bg-linear-to-r from-transparent via-white/10 to-transparent" />

            <div className="flex flex-col items-center justify-between gap-8 text-center md:flex-row md:text-left">
              <div>
                <h3 className="mb-1 text-xl font-bold text-white">
                  {t("contact.title")} {t("contact.titleGradient")}
                </h3>
                <p className="text-[0.9375rem] text-[#64748b]">{t("contact.subtitle")}</p>
              </div>

              <Link
                href="/contact"
                className="inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-white px-7 py-3.5 text-[0.9375rem] font-semibold text-[#060913] transition-all duration-300 ease-in-out hover:-translate-y-0.5 hover:bg-[#2563eb] hover:text-white hover:shadow-[0_12px_30px_rgba(37,99,235,0.3)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white md:w-auto"
              >
                {t("contact.startProject")}
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

interface ConsoleMetricProps {
  icon: typeof Cpu;
  value: string;
  label: string;
}

function ConsoleMetric({ icon: Icon, value, label }: ConsoleMetricProps) {
  return (
    <div className="group flex items-center gap-5 rounded-2xl border border-white/3 bg-[#1e293b]/30 p-6 transition-all duration-300 ease-in-out hover:-translate-y-0.5 hover:border-blue-600/30 hover:bg-[#1e293b]/50">
      <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/8 bg-white/3 text-[#94a3b8] transition-all duration-300 ease-in-out group-hover:border-[#2563eb] group-hover:bg-[#2563eb] group-hover:text-white" aria-hidden="true">
        <Icon size={20} />
      </div>
      <div className="flex flex-col gap-0.5">
        <span className="font-mono text-xl font-bold tracking-tight text-white">{value}</span>
        <span className="text-[0.8125rem] text-[#64748b]">{label}</span>
      </div>
    </div>
  );
}

export default FinalShowcase;
