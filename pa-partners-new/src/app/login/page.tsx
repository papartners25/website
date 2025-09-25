import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "Investor Login",
  description: "Secure access for investors and stakeholders.",
};

export default function LoginPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 md:py-24">
      <div className="mx-auto max-w-md">
        <div className="surface rounded-2xl p-6 md:p-8 shadow-card">
          <div className="mb-6 text-center">
              <Image src="/logo/pa-favicon.ico" alt="PA Partners" width={96} height={96} className="mx-auto mb-3 h-12 md:h-14 w-auto opacity-90" />
            <h1 className="text-2xl md:text-3xl font-medium text-white tracking-tight">Investor Portal</h1>
            <p className="mt-2 text-sm text-slate-300">Sign in to view your profile, holdings, and reports.</p>
          </div>
          <form
            action={"/api/auth/login"}
            method="post"
            className="grid gap-4"
          >
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
            <button
              type="submit"
              className="mt-2 inline-flex items-center justify-center rounded-lg bg-white text-slate-900 px-4 py-2 text-sm font-medium hover:bg-slate-100"
            >
              Sign in
            </button>
          </form>
          <p className="mt-6 text-center text-sm text-slate-300">
            Don’t have access? <Link href="/contact" className="text-white hover:opacity-90">Request an invite</Link>
          </p>
        </div>
      </div>
    </div>
  );
}


