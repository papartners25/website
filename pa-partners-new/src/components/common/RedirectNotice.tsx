"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function RedirectNotice({
  message = "This page is under construction. Redirecting you...",
  href = "/",
  delayMs = 3200,
  backFirst = false,
  fallbackHref = "/",
}: {
  message?: string;
  href?: string;
  delayMs?: number;
  backFirst?: boolean;
  fallbackHref?: string;
}) {
  const router = useRouter();
  const [secondsLeft, setSecondsLeft] = useState(Math.ceil(delayMs / 1000));

  useEffect(() => {
    const doRedirect = () => {
      if (backFirst) {
        if (typeof window !== "undefined" && window.history.length > 1) {
          router.back();
        } else {
          router.push(fallbackHref);
        }
      } else {
        router.push(href);
      }
    };

    const timeout = setTimeout(doRedirect, delayMs);
    const interval = setInterval(() => {
      setSecondsLeft((s) => (s > 0 ? s - 1 : 0));
    }, 1000);

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [href, delayMs, router, backFirst, fallbackHref]);

  return (
    <div className="surface rounded-xl p-6 md:p-8 text-center shadow-elevated">
      <p className="text-base md:text-lg text-slate-200">{message}</p>
      <p className="mt-2 text-sm text-slate-400">
        Redirecting in {secondsLeft}s. If not redirected, <a href={backFirst ? fallbackHref : href} className="underline hover:text-white">click here</a>.
      </p>
    </div>
  );
}


