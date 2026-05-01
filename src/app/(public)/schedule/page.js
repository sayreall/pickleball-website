"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

const tabs = ["All", "Beginner", "Intermediate", "Advanced", "Open"];

const levelStyles = {
  Beginner: "bg-lime/20 text-[#5a7a1f]",
  Intermediate: "bg-sky/20 text-[#1c5a8f]",
  Advanced: "bg-red/20 text-[#b02a2f]",
  Open: "bg-purple/20 text-[#5234c2]",
};

const availabilityStyles = {
  Open: "bg-emerald-500",
  Limited: "bg-amber-500",
  Waitlist: "bg-red-500",
  Full: "bg-red-500",
};

const dayOrder = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

export default function SchedulePage() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSessions() {
      const supabase = createClient();
      const { data } = await supabase
        .from("sessions")
        .select("*")
        .eq("is_active", true)
        .order("start_time", { ascending: true });

      // Sort by day of week
      const sorted = (data || []).sort((a, b) => {
        return dayOrder.indexOf(a.day_of_week) - dayOrder.indexOf(b.day_of_week);
      });
      
      setSessions(sorted);
      setLoading(false);
    }
    fetchSessions();
  }, []);

  const formatTime = (timeStr) => {
    if (!timeStr) return "";
    const [hours, minutes] = timeStr.split(":");
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? "PM" : "AM";
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minutes} ${ampm}`;
  };

  const primaryButton =
    "inline-flex items-center justify-center rounded-full bg-lime px-6 py-3 text-sm font-semibold text-navy shadow-[0_10px_24px_rgba(191,255,0,0.35)] transition hover:-translate-y-0.5";
  const smallButton =
    "inline-flex items-center justify-center rounded-full bg-lime px-4 py-2 text-sm font-semibold text-navy";
  const smallButtonOutline =
    "inline-flex items-center justify-center rounded-full border border-navy/30 px-4 py-2 text-sm font-semibold text-navy";

  const filteredSessions =
    activeFilter === "All"
      ? sessions
      : sessions.filter((session) => session.skill_level === activeFilter);

  return (
    <div className="bg-off-white pt-32 pb-24">
      <div className="mx-auto w-full max-w-6xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center rounded-full bg-lime/20 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-lime">
            Weekly Schedule
          </span>
          <h1 className="mt-4 text-4xl font-display tracking-wider text-navy sm:text-5xl">Find Your Game</h1>
          <p className="mt-4 text-muted">Filter sessions by level and reserve your spot in seconds.</p>
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {tabs.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveFilter(tab)}
              className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                activeFilter === tab
                  ? "border-navy bg-navy text-white"
                  : "border-navy/20 bg-white text-navy hover:-translate-y-0.5"
              }`}
            >
              {tab === "All" ? "All Sessions" : tab}
            </button>
          ))}
        </div>

        <div className="mt-8 overflow-x-auto rounded-2xl bg-white shadow-[0_12px_30px_rgba(10,22,40,0.08)]">
          {loading ? (
            <div className="py-12 text-center text-muted">Loading sessions...</div>
          ) : (
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead className="bg-[#f3f5ee] text-navy">
                <tr>
                  <th className="px-6 py-4 font-semibold">Day</th>
                  <th className="px-6 py-4 font-semibold">Time</th>
                  <th className="px-6 py-4 font-semibold">Session</th>
                  <th className="px-6 py-4 font-semibold">Level</th>
                  <th className="px-6 py-4 font-semibold">Court</th>
                  <th className="px-6 py-4 font-semibold">Availability</th>
                  <th className="px-6 py-4 font-semibold"></th>
                </tr>
              </thead>
              <tbody>
                {filteredSessions.length > 0 ? (
                  filteredSessions.map((session) => (
                    <tr key={session.id} className="border-t border-[#e3e5df]">
                      <td className="px-6 py-4 font-medium text-navy">{session.day_of_week}</td>
                      <td className="px-6 py-4 text-navy/80">
                        {formatTime(session.start_time)} - {formatTime(session.end_time)}
                      </td>
                      <td className="px-6 py-4 text-navy">{session.name}</td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide ${
                            levelStyles[session.skill_level] || "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {session.skill_level}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-navy/80">{session.court}</td>
                      <td className="px-6 py-4">
                        <span className="flex items-center gap-2 text-navy">
                          <span className={`h-2.5 w-2.5 rounded-full ${availabilityStyles[session.availability] || "bg-gray-400"}`} />
                          {session.availability}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <Link
                          href="/join"
                          className={session.availability === "Full" || session.availability === "Waitlist" ? smallButtonOutline : smallButton}
                        >
                          {session.availability === "Full" || session.availability === "Waitlist" ? "Join Waitlist" : "Reserve"}
                        </Link>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="px-6 py-12 text-center text-muted">
                      No sessions found for this filter.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>

        <div className="mt-6 flex justify-center">
          <Link className={primaryButton} href="/join">
            Join to Reserve Spots
          </Link>
        </div>
      </div>
    </div>
  );
}
