"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";

export default function ServicesOverview() {
  return (
    <Section>
      <Container>
        <motion.h2
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5 }}
          className="text-2xl md:text-3xl font-medium text-white text-center"
        >
          Who are the PA Partners?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="mt-4 max-w-3xl mx-auto text-slate-300 text-center"
        >
          PA Partners is a boutique private equity firm focused on value‑add real estate and applied AI. Our primary mandate is to underwrite and acquire cash‑flowing real estate assets; in parallel, we build and support agentic AI solutions that solve standard business problems.
        </motion.p>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-2">
          {[
            {
              title: "Real Estate Development",
              href: "/real-estate",
              desc: "Value-add, cash-flowing investments and disciplined underwriting.",
            },
            {
              title: "AI Solutions",
              href: "/ai",
              desc: "Practical AI agent solutions for standard business problems.",
            },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.05 * i, duration: 0.4 }}
              className="rounded-xl p-5 surface hover:shadow-card"
            >
              <h3 className="text-white font-medium">{item.title}</h3>
              <p className="text-slate-300 text-sm mt-1">{item.desc}</p>
              <div className="mt-4">
                <Link href={item.href} className="text-white/90 hover:text-white font-medium">
                  Learn more →
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
}


