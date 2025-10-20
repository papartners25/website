"use client";

import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import { DEALS, computeDealStats } from "@/lib/deals";
import DealCard from "@/components/dataroom/DealCard";
import Link from "next/link";
import React from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";

export default function RealEstateContent() {
  const stats = computeDealStats(DEALS);
  return (
    <>
      {/* Page header with smooth entrance to match home transitions */}
      <Section className="py-10 md:py-12">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="surface rounded-xl p-5 md:p-6 shadow-card"
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div>
                <h1 className="text-2xl md:text-3xl font-medium text-white">Real Estate</h1>
                <p className="text-slate-300 mt-2 max-w-2xl">
                  We pursue value‑add acquisitions in durable, cash‑flowing submarkets. Our discipline: buy at a
                  margin of safety, renovate to market, and operate with excellence.
                </p>
              </div>
              <div className="flex gap-3">
                <Link href="/opportunities" className="inline-flex items-center rounded-lg bg-white text-slate-900 px-4 py-2 text-sm font-medium hover:bg-slate-100">
                  View Opportunities
                </Link>
                <Link href="/login?next=/dataroom" className="inline-flex items-center rounded-lg border border-white/10 px-4 py-2 text-sm text-slate-200 hover:text-white hover:bg-white/5">
                  Investor Login
                </Link>
              </div>
            </div>
          </motion.div>
        </Container>
      </Section>

      {/* Quick stats from current deals */}
      <Section className="py-8 md:py-10">
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <motion.div initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-40px" }} transition={{ duration: 0.5 }}>
              <StatNumber label="Available Deals" value={stats.availableDeals} />
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-40px" }} transition={{ delay: 0.05, duration: 0.5 }}>
              <Stat label="IRR Range" value={stats.irrRange ? `${stats.irrRange.min.toFixed(1)}–${stats.irrRange.max.toFixed(1)}%` : "—"} />
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-40px" }} transition={{ delay: 0.1, duration: 0.5 }}>
              <Stat label="Hold (yrs)" value={stats.holdRange ? `${stats.holdRange.min}–${stats.holdRange.max}` : "—"} />
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-40px" }} transition={{ delay: 0.15, duration: 0.5 }}>
              <Stat label="Focus" value="Value‑Add Multifamily" />
            </motion.div>
          </div>
        </Container>
      </Section>

      {/* Current opportunities (summit first) */}
      <Section className="py-8 md:py-10">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5 }}
            className="surface rounded-xl p-5 md:p-6 shadow-card"
          >
            <h2 className="text-xl md:text-2xl font-semibold text-white">Current Opportunities</h2>
            <p className="text-slate-300 text-sm md:text-base mt-2">Explore active value‑add investments we’re underwriting now.</p>
            <div className="mt-4 grid gap-4">
              {(["summit-flats", "south-of-mound"]
                .map(id => DEALS.find(d => d.id === id))
                .filter((d): d is typeof DEALS[number] => Boolean(d))
                .map(d => ({ ...d, imageUrl: undefined }))
              ).map(d => (
                <DealCard key={d.id} deal={d} isPublic={true} />
              ))}
            </div>
          </motion.div>
        </Container>
      </Section>

      {/* Investment criteria */}
      <Section className="py-8 md:py-12">
        <Container>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { title: "Markets", points: ["Columbus, OH metro", "Growing submarkets", "Landlord‑friendly policy"] },
              { title: "Asset Profile", points: ["10–100 units", "B/B‑ neighborhoods", "Light–moderate renovations"] },
              { title: "Return Targets", points: ["IRR 18–25%+", "2.0x+ equity multiple", "2–5 year hold"] },
            ].map((c, i) => (
              <motion.div
                key={c.title}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: 0.05 * i, duration: 0.5 }}
              >
                <Criteria title={c.title} points={c.points as string[]} />
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="surface rounded-lg p-4 border border-white/10">
      <p className="text-xs text-slate-400">{label}</p>
      <p className="text-xl font-semibold text-white mt-1">{value}</p>
    </div>
  );
}

function StatNumber({ label, value }: { label: string; value: number }) {
  return (
    <div className="surface rounded-lg p-4 border border-white/10">
      <p className="text-xs text-slate-400">{label}</p>
      <p className="text-xl font-semibold text-white mt-1">
        <AnimatedNumber value={value} />
      </p>
    </div>
  );
}

function Criteria({ title, points }: { title: string; points: string[] }) {
  return (
    <div className="surface rounded-xl p-5 border border-white/10">
      <h3 className="text-base font-semibold text-white mb-3">{title}</h3>
      <ul className="space-y-2 text-sm text-slate-300 list-disc pl-5">
        {points.map(p => (
          <li key={p}>{p}</li>
        ))}
      </ul>
    </div>
  );
}

function AnimatedNumber({ value, duration = 0.8 }: { value: number; duration?: number }) {
  const motionValue = useMotionValue(0);
  const rounded = useTransform(motionValue, latest => Math.round(latest));

  React.useEffect(() => {
    const controls = animate(motionValue, value, { duration, ease: "easeOut" });
    return controls.stop;
  }, [value, duration, motionValue]);

  return <motion.span>{rounded}</motion.span>;
}


