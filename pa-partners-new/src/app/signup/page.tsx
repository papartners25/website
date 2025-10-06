"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { CheckCircle } from "lucide-react";

export default function SignUpPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const supabase = createClient();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const fullName = formData.get("fullName") as string;
    const phone = formData.get("phone") as string;
    const companyName = formData.get("companyName") as string;
    const notes = formData.get("notes") as string;

    try {
      // Sign up the user
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            phone,
            company_name: companyName,
            signup_notes: notes,
          },
        },
      });

      if (signUpError) {
        setError(signUpError.message);
        setLoading(false);
        return;
      }

      if (data.user) {
        // Send approval request email to admin
        await fetch("/api/investor/request-approval", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: data.user.id,
            email,
            fullName,
            phone,
            companyName,
            notes,
          }),
        });

        setSuccess(true);
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-16 md:py-24">
        <div className="mx-auto max-w-md">
          <div className="surface rounded-2xl p-6 md:p-8 shadow-card text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-400/10 border border-green-400/20 mb-6">
              <CheckCircle size={32} className="text-green-400" />
            </div>
            
            <h1 className="text-2xl md:text-3xl font-semibold text-white mb-4">
              Application Submitted
            </h1>
            
            <p className="text-slate-300 leading-relaxed mb-6">
              Thank you for your interest in investing with PA Partners. Your application has been 
              submitted for review.
            </p>

            <div className="surface rounded-xl p-5 text-left mb-6">
              <h3 className="text-white font-medium mb-2">What happens next?</h3>
              <ul className="space-y-2 text-sm text-slate-400">
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">•</span>
                  <span>Our team will review your application within 1-2 business days</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">•</span>
                  <span>You&apos;ll receive an email confirmation once your account is approved</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">•</span>
                  <span>After approval, you can log in to access the investor portal</span>
                </li>
              </ul>
            </div>

            <Link
              href="/"
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-white text-slate-900 font-medium hover:bg-slate-100 transition-colors"
            >
              Return to Homepage
            </Link>

            <p className="mt-6 text-sm text-slate-400">
              Questions? Contact us at{" "}
              <a href="mailto:info@papartners.co" className="text-white hover:opacity-90">
                info@papartners.co
              </a>
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 md:py-24">
      <div className="mx-auto max-w-2xl">
        <div className="surface rounded-2xl p-6 md:p-8 shadow-card">
          <div className="mb-6 text-center">
            <Image src="/logo/pap-logo-gold.png" alt="PA Partners" width={200} height={50} className="mx-auto mb-3 h-10 md:h-12 w-auto opacity-90" />
            <h1 className="text-2xl md:text-3xl font-medium text-white tracking-tight">Request Investor Access</h1>
            <p className="mt-2 text-sm text-slate-300">
              Complete this form to request access to the PA Partners investor portal
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-slate-300 mb-1">
                  Full Name <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  name="fullName"
                  required
                  className="w-full rounded-lg border border-white/10 bg-white/5 text-white placeholder:text-slate-400 px-3 py-2"
                  placeholder="John Smith"
                />
              </div>

              <div>
                <label className="block text-sm text-slate-300 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  className="w-full rounded-lg border border-white/10 bg-white/5 text-white placeholder:text-slate-400 px-3 py-2"
                  placeholder="+1 (555) 123-4567"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-slate-300 mb-1">
                Email Address <span className="text-red-400">*</span>
              </label>
              <input
                type="email"
                name="email"
                required
                className="w-full rounded-lg border border-white/10 bg-white/5 text-white placeholder:text-slate-400 px-3 py-2"
                placeholder="john@example.com"
              />
            </div>

            <div>
              <label className="block text-sm text-slate-300 mb-1">
                Password <span className="text-red-400">*</span>
              </label>
              <input
                type="password"
                name="password"
                required
                minLength={8}
                className="w-full rounded-lg border border-white/10 bg-white/5 text-white placeholder:text-slate-400 px-3 py-2"
                placeholder="Minimum 8 characters"
              />
              <p className="text-xs text-slate-400 mt-1">Choose a strong password (min. 8 characters)</p>
            </div>

            <div>
              <label className="block text-sm text-slate-300 mb-1">
                Company/Entity Name
              </label>
              <input
                type="text"
                name="companyName"
                className="w-full rounded-lg border border-white/10 bg-white/5 text-white placeholder:text-slate-400 px-3 py-2"
                placeholder="Smith Holdings LLC"
              />
            </div>

            <div>
              <label className="block text-sm text-slate-300 mb-1">
                Additional Information
              </label>
              <textarea
                name="notes"
                rows={4}
                className="w-full rounded-lg border border-white/10 bg-white/5 text-white placeholder:text-slate-400 px-3 py-2 resize-none"
                placeholder="Tell us about your investment interests, experience, or any questions..."
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
              className="w-full inline-flex items-center justify-center rounded-lg bg-white text-slate-900 px-4 py-3 text-sm font-medium hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Submitting Application...' : 'Submit Application'}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-300">
            Already have an account?{" "}
            <Link href="/login" className="text-white hover:opacity-90 font-medium">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
