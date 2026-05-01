"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";

const STATUS_OPTIONS = [
  { value: "all", label: "All" },
  { value: "pending", label: "Pending" },
  { value: "confirmed", label: "Confirmed" },
  { value: "waitlist", label: "Waitlist" },
  { value: "cancelled", label: "Cancelled" },
];

export default function ReservationsPage() {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedSession, setExpandedSession] = useState(null);
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedReservations, setSelectedReservations] = useState([]);
  const [bulkAction, setBulkAction] = useState("");
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    fetchSessionsWithReservations();
  }, [statusFilter]);

  async function fetchSessionsWithReservations() {
    setLoading(true);
    const supabase = createClient();

    // Fetch all active sessions
    const { data: sessionsData } = await supabase
      .from("sessions")
      .select("*")
      .eq("is_active", true)
      .order("day_of_week", { ascending: true });

    // Fetch reservations with filter
    let reservationsQuery = supabase
      .from("reservations")
      .select("*")
      .order("created_at", { ascending: false });

    if (statusFilter !== "all") {
      reservationsQuery = reservationsQuery.eq("status", statusFilter);
    }

    const { data: reservationsData } = await reservationsQuery;

    // Group reservations by session
    const sessionsWithReservations = (sessionsData || []).map((session) => {
      const sessionReservations = (reservationsData || []).filter(
        (r) => r.session_id === session.id
      );
      const confirmedCount = sessionReservations
        .filter((r) => r.status === "confirmed")
        .reduce((acc, r) => acc + (r.num_players || 1), 0);
      const pendingCount = sessionReservations.filter((r) => r.status === "pending").length;

      return {
        ...session,
        reservations: sessionReservations,
        confirmedCount,
        pendingCount,
        totalReservations: sessionReservations.length,
      };
    });

    // Sort by pending count (most pending first)
    sessionsWithReservations.sort((a, b) => b.pendingCount - a.pendingCount);

    setSessions(sessionsWithReservations);
    setLoading(false);
  }

  function toggleSession(sessionId) {
    setExpandedSession(expandedSession === sessionId ? null : sessionId);
    setSelectedReservations([]);
  }

  function toggleReservationSelection(reservationId) {
    setSelectedReservations((prev) =>
      prev.includes(reservationId)
        ? prev.filter((id) => id !== reservationId)
        : [...prev, reservationId]
    );
  }

  function selectAllInSession(sessionReservations) {
    const ids = sessionReservations.map((r) => r.id);
    const allSelected = ids.every((id) => selectedReservations.includes(id));
    if (allSelected) {
      setSelectedReservations((prev) => prev.filter((id) => !ids.includes(id)));
    } else {
      setSelectedReservations((prev) => [...new Set([...prev, ...ids])]);
    }
  }

  async function handleBulkAction() {
    if (!bulkAction || selectedReservations.length === 0) return;

    setProcessing(true);
    const supabase = createClient();

    if (bulkAction === "delete") {
      await supabase.from("reservations").delete().in("id", selectedReservations);
    } else {
      await supabase
        .from("reservations")
        .update({ status: bulkAction, updated_at: new Date().toISOString() })
        .in("id", selectedReservations);
    }

    setSelectedReservations([]);
    setBulkAction("");
    setProcessing(false);
    fetchSessionsWithReservations();
  }

  async function updateSingleReservation(id, status) {
    const supabase = createClient();
    await supabase
      .from("reservations")
      .update({ status, updated_at: new Date().toISOString() })
      .eq("id", id);
    fetchSessionsWithReservations();
  }

  async function deleteSingleReservation(id) {
    if (!confirm("Are you sure you want to delete this reservation?")) return;
    const supabase = createClient();
    await supabase.from("reservations").delete().eq("id", id);
    fetchSessionsWithReservations();
  }

  const formatTime = (time) => {
    if (!time) return "";
    const [h, m] = time.split(":");
    const hour = parseInt(h);
    const ampm = hour >= 12 ? "PM" : "AM";
    const hour12 = hour % 12 || 12;
    return `${hour12}:${m} ${ampm}`;
  };

  const statusBadge = (status) => {
    const styles = {
      pending: "bg-amber-100 text-amber-800",
      confirmed: "bg-emerald-100 text-emerald-800",
      waitlist: "bg-sky-100 text-sky-800",
      cancelled: "bg-red-100 text-red-800",
    };
    return `inline-flex rounded-full px-2 py-0.5 text-xs font-semibold capitalize ${styles[status] || "bg-gray-100 text-gray-800"}`;
  };

  const totalPending = sessions.reduce((acc, s) => acc + s.pendingCount, 0);
  const totalConfirmed = sessions.reduce((acc, s) => acc + s.confirmedCount, 0);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Reservations</h1>
          <p className="text-gray-500">
            {totalPending} pending · {totalConfirmed} confirmed players
          </p>
        </div>

        <div className="flex items-center gap-3">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
          >
            {STATUS_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Bulk Actions Bar */}
      {selectedReservations.length > 0 && (
        <div className="bg-teal-50 border border-teal-200 rounded-lg px-4 py-3 flex flex-wrap items-center gap-3">
          <span className="text-sm font-medium text-teal-800">
            {selectedReservations.length} selected
          </span>
          <select
            value={bulkAction}
            onChange={(e) => setBulkAction(e.target.value)}
            className="px-3 py-1.5 border border-teal-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-teal-500"
          >
            <option value="">Select action...</option>
            <option value="confirmed">Confirm All</option>
            <option value="waitlist">Move to Waitlist</option>
            <option value="cancelled">Cancel All</option>
            <option value="delete">Delete All</option>
          </select>
          <button
            onClick={handleBulkAction}
            disabled={!bulkAction || processing}
            className="px-4 py-1.5 bg-teal-600 text-white text-sm font-medium rounded-lg hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {processing ? "Processing..." : "Apply"}
          </button>
          <button
            onClick={() => setSelectedReservations([])}
            className="px-4 py-1.5 text-teal-700 text-sm font-medium hover:underline"
          >
            Clear selection
          </button>
        </div>
      )}

      {/* Sessions Grid */}
      <div className="grid gap-4">
        {sessions.map((session) => (
          <div
            key={session.id}
            className="bg-white rounded-xl border border-gray-200 overflow-hidden"
          >
            {/* Session Header - Clickable */}
            <button
              type="button"
              onClick={() => toggleSession(session.id)}
              className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors text-left"
            >
              <div className="flex items-center gap-4">
                <div
                  className={`w-12 h-12 rounded-lg flex items-center justify-center text-white font-bold ${
                    session.pendingCount > 0 ? "bg-amber-500" : "bg-teal-500"
                  }`}
                >
                  {session.totalReservations}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{session.name}</h3>
                  <p className="text-sm text-gray-500">
                    {session.day_of_week} · {formatTime(session.start_time)} -{" "}
                    {formatTime(session.end_time)} · {session.court}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-medium text-gray-900">
                    {session.confirmedCount} / {session.max_players || 12} players
                  </p>
                  {session.pendingCount > 0 && (
                    <p className="text-xs text-amber-600">
                      {session.pendingCount} pending
                    </p>
                  )}
                </div>
                <svg
                  className={`w-5 h-5 text-gray-400 transition-transform ${
                    expandedSession === session.id ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </button>

            {/* Expanded Reservations List */}
            {expandedSession === session.id && (
              <div className="border-t border-gray-200">
                {session.reservations.length > 0 ? (
                  <>
                    {/* Select All Header */}
                    <div className="px-6 py-3 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
                      <label className="flex items-center gap-2 text-sm">
                        <input
                          type="checkbox"
                          checked={session.reservations.every((r) =>
                            selectedReservations.includes(r.id)
                          )}
                          onChange={() => selectAllInSession(session.reservations)}
                          className="w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
                        />
                        <span className="font-medium text-gray-700">
                          Select all ({session.reservations.length})
                        </span>
                      </label>
                      <span className="text-xs text-gray-500">
                        {session.skill_level} · {session.availability}
                      </span>
                    </div>

                    {/* Reservations List */}
                    <div className="divide-y divide-gray-100">
                      {session.reservations.map((reservation) => (
                        <div
                          key={reservation.id}
                          className={`px-6 py-4 flex items-center gap-4 ${
                            selectedReservations.includes(reservation.id)
                              ? "bg-teal-50"
                              : ""
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={selectedReservations.includes(reservation.id)}
                            onChange={() => toggleReservationSelection(reservation.id)}
                            className="w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
                          />

                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <p className="font-medium text-gray-900 truncate">
                                {reservation.full_name}
                              </p>
                              <span className={statusBadge(reservation.status)}>
                                {reservation.status}
                              </span>
                            </div>
                            <p className="text-sm text-gray-500 truncate">
                              {reservation.email}
                              {reservation.phone && ` · ${reservation.phone}`}
                            </p>
                            <p className="text-xs text-gray-400 mt-1">
                              {reservation.num_players} player
                              {reservation.num_players !== 1 ? "s" : ""}
                              {reservation.reservation_date &&
                                ` · ${new Date(reservation.reservation_date).toLocaleDateString()}`}
                              {reservation.notes && ` · "${reservation.notes}"`}
                            </p>
                          </div>

                          <div className="flex items-center gap-2 shrink-0">
                            {reservation.status !== "confirmed" && (
                              <button
                                onClick={() =>
                                  updateSingleReservation(reservation.id, "confirmed")
                                }
                                className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded-lg"
                                title="Confirm"
                              >
                                <svg
                                  className="w-5 h-5"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M5 13l4 4L19 7"
                                  />
                                </svg>
                              </button>
                            )}
                            {reservation.status !== "waitlist" && (
                              <button
                                onClick={() =>
                                  updateSingleReservation(reservation.id, "waitlist")
                                }
                                className="p-1.5 text-sky-600 hover:bg-sky-50 rounded-lg"
                                title="Waitlist"
                              >
                                <svg
                                  className="w-5 h-5"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                  />
                                </svg>
                              </button>
                            )}
                            {reservation.status !== "cancelled" && (
                              <button
                                onClick={() =>
                                  updateSingleReservation(reservation.id, "cancelled")
                                }
                                className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg"
                                title="Cancel"
                              >
                                <svg
                                  className="w-5 h-5"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                  />
                                </svg>
                              </button>
                            )}
                            <button
                              onClick={() => deleteSingleReservation(reservation.id)}
                              className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg"
                              title="Delete"
                            >
                              <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                />
                              </svg>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="px-6 py-8 text-center text-gray-500">
                    No reservations for this session
                  </div>
                )}
              </div>
            )}
          </div>
        ))}

        {sessions.length === 0 && (
          <div className="bg-white rounded-xl border border-gray-200 px-6 py-12 text-center">
            <p className="text-gray-500">No sessions found</p>
          </div>
        )}
      </div>
    </div>
  );
}
