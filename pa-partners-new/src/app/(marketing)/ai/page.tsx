export const metadata = {
  title: "AI Solutions",
  description:
    "Practical AI agent solutions for standard business problems.",
};

export default function AIPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
      <div className="surface rounded-xl p-6 md:p-8 text-center shadow-elevated">
        <Notice />
      </div>
    </div>
  );
}

function Notice() {
  const RedirectNotice = require("@/components/common/RedirectNotice").default;
  return (
    <RedirectNotice
      message="Our AI Solutions page is under construction. We’ll take you back to where you were."
      delayMs={6000}
      backFirst
      fallbackHref="/"
    />
  );
}
