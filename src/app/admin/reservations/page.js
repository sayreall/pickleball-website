import { createClient } from "@/lib/supabase/server";
import ReservationActions from "@/components/admin/ReservationActions";

export const dynamic = "force-dynamic";

const statusStyles = {
  pending: "bg-amber-100 text-amber-800",
  confirmed: "bg-emerald-100 text-emerald-800",
  cancelled: "bg-red-100 text-red-800",
  waitlist: "bg-sky-100 text-sky-800",
};

function formatTime(timeStr) {
  if (!timeStr) return "";
  const [h, m] = timeStr.split(":");
  const hour = parseInt(h);
  const ampm = hour >= 12 ? "PM" : "AM";
  return `${hour % 12 || 12}:${m} ${ampm}`;
}

export default async function AdminReservationsPage({ searchParams }) {
  const params = await searchParams;
  const statusFilter = params?.status || "all";

  const supabase = await createClient();

  let query = supabase
    .from("reservations")
    .select("*, sessions(name, day_of_week, start_time, end_time, court, skill_level)")
    .order("created_at", { ascending: false });

  if (statusFilter !== "all") {
    query = query.eq("status", statusFilter);
  }

  const { data: reservations } = await query;

  const counts = {
    all: 0,
    pending: 0,
    confirmed: 0,
    cancelled: 0,
    waitlist: 0,
  };

  const { data: allReservations } = await supabase
    .from("reservations")
    .select("status");

  (allReservations || []).forEach((r) => {
    counts.all++;
    if (counts[r.status] !== undefined) counts[r.status]++;
  });

  const tabs = [
    { key: "all", label: "All" },
    { key: "pending", label: "Pending" },
    { key: "confirmed", label: "Confirmed" },
    { key: "waitlist", label: "Waitlist" },
    { key: "cancelled", label: "Cancelled" },
  ];

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Reservations</h1>
        <p className="mt-1 text-sm text-gray-500">
          Review and manage slot reservations submitted from the public schedule.
        </p>
      </div>

      <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-5">
        {tabs.map((tab) => {
          const isActive = statusFilter === tab.key;
          return (
            <a
              key={tab.key}
              href={tab.key === "all" ? "/admin/reservations" : `/admin/reservations?status=${tab.key}`}
              className={`rounded-lg border px-4 py-3 text-center transition ${
                isActive
                  ? "border-teal-500 bg-teal-50 text-teal-900"
                  : "border-gray-200 bg-white text-gray-700 hover:border-gray-300"
              }`}
            >
              <div className="text-2xl font-bold">{counts[tab.key]}</div>
              <div className="text-xs font-medium uppercase tracking-wide">{tab.label}</div>
            </a>
          );
        })}
      </div>

      <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
        {!reservations || reservations.length === 0 ? (
          <div className="px-6 py-16 text-center">
            <p className="text-gray-500">No reservations found.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 text-xs uppercase tracking-wider text-gray-500">
                <tr>
                  <th className="px-4 py-3">Submitted</th>
                  <th className="px-4 py-3">Guest</th>
                  <th className="px-4 py-3">Session</th>
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3 text-center">Players</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {reservations.map((r) => (
                  <tr key={r.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-gray-500 whitespace-nowrap">
                      {new Date(r.created_at).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                      <div className="text-xs text-gray-400">
                        {new Date(r.created_at).toLocaleTimeString("en-US", {
                          hour: "numeric",
                          minute: "2-digit",
                        })}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="font-medium text-gray-900">{r.full_name}</div>
                      <div className="text-xs text-gray-500">{r.email}</div>
                      {r.phone && <div className="text-xs text-gray-500">{r.phone}</div>}
                      {r.notes && (
                        <div className="mt-1 max-w-xs text-xs italic text-gray-500">
                          &ldquo;{r.notes}&rdquo;
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      {r.sessions ? (
                        <>
                          <div className="font-medium text-gray-900">{r.sessions.name}</div>
                          <div className="text-xs text-gray-500">
                            {r.sessions.day_of_week} &middot;{" "}
                            {formatTime(r.sessions.start_time)} -{" "}
                            {formatTime(r.sessions.end_time)}
                          </div>
                          <div className="text-xs text-gray-500">
                            {r.sessions.court} &middot; {r.sessions.skill_level}
                          </div>
                        </>
                      ) : (
                        <span className="text-gray-400">Session deleted</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-gray-700 whitespace-nowrap">
                      {r.reservation_date
                        ? new Date(r.reservation_date).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })
                        : "-"}
                    </td>
                    <td className="px-4 py-3 text-center text-gray-700">{r.num_players}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize ${
                          statusStyles[r.status] || "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {r.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <ReservationActions reservation={r} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
