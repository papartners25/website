"use client";

import { useState, useEffect } from "react";
import {
  FileText,
  MessageSquareText,
  BarChart3,
  ShieldCheck,
  Lock,
} from "lucide-react";
import CTAButton from "@/components/common/CTAButton";

const portalCapabilities = [
  {
    icon: <BarChart3 size={20} />,
    title: "Reporting",
    description:
      "Periodic updates and performance summaries shared with approved partners when a mandate is active.",
  },
  {
    icon: <FileText size={20} />,
    title: "Documents",
    description:
      "A single, access-controlled place for agreements, memos, and reference materials.",
  },
  {
    icon: <MessageSquareText size={20} />,
    title: "Communications",
    description:
      "Private correspondence and announcements kept off the public site and out of email threads.",
  },
];

export default function PortalPreview() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="relative my-8 lg:my-12">
      <div className="mb-10 text-center">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-amber-400/20 bg-amber-400/10 px-4 py-2 text-sm font-medium text-amber-300">
          <ShieldCheck size={16} />
          <span>Private Access</span>
        </div>
        <h2 className="mb-4 text-3xl font-semibold text-white md:text-4xl">
          The Partner Portal
        </h2>
        <p className="mx-auto max-w-2xl text-lg text-slate-400">
          When an engagement or opportunity is active, approved partners use a private portal for
          reporting, documents, and confidential communications. There is no active deal room today.
        </p>
      </div>

      <div
        className={`relative transition-all duration-1000 ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
        }`}
      >
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-amber-500/10 via-purple-500/5 to-blue-500/10 blur-3xl" />

        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.07] to-white/[0.02] shadow-2xl backdrop-blur-xl">
          <div className="flex items-center justify-between border-b border-white/10 bg-white/[0.03] px-6 py-4">
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="h-3 w-3 rounded-full bg-red-400/60" />
                <div className="h-3 w-3 rounded-full bg-amber-400/60" />
                <div className="h-3 w-3 rounded-full bg-green-400/60" />
              </div>
              <div className="ml-4 flex items-center gap-2 text-sm text-slate-400">
                <Lock size={14} />
                <span>Authenticated access</span>
              </div>
            </div>
            <div className="font-mono text-xs text-slate-500">portal.papartners.co</div>
          </div>

          <div className="grid gap-px bg-white/5 md:grid-cols-3">
            {portalCapabilities.map((item) => (
              <div key={item.title} className="bg-slate-950/40 p-6">
                <div className="mb-4 w-fit rounded-lg border border-white/10 bg-amber-400/10 p-2.5 text-amber-300">
                  {item.icon}
                </div>
                <h3 className="text-base font-semibold text-white">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">{item.description}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-col items-center gap-4 border-t border-white/10 bg-white/[0.02] px-6 py-7 text-center sm:flex-row sm:justify-between sm:text-left">
            <p className="max-w-md text-sm text-slate-400">
              Access is granted to approved partners only. If you have credentials, sign in below.
            </p>
            <CTAButton href="/login" variant="primary">
              Sign In to Portal
            </CTAButton>
          </div>
        </div>
      </div>
    </div>
  );
}
