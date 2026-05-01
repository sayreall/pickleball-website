"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");

    const supabase = createClient();

    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);

    if (error) {
      setMessage(error.message);
      return;
    }

    router.push("/admin");
  };

  return (
    <div className="bg-off-white pt-32 pb-24">
      <div className="mx-auto w-full max-w-lg px-6">
        <div className="rounded-3xl border border-navy/10 bg-white p-8 shadow-[0_20px_50px_rgba(10,22,40,0.12)]">
          <div className="text-center">
            <span className="inline-flex items-center rounded-full bg-lime/20 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-lime">
              Admin Access
            </span>
            <h1 className="mt-4 text-3xl font-display tracking-wider text-navy sm:text-4xl">
              Head Admin Login
            </h1>
            <p className="mt-3 text-sm text-muted">
              Sign in with your admin email to manage the DeucePB website.
            </p>
          </div>

          <form className="mt-8 grid gap-5" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-semibold text-navy">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="w-full rounded-xl border border-navy/20 bg-white px-4 py-3 text-navy focus:outline-none focus:ring-2 focus:ring-lime"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-semibold text-navy">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="w-full rounded-xl border border-navy/20 bg-white px-4 py-3 text-navy focus:outline-none focus:ring-2 focus:ring-lime"
              />
            </div>
            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-full bg-lime px-6 py-3 text-sm font-semibold text-navy shadow-[0_10px_24px_rgba(191,255,0,0.35)] transition hover:-translate-y-0.5"
              disabled={loading}
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>
            {message ? (
              <div className="rounded-xl bg-red/10 px-4 py-3 text-sm text-red" role="alert">
                {message}
              </div>
            ) : null}
          </form>
        </div>
      </div>
    </div>
  );
}
