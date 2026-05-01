"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function ReservationActions({ reservation }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function updateStatus(status) {
    setBusy(true);
    const supabase = createClient();
    const { error } = await supabase
      .from("reservations")
      .update({ status, updated_at: new Date().toISOString() })
      .eq("id", reservation.id);

    setBusy(false);
    if (error) {
      alert(`Error updating reservation: ${error.message}`);
      return;
    }
    router.refresh();
  }

  async function deleteReservation() {
    if (!confirm("Delete this reservation? This cannot be undone.")) return;
    setBusy(true);
    const supabase = createClient();
    const { error } = await supabase
      .from("reservations")
      .delete()
      .eq("id", reservation.id);

    setBusy(false);
    if (error) {
      alert(`Error deleting reservation: ${error.message}`);
      return;
    }
    router.refresh();
  }

  return (
    <div className="flex items-center justify-end gap-2">
      {reservation.status !== "confirmed" && (
        <button
          type="button"
          disabled={busy}
          onClick={() => updateStatus("confirmed")}
          className="rounded-md bg-emerald-600 px-2.5 py-1 text-xs font-semibold text-white hover:bg-emerald-700 disabled:opacity-50"
        >
          Confirm
        </button>
      )}
      {reservation.status !== "waitlist" && reservation.status !== "confirmed" && (
        <button
          type="button"
          disabled={busy}
          onClick={() => updateStatus("waitlist")}
          className="rounded-md bg-sky-600 px-2.5 py-1 text-xs font-semibold text-white hover:bg-sky-700 disabled:opacity-50"
        >
          Waitlist
        </button>
      )}
      {reservation.status !== "cancelled" && (
        <button
          type="button"
          disabled={busy}
          onClick={() => updateStatus("cancelled")}
          className="rounded-md bg-amber-600 px-2.5 py-1 text-xs font-semibold text-white hover:bg-amber-700 disabled:opacity-50"
        >
          Cancel
        </button>
      )}
      <button
        type="button"
        disabled={busy}
        onClick={deleteReservation}
        className="rounded-md border border-red-300 px-2.5 py-1 text-xs font-semibold text-red-700 hover:bg-red-50 disabled:opacity-50"
      >
        Delete
      </button>
    </div>
  );
}
