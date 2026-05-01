"use client";

import { useState } from "react";

export default function JoinPage() {
  const [submitted, setSubmitted] = useState(false);

  const primaryButton =
    "inline-flex w-full items-center justify-center rounded-full bg-lime px-6 py-3 text-sm font-semibold text-navy shadow-[0_10px_24px_rgba(191,255,0,0.35)] transition hover:-translate-y-0.5";

  return (
    <div className="bg-navy-mid pt-32 pb-24 text-white">
      <div className="mx-auto w-full max-w-4xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center rounded-full bg-lime/20 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-lime">
            Join the Club
          </span>
          <h1 className="mt-4 text-4xl font-display tracking-wider sm:text-5xl">Ready to Play?</h1>
          <p className="mt-4 text-white/70">No payment required to start. We will contact you within 24 hours.</p>
        </div>

        <form
          className="mt-10 grid gap-6 rounded-3xl bg-white/10 p-8"
          onSubmit={(event) => {
            event.preventDefault();
            setSubmitted(true);
            event.currentTarget.reset();
          }}
        >
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label htmlFor="first-name" className="text-sm font-semibold">
                First Name
              </label>
              <input
                id="first-name"
                name="first-name"
                type="text"
                required
                className="w-full rounded-xl border border-white/30 bg-navy/60 px-4 py-3 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-lime"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="last-name" className="text-sm font-semibold">
                Last Name
              </label>
              <input
                id="last-name"
                name="last-name"
                type="text"
                required
                className="w-full rounded-xl border border-white/30 bg-navy/60 px-4 py-3 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-lime"
              />
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-semibold">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="w-full rounded-xl border border-white/30 bg-navy/60 px-4 py-3 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-lime"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="phone" className="text-sm font-semibold">
                Phone Number
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                required
                className="w-full rounded-xl border border-white/30 bg-navy/60 px-4 py-3 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-lime"
              />
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label htmlFor="skill" className="text-sm font-semibold">
                Skill Level
              </label>
              <select
                id="skill"
                name="skill"
                required
                className="w-full rounded-xl border border-white/30 bg-navy/60 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-lime"
              >
                <option value="">Select skill level</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>
            <div className="space-y-2">
              <label htmlFor="plan" className="text-sm font-semibold">
                Plan Selection
              </label>
              <select
                id="plan"
                name="plan"
                required
                className="w-full rounded-xl border border-white/30 bg-navy/60 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-lime"
              >
                <option value="">Select a plan</option>
                <option value="starter">Starter Plan</option>
                <option value="standard">Standard Plan</option>
                <option value="competitive">Competitive Plan</option>
              </select>
            </div>
          </div>
          <button type="submit" className={primaryButton}>
            Join DeucePB - Start Today
          </button>
          <p className="text-sm text-white/70">Cancel anytime. You are in control of your membership.</p>
          {submitted ? (
            <div className="rounded-xl bg-emerald-500/20 px-4 py-3 text-sm text-emerald-100" role="status">
              Thanks for signing up. We will reach out with your next steps.
            </div>
          ) : null}
        </form>
      </div>
    </div>
  );
}
