"use client";
import { motion } from "framer-motion";
import Container from "@/components/layout/Container";
import Image from "next/image";
import CapitalStackScene from "@/components/sections/CapitalStackScene";
import CTAButton from "@/components/common/CTAButton";

export default function Hero() {
  return (
    <section className="relative min-h-[82svh] overflow-hidden pt-12 pb-12 md:pt-14 md:pb-16">
      <CapitalStackScene />
      <div className="hero-field absolute inset-0 pointer-events-none" />
      <Container className="relative z-10 grid min-h-[68svh] items-center gap-10 lg:grid-cols-[1fr_0.78fr]">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          <Image
            src="/logo/pa-partners-logo.png"
            alt="PA Partners"
            width={720}
            height={180}
            className="h-24 w-auto opacity-95 md:h-32"
            priority
          />
          <div className="mt-4 flex flex-wrap gap-2 text-[0.7rem] font-medium uppercase tracking-[0.22em] text-slate-300">
            <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1">Development Consulting</span>
            <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1">Capital Stack Architecture</span>
          </div>
          <h1 className="mt-3 max-w-4xl text-4xl font-medium leading-[0.98] tracking-tight text-white md:text-6xl">
            Development capital, structured with discipline.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-300 md:text-lg">
            PA Partners advises operators, sponsors, and family offices on public and private fund strategy,
            capital stack architecture, underwriting, and development planning while pursuing our own
            multifamily and mixed-use projects.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <CTAButton href="/development-consulting" variant="primary">
              Explore Consulting
            </CTAButton>
            <CTAButton href="/contact" variant="secondary">
              Start a Capital Conversation
            </CTAButton>
          </div>
          <p className="mt-5 flex items-center gap-2 text-xs text-slate-400">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400" />
            Currently advising sponsors and family offices on active capital plans.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="hidden lg:block"
          aria-hidden="true"
        >
          <div className="ml-auto max-w-sm border-l border-white/15 pl-6 text-sm leading-relaxed text-slate-300">
            <p className="text-white">Primary workstreams</p>
            <div className="mt-4 grid gap-3">
              {["Capital planning", "Fund consultation", "Underwriting review", "Mixed-use feasibility"].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <span className="h-2 w-2 rounded-full bg-amber-300" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
