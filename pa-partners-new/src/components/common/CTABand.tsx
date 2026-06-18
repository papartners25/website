import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import CTAButton from "@/components/common/CTAButton";

type CTABandProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel?: string;
  secondaryHref?: string;
};

export default function CTABand({
  eyebrow,
  title,
  description,
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
}: CTABandProps) {
  return (
    <Section>
      <Container>
        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-8 backdrop-blur-sm md:p-10">
          {/* Ambient gold wash + hairline top accent. */}
          <div
            aria-hidden
            className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-amber-400/10 blur-3xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-300/50 to-transparent"
          />
          <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="max-w-2xl">
              {eyebrow && (
                <p className="text-xs font-medium uppercase tracking-[0.24em] text-amber-300">
                  {eyebrow}
                </p>
              )}
              <h2 className="mt-2 text-2xl font-medium tracking-tight text-white md:text-3xl">
                {title}
              </h2>
              {description && (
                <p className="mt-3 text-sm leading-relaxed text-slate-300 md:text-base">
                  {description}
                </p>
              )}
            </div>
            <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
              <CTAButton href={primaryHref} variant="primary">
                {primaryLabel}
              </CTAButton>
              {secondaryLabel && secondaryHref && (
                <CTAButton href={secondaryHref} variant="secondary">
                  {secondaryLabel}
                </CTAButton>
              )}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
