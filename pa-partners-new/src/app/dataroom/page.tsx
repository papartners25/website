import Link from "next/link";
import { ArrowLeft, FileLock2, Mail, ShieldCheck } from "lucide-react";
import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import { createClient } from "@/lib/supabase/server";

export const metadata = {
  title: "Private Portal",
  description: "Authenticated access for approved PA Partners investors and partners.",
};

export default async function DataroomPage() {
  const supabase = await createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    return (
      <Section>
        <Container>
          <div className="mx-auto max-w-2xl py-12 md:py-20">
            <div className="surface rounded-2xl p-8 text-center shadow-card md:p-12">
              <FileLock2 size={36} className="mx-auto text-amber-300" />
              <h1 className="mt-5 text-2xl font-semibold text-white md:text-3xl">Private Portal Access</h1>
              <p className="mb-6 mt-3 leading-relaxed text-slate-300">
                Approved investors and partners can log in for portal materials, reporting, and private
                communications when access is active.
              </p>
              <Link
                href="/login?next=/dataroom"
                className="inline-flex items-center justify-center rounded-lg bg-white px-6 py-3 text-sm font-medium text-slate-950 transition-colors hover:bg-slate-100"
              >
                Login to Continue
              </Link>
            </div>
          </div>
        </Container>
      </Section>
    );
  }

  return (
    <Section>
      <Container>
        <div className="surface mb-8 rounded-xl p-6 shadow-card md:p-7">
          <Link
            href="/dashboard"
            className="mb-3 inline-flex items-center gap-2 text-sm text-slate-400 transition-colors hover:text-white"
          >
            <ArrowLeft size={16} />
            Back to Dashboard
          </Link>
          <h1 className="text-2xl font-semibold text-white">Private Portal</h1>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-300">
            No active deal room is currently open. PA Partners uses this portal for approved investor
            communications, confidential materials, reporting, and document access when a mandate or
            opportunity is active.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <article className="surface rounded-xl p-6">
            <ShieldCheck size={24} className="text-amber-300" />
            <h2 className="mt-4 font-medium text-white">Access Controlled</h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-300">
              Materials are shared only with approved users when a specific engagement, investment, or
              reporting workflow is active.
            </p>
          </article>
          <article className="surface rounded-xl p-6">
            <FileLock2 size={24} className="text-amber-300" />
            <h2 className="mt-4 font-medium text-white">Document Ready</h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-300">
              The portal architecture remains in place for future private files, investor statements, tax
              documents, and partner updates.
            </p>
          </article>
          <article className="surface rounded-xl p-6">
            <Mail size={24} className="text-amber-300" />
            <h2 className="mt-4 font-medium text-white">Need Materials?</h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-300">
              Contact PA Partners if you believe you should have access to a current private workspace.
            </p>
            <Link href="/contact" className="mt-4 inline-flex text-sm font-medium text-white hover:text-amber-200">
              Contact us →
            </Link>
          </article>
        </div>
      </Container>
    </Section>
  );
}
