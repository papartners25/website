import RedirectNotice from "@/components/common/RedirectNotice";
export const metadata = {
  title: "Real Estate",
  description:
    "Value‑add acquisitions with disciplined underwriting focused on cash‑flowing assets.",
};

export default function RealEstatePage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
      <div className="surface rounded-xl p-6 md:p-8 text-center shadow-elevated">
        <RedirectNotice
          message="The Real Estate page is under construction. You’re being redirected to the data room."
          href="/dataroom"
          delayMs={6000}
        />
      </div>
    </div>
  );
}
