"use client";
import * as RHF from "react-hook-form";
import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";

type FormInputs = {
  name: string;
  email: string;
  message: string;
};

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    reset,
  } = RHF.useForm<FormInputs>();

  const onSubmit = async (data: FormInputs) => {
    try {
      const body = new URLSearchParams({
        "form-name": "contact",
        ...data,
      }).toString();
      await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body,
      });
      reset();
    } catch (e) {
      // no-op for demo
    }
  };

  return (
    <Section>
      <Container>
        <h2 className="text-2xl md:text-3xl font-medium text-white text-center">Contact</h2>
        <form
          name="contact"
          data-netlify="true"
          data-netlify-honeypot="bot-field"
          className="mt-6 grid gap-4 max-w-xl mx-auto surface rounded-xl p-5"
          onSubmit={handleSubmit(onSubmit)}
        >
          <input type="hidden" name="form-name" value="contact" />
          <p className="hidden">
            <label>
              Don’t fill this out if you’re human: <input name="bot-field" />
            </label>
          </p>
          <div>
            <label className="block text-sm text-slate-300">Name</label>
            <input
              className="mt-1 w-full rounded-lg border border-white/10 bg-white/5 text-white placeholder:text-slate-400 px-3 py-2"
              placeholder="Your name"
              {...register("name", { required: true })}
            />
            {errors.name && (
              <p className="text-xs text-red-600 mt-1">Name is required.</p>
            )}
          </div>
          <div>
            <label className="block text-sm text-slate-300">Email</label>
            <input
              type="email"
              className="mt-1 w-full rounded-lg border border-white/10 bg-white/5 text-white placeholder:text-slate-400 px-3 py-2"
              placeholder="you@example.com"
              {...register("email", { required: true })}
            />
            {errors.email && (
              <p className="text-xs text-red-600 mt-1">Email is required.</p>
            )}
          </div>
          <div>
            <label className="block text-sm text-slate-300">Message</label>
            <textarea
              className="mt-1 w-full rounded-lg border border-white/10 bg-white/5 text-white placeholder:text-slate-400 px-3 py-2"
              rows={5}
              placeholder="How can we help?"
              {...register("message", { required: true })}
            />
            {errors.message && (
              <p className="text-xs text-red-600 mt-1">Message is required.</p>
            )}
          </div>
          <div className="flex items-center justify-center">
            <button
              disabled={isSubmitting}
              className="inline-flex items-center justify-center rounded-lg bg-white text-slate-900 px-4 py-2 text-sm hover:bg-slate-100 disabled:opacity-60"
            >
              {isSubmitting ? "Sending..." : "Send"}
            </button>
          </div>
          {isSubmitSuccessful && (
            <p className="text-sm text-green-400 text-center">Thanks! We’ll be in touch.</p>
          )}
        </form>
      </Container>
    </Section>
  );
}
