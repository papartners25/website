"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function ResetPasswordPage() {
  const supabase = createClient();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // When user lands here via recovery email, Supabase fires PASSWORD_RECOVERY event (handled internally by supabase-js v2)
  // We just present a form to set a new password.

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!password || password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    try {
      setLoading(true);
      const { error: updateError } = await supabase.auth.updateUser({ password });
      if (updateError) {
        setError(updateError.message);
        return;
      }
      setMessage("Password updated. Redirecting to login…");
      setTimeout(() => router.push("/login"), 1500);
    } catch (err) {
      setError("Unable to update password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 md:py-24">
      <div className="mx-auto max-w-md">
        <div className="surface rounded-2xl p-6 md:p-8 shadow-card">
          <div className="mb-6 text-center">
            <Image src="/logo/pap-logo-gold.png" alt="PA Partners" width={200} height={50} className="mx-auto mb-3 h-10 md:h-12 w-auto opacity-90" />
            <h1 className="text-2xl md:text-3xl font-medium text-white tracking-tight">Reset your password</h1>
            <p className="mt-2 text-sm text-slate-300">Enter a new password for your account.</p>
          </div>

          <form onSubmit={handleUpdatePassword} className="grid gap-4">
            <div>
              <label className="block text-sm text-slate-300">New password</label>
              <input
                type="password"
                name="password"
                required
                className="mt-1 w-full rounded-lg border border-white/10 bg-white/5 text-white placeholder:text-slate-400 px-3 py-2"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label className="block text-sm text-slate-300">Confirm password</label>
              </div>
              <input
                type="password"
                name="confirmPassword"
                required
                className="mt-1 w-full rounded-lg border border-white/10 bg-white/5 text-white placeholder:text-slate-400 px-3 py-2"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            {error && (
              <div className="text-sm text-red-400 bg-red-400/10 border border-red-400/20 rounded-lg px-3 py-2">
                {error}
              </div>
            )}
            {message && (
              <div className="text-sm text-emerald-400 bg-emerald-400/10 border border-emerald-400/20 rounded-lg px-3 py-2">
                {message}
              </div>
            )}
            <button
              type="submit"
              disabled={loading}
              className="mt-2 inline-flex items-center justify-center rounded-lg bg-white text-slate-900 px-4 py-2 text-sm font-medium hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Updating…" : "Update password"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}


