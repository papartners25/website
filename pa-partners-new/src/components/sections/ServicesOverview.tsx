"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import { consultingCapabilities } from "@/lib/offerings";

export default function ServicesOverview() {
  const buckets = [
    {
      title: "Development Consulting",
      href: "/development-consulting",
      desc: "Capital architecture, fund consultation, underwriting, feasibility, and development planning for sponsors and operators.",
      meta: "Client advisory",
    },
    {
      title: "Internal Development",
      href: "/real-estate",
      desc: "Our own multifamily and mixed-use development work, shaped by disciplined underwriting and practical execution.",
      meta: "Principal activity",
    },
    {
      title: "New Business Opportunities",
      href: "/new-business",
      desc: "Operating company formation and venture incubation, including FrunkVault, our direct-to-consumer e-commerce brand.",
      meta: "Company building",
    },
  ];

  return (
    <Section className="relative">
      <Container>
        <motion.h2
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5 }}
          className="text-2xl md:text-3xl font-medium text-white text-center"
        >
          What PA Partners Builds
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="mt-4 max-w-3xl mx-auto text-slate-300 text-center"
        >
          We sit at the intersection of real estate execution, capital strategy, and operating company
          formation. The consulting practice is the primary client-facing offer; internal development and
          new business formation keep our advice grounded in work we do ourselves.
        </motion.p>

        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {buckets.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.05 * i, duration: 0.4 }}
              className="surface group rounded-xl p-5 transition-colors hover:bg-white/[0.08]"
            >
              <p className="text-xs uppercase tracking-[0.18em] text-amber-300/80">{item.meta}</p>
              <h3 className="mt-3 text-lg font-medium text-white">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-300">{item.desc}</p>
              <div className="mt-4">
                <Link href={item.href} className="font-medium text-white/90 hover:text-white">
                  Learn more →
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 grid gap-3 md:grid-cols-4">
          {consultingCapabilities.map((capability) => (
            <div key={capability.title} className="border-t border-white/10 pt-4">
              <h3 className="text-sm font-medium text-white">{capability.title}</h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-400">{capability.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}

