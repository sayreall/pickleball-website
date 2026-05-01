"use client";

import { useState } from "react";
import Link from "next/link";

const tabs = ["All", "Beginner", "Intermediate", "Advanced"];

const sessions = [
  {
    day: "Monday",
    time: "6:00-8:00 AM",
    name: "Morning Open Play",
    level: "Beginner",
    court: "Courts 1-3",
    availability: "Open",
    status: "open",
    action: "Reserve",
  },
  {
    day: "Monday",
    time: "7:00-9:00 PM",
    name: "Evening Intermediate",
    level: "Intermediate",
    court: "Courts 4-6",
    availability: "Limited",
    status: "limited",
    action: "Reserve",
  },
  {
    day: "Tuesday",
    time: "6:30-8:30 AM",
    name: "Beginner Foundations",
    level: "Beginner",
    court: "Courts 1-2",
    availability: "Open",
    status: "open",
    action: "Reserve",
  },
  {
    day: "Wednesday",
    time: "7:00-9:00 PM",
    name: "Competitive Ladder",
    level: "Advanced",
    court: "Court 6",
    availability: "Waitlist",
    status: "full",
    action: "Join Waitlist",
  },
  {
    day: "Thursday",
    time: "7:00-9:00 PM",
    name: "Intermediate Rally",
    level: "Intermediate",
    court: "Courts 3-5",
    availability: "Limited",
    status: "limited",
    action: "Reserve",
  },
  {
    day: "Friday",
    time: "6:00-9:00 PM",
    name: "Friday Social Night",
    level: "Open",
    court: "All Courts",
    availability: "Limited",
    status: "limited",
    action: "Reserve",
  },
  {
    day: "Saturday",
    time: "7:00-11:00 AM",
    name: "Weekend Open Play",
    level: "Open",
    court: "Courts 1-5",
    availability: "Open",
    status: "open",
    action: "Reserve",
  },
  {
    day: "Sunday",
    time: "4:00-6:00 PM",
    name: "Advanced Drills",
    level: "Advanced",
    court: "Courts 5-6",
    availability: "Open",
    status: "open",
    action: "Reserve",
  },
];

const levelStyles = {
  Beginner: "bg-lime/20 text-[#5a7a1f]",
  Intermediate: "bg-sky/20 text-[#1c5a8f]",
  Advanced: "bg-red/20 text-[#b02a2f]",
  Open: "bg-purple/20 text-[#5234c2]",
};

const availabilityStyles = {
  open: "bg-emerald-500",
  limited: "bg-amber-500",
  full: "bg-red-500",
};

export default function SchedulePage() {
  const [activeFilter, setActiveFilter] = useState("All");

  const primaryButton =
    "inline-flex items-center justify-center rounded-full bg-lime px-6 py-3 text-sm font-semibold text-navy shadow-[0_10px_24px_rgba(191,255,0,0.35)] transition hover:-translate-y-0.5";
  const smallButton =
    "inline-flex items-center justify-center rounded-full bg-lime px-4 py-2 text-sm font-semibold text-navy";
  const smallButtonOutline =
    "inline-flex items-center justify-center rounded-full border border-navy/30 px-4 py-2 text-sm font-semibold text-navy";

  const filteredSessions =
    activeFilter === "All"
      ? sessions
      : sessions.filter((session) => session.level === activeFilter);

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
              {filteredSessions.map((session) => (
                <tr key={`${session.day}-${session.time}`} className="border-t border-[#e3e5df]">
                  <td className="px-6 py-4 font-medium text-navy">{session.day}</td>
                  <td className="px-6 py-4 text-navy/80">{session.time}</td>
                  <td className="px-6 py-4 text-navy">{session.name}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide ${
                        levelStyles[session.level]
                      }`}
                    >
                      {session.level}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-navy/80">{session.court}</td>
                  <td className="px-6 py-4">
                    <span className="flex items-center gap-2 text-navy">
                      <span className={`h-2.5 w-2.5 rounded-full ${availabilityStyles[session.status]}`} />
                      {session.availability}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      type="button"
                      className={session.status === "full" ? smallButtonOutline : smallButton}
                    >
                      {session.action}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
