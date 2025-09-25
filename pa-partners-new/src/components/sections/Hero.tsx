"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import Image from "next/image";

export default function Hero() {
  return (
    <Section className="pt-14 md:pt-22">
      <Container className="text-center">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center gap-4"
        >
          <Image src="/logo/pa-partners-logo.png" alt="PA Partners" width={720} height={180} className="h-28 md:h-36 w-auto opacity-90" />
          <h1 className="text-3xl md:text-5xl font-medium tracking-tight">Alternative investments, engineered with discipline</h1>
        </motion.div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mt-4 max-w-2xl mx-auto text-base md:text-lg text-slate-300"
        >
          PA Partners is a boutique private equity firm focused on value‑add, cash‑flowing real estate and applied AI solutions to standard business problems.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.5 }}
          className="mt-8 flex items-center justify-center gap-3"
        >
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-lg bg-white text-slate-900 px-4 py-2 text-sm md:text-base hover:bg-slate-100"
          >
            Get in Touch
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-lg border border-white/10 px-4 py-2 text-sm md:text-base text-slate-200 hover:text-white hover:bg-white/5"
          >
            Contact Us
          </Link>
        </motion.div>
      </Container>
    </Section>
  );
}


