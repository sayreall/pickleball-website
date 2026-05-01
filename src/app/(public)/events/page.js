import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export default async function EventsPage() {
  const supabase = await createClient();
  
  const { data: events } = await supabase
    .from("events")
    .select("*")
    .eq("is_active", true)
    .gte("event_date", new Date().toISOString().split("T")[0])
    .order("event_date", { ascending: true });

  const smallButton =
    "inline-flex items-center justify-center rounded-full bg-lime px-4 py-2 text-sm font-semibold text-navy";

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return {
      month: date.toLocaleDateString("en-US", { month: "short" }),
      day: date.getDate().toString().padStart(2, "0"),
    };
  };

  const formatTime = (startTime, endTime) => {
    const formatTimeStr = (timeStr) => {
      if (!timeStr) return "";
      const [hours, minutes] = timeStr.split(":");
      const hour = parseInt(hours);
      const ampm = hour >= 12 ? "PM" : "AM";
      const hour12 = hour % 12 || 12;
      return `${hour12}:${minutes} ${ampm}`;
    };
    return `${formatTimeStr(startTime)} - ${formatTimeStr(endTime)}`;
  };

  return (
    <div className="bg-[#eef1ea] pt-32 pb-24">
      <div className="mx-auto w-full max-w-6xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center rounded-full bg-lime/20 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-lime">
            Upcoming Events
          </span>
          <h1 className="mt-4 text-4xl font-display tracking-wider text-navy sm:text-5xl">Don&apos;t Miss Out</h1>
          <p className="mt-4 text-muted">Reserve your spot early for our biggest club moments.</p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {events && events.length > 0 ? (
            events.map((event) => {
              const { month, day } = formatDate(event.event_date);
              return (
                <article
                  key={event.id}
                  className="relative grid gap-3 rounded-2xl bg-white p-6 shadow-[0_12px_30px_rgba(10,22,40,0.08)]"
                >
                  <div className="flex h-16 w-16 flex-col items-center justify-center rounded-xl bg-navy text-white">
                    <span className="text-xs font-semibold uppercase tracking-widest text-lime">{month}</span>
                    <span className="text-2xl font-display">{day}</span>
                  </div>
                  {event.urgency_text && (
                    <span className="absolute right-5 top-5 rounded-full bg-red/15 px-3 py-1 text-xs font-semibold text-[#b02a2f]">
                      {event.urgency_text}
                    </span>
                  )}
                  <h3 className="text-xl font-semibold text-navy">{event.title}</h3>
                  <p className="text-sm text-muted">{formatTime(event.start_time, event.end_time)}</p>
                  <p className="text-sm text-muted">{event.location}</p>
                  {event.description && (
                    <p className="text-sm text-muted line-clamp-2">{event.description}</p>
                  )}
                  <Link className={smallButton} href="/join">
                    {event.action_text || "Register"}
                  </Link>
                </article>
              );
            })
          ) : (
            <div className="lg:col-span-3 text-center py-12">
              <p className="text-muted text-lg">No upcoming events at the moment.</p>
              <p className="text-muted text-sm mt-2">Check back soon for new events!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
