"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

function formatTime(timeStr) {
  if (!timeStr) return "";
  const [h, m] = timeStr.split(":");
  const hour = parseInt(h);
  const ampm = hour >= 12 ? "PM" : "AM";
  const display = hour % 12 || 12;
  return `${display}:${m} ${ampm}`;
}

export default function ReservationModal({ session, onClose }) {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    reservation_date: "",
    num_players: 1,
    notes: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const supabase = createClient();
    const { error: insertError } = await supabase.from("reservations").insert({
      session_id: session.id,
      full_name: formData.full_name,
      email: formData.email,
      phone: formData.phone || null,
      reservation_date: formData.reservation_date || null,
      num_players: parseInt(formData.num_players) || 1,
      notes: formData.notes || null,
    });

    setSubmitting(false);

    if (insertError) {
      setError(insertError.message);
      return;
    }

    setSuccess(true);
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg rounded-2xl bg-off-white text-navy shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          aria-label="Close"
          onClick={onClose}
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-navy/5 text-navy transition hover:bg-navy/10"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        {success ? (
          <div className="px-8 py-12 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-lime/30">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-navy"
              >
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>
            <h2 className="font-display text-3xl tracking-wide">Reservation Sent</h2>
            <p className="mt-3 text-sm text-navy/70 leading-relaxed">
              We&apos;ve received your request for{" "}
              <span className="font-semibold">{session.name}</span>. Our team will reach out
              by email to confirm your slot.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="mt-6 inline-flex items-center justify-center rounded-full bg-navy px-6 py-3 text-sm font-semibold text-off-white transition hover:bg-navy/90"
            >
              Done
            </button>
          </div>
        ) : (
          <>
            <div className="rounded-t-2xl bg-navy px-6 py-5 text-off-white">
              <p className="text-xs uppercase tracking-[0.2em] text-lime">Reserve a Slot</p>
              <h2 className="mt-1 font-display text-2xl tracking-wide">{session.name}</h2>
              <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-off-white/80">
                <span>{session.day_of_week}</span>
                <span>
                  {formatTime(session.start_time)} - {formatTime(session.end_time)}
                </span>
                <span>{session.court}</span>
                <span>{session.skill_level}</span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 px-6 py-6">
              <div>
                <label
                  htmlFor="full_name"
                  className="mb-1 block text-xs font-semibold uppercase tracking-wider text-navy/70"
                >
                  Full Name
                </label>
                <input
                  required
                  type="text"
                  id="full_name"
                  name="full_name"
                  value={formData.full_name}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-navy/20 bg-white px-3 py-2 text-sm focus:border-navy focus:outline-none focus:ring-2 focus:ring-lime/40"
                />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="email"
                    className="mb-1 block text-xs font-semibold uppercase tracking-wider text-navy/70"
                  >
                    Email
                  </label>
                  <input
                    required
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-navy/20 bg-white px-3 py-2 text-sm focus:border-navy focus:outline-none focus:ring-2 focus:ring-lime/40"
                  />
                </div>
                <div>
                  <label
                    htmlFor="phone"
                    className="mb-1 block text-xs font-semibold uppercase tracking-wider text-navy/70"
                  >
                    Phone <span className="text-navy/40">(optional)</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-navy/20 bg-white px-3 py-2 text-sm focus:border-navy focus:outline-none focus:ring-2 focus:ring-lime/40"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="reservation_date"
                    className="mb-1 block text-xs font-semibold uppercase tracking-wider text-navy/70"
                  >
                    Preferred Date
                  </label>
                  <input
                    type="date"
                    id="reservation_date"
                    name="reservation_date"
                    value={formData.reservation_date}
                    onChange={handleChange}
                    min={new Date().toISOString().split("T")[0]}
                    className="w-full rounded-lg border border-navy/20 bg-white px-3 py-2 text-sm focus:border-navy focus:outline-none focus:ring-2 focus:ring-lime/40"
                  />
                </div>
                <div>
                  <label
                    htmlFor="num_players"
                    className="mb-1 block text-xs font-semibold uppercase tracking-wider text-navy/70"
                  >
                    Number of Players
                  </label>
                  <select
                    id="num_players"
                    name="num_players"
                    value={formData.num_players}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-navy/20 bg-white px-3 py-2 text-sm focus:border-navy focus:outline-none focus:ring-2 focus:ring-lime/40"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                      <option key={n} value={n}>
                        {n} {n === 1 ? "player" : "players"}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label
                  htmlFor="notes"
                  className="mb-1 block text-xs font-semibold uppercase tracking-wider text-navy/70"
                >
                  Notes <span className="text-navy/40">(optional)</span>
                </label>
                <textarea
                  id="notes"
                  name="notes"
                  rows={3}
                  value={formData.notes}
                  onChange={handleChange}
                  placeholder="Anything we should know?"
                  className="w-full rounded-lg border border-navy/20 bg-white px-3 py-2 text-sm focus:border-navy focus:outline-none focus:ring-2 focus:ring-lime/40"
                />
              </div>

              {error && (
                <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                  {error}
                </div>
              )}

              <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={onClose}
                  className="inline-flex items-center justify-center rounded-full border border-navy/20 px-6 py-3 text-sm font-semibold text-navy transition hover:bg-navy/5"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex items-center justify-center rounded-full bg-lime px-6 py-3 text-sm font-semibold text-navy shadow-[0_10px_24px_rgba(191,255,0,0.35)] transition hover:bg-lime/90 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {submitting ? "Submitting..." : "Submit Reservation"}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
