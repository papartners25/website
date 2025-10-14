import { Suspense } from "react";
import LoginForm from "./LoginForm";

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="mx-auto max-w-6xl px-4 py-16 md:py-24"><div className="text-center text-slate-400">Loading…</div></div>}>
      <LoginForm />
    </Suspense>
  );
}


