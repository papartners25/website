"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const supabase = createClient();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) {
        setError(signInError.message);
        setLoading(false);
        return;
      }

      if (data.session) {
        // Successfully logged in - honor `next` param when present
        const next = searchParams.get("next");
        const isInternal = next && next.startsWith("/");
        router.push(isInternal ? (next as string) : "/dashboard");
        router.refresh();
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 md:py-24">
      <div className="mx-auto max-w-md">
        <div className="surface rounded-2xl p-6 md:p-8 shadow-card">
          <div className="mb-6 text-center">
              <Image src="/logo/pap-logo-gold.png" alt="PA Partners" width={200} height={50} className="mx-auto mb-3 h-10 md:h-12 w-auto opacity-90" />
            <h1 className="text-2xl md:text-3xl font-medium text-white tracking-tight">Investor Portal</h1>
            <p className="mt-2 text-sm text-slate-300">Sign in to view your profile, holdings, and reports.</p>
          </div>
          <form onSubmit={handleSubmit} className="grid gap-4">
            <div>
              <label className="block text-sm text-slate-300">Email</label>
              <input
                type="email"
                name="email"
                required
                className="mt-1 w-full rounded-lg border border-white/10 bg-white/5 text-white placeholder:text-slate-400 px-3 py-2"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label className="block text-sm text-slate-300">Password</label>
                <Link href="#" className="text-xs text-slate-300 hover:text-white">Forgot?</Link>
              </div>
              <input
                type="password"
                name="password"
                required
                className="mt-1 w-full rounded-lg border border-white/10 bg-white/5 text-white placeholder:text-slate-400 px-3 py-2"
                placeholder="••••••••"
              />
            </div>
            {error && (
              <div className="text-sm text-red-400 bg-red-400/10 border border-red-400/20 rounded-lg px-3 py-2">
                {error}
              </div>
            )}
            <button
              type="submit"
              disabled={loading}
              className="mt-2 inline-flex items-center justify-center rounded-lg bg-white text-slate-900 px-4 py-2 text-sm font-medium hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </form>
          <div className="mt-6 space-y-4">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-[#1e293b] px-2 text-slate-500">or</span>
              </div>
            </div>

            <Link
              href="/signup"
              className="w-full inline-flex items-center justify-center rounded-lg border border-white/20 bg-white/5 px-4 py-2.5 text-sm font-medium text-white hover:bg-white/10 hover:border-white/30 transition-all"
            >
              Request Investor Access
            </Link>

            <p className="text-center text-xs text-slate-400">
              New investors must be approved before accessing the portal
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}


