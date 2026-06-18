import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";

type Variant = "primary" | "secondary" | "ghost";

type CTAButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  external?: boolean;
  className?: string;
  /** Hide the trailing arrow icon. */
  noIcon?: boolean;
};

const base =
  "group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-xl px-6 py-3 text-sm font-medium tracking-tight transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#090b10]";

const variants: Record<Variant, string> = {
  // Gold-leaf primary: gradient fill, soft amber glow, sheen sweep on hover.
  primary:
    "bg-gradient-to-b from-amber-200 via-amber-300 to-amber-500 text-slate-950 shadow-[0_8px_30px_-12px_rgba(212,175,55,0.7)] hover:shadow-[0_14px_40px_-12px_rgba(212,175,55,0.85)] hover:-translate-y-0.5",
  // Glass secondary: frosted surface that brightens on hover.
  secondary:
    "border border-white/15 bg-white/[0.06] text-slate-100 backdrop-blur-sm hover:border-white/30 hover:bg-white/[0.12] hover:text-white hover:-translate-y-0.5",
  // Minimal inline link-style CTA.
  ghost:
    "px-1 py-1 text-white/90 hover:text-white",
};

function Inner({
  children,
  variant,
  external,
  noIcon,
}: {
  children: React.ReactNode;
  variant: Variant;
  external: boolean;
  noIcon: boolean;
}) {
  const Icon = external ? ArrowUpRight : ArrowRight;
  return (
    <>
      {variant === "primary" && (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/55 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full"
        />
      )}
      <span className="relative z-10">{children}</span>
      {!noIcon && (
        <Icon
          size={16}
          className="relative z-10 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-px"
        />
      )}
    </>
  );
}

export default function CTAButton({
  href,
  children,
  variant = "primary",
  external = false,
  className = "",
  noIcon = false,
}: CTAButtonProps) {
  const cls = `${base} ${variants[variant]} ${className}`.trim();

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        <Inner variant={variant} external noIcon={noIcon}>
          {children}
        </Inner>
      </a>
    );
  }

  return (
    <Link href={href} className={cls}>
      <Inner variant={variant} external={false} noIcon={noIcon}>
        {children}
      </Inner>
    </Link>
  );
}
