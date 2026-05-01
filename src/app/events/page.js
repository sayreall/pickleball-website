import Link from "next/link";

const events = [
  {
    month: "Jun",
    day: "07",
    title: "Summer Slam Tournament",
    time: "8:00 AM - 6:00 PM",
    location: "All 6 Courts",
    urgency: "4 Spots Left",
    action: "Register",
  },
  {
    month: "Jun",
    day: "14",
    title: "Beginner Mixer Night",
    time: "6:00 PM - 9:00 PM",
    location: "Courts 1 and 2, Indoor",
    urgency: "Filling Fast",
    action: "Save Spot",
  },
  {
    month: "Jun",
    day: "21",
    title: "Bring a Friend Day",
    time: "9:00 AM - 12:00 PM",
    location: "All Courts, Outdoor",
    urgency: "Members plus one guest free",
    action: "Sign Up",
  },
];

export default function EventsPage() {
  const smallButton =
    "inline-flex items-center justify-center rounded-full bg-lime px-4 py-2 text-sm font-semibold text-navy";

  return (
    <div className="bg-[#eef1ea] pt-32 pb-24">
      <div className="mx-auto w-full max-w-6xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center rounded-full bg-lime/20 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-lime">
            Upcoming Events
          </span>
          <h1 className="mt-4 text-4xl font-display tracking-wider text-navy sm:text-5xl">Don't Miss Out</h1>
          <p className="mt-4 text-muted">Reserve your spot early for our biggest club moments.</p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {events.map((event) => (
            <article
              key={event.title}
              className="relative grid gap-3 rounded-2xl bg-white p-6 shadow-[0_12px_30px_rgba(10,22,40,0.08)]"
            >
              <div className="flex h-16 w-16 flex-col items-center justify-center rounded-xl bg-navy text-white">
                <span className="text-xs font-semibold uppercase tracking-widest text-lime">{event.month}</span>
                <span className="text-2xl font-display">{event.day}</span>
              </div>
              <span className="absolute right-5 top-5 rounded-full bg-red/15 px-3 py-1 text-xs font-semibold text-[#b02a2f]">
                {event.urgency}
              </span>
              <h3 className="text-xl font-semibold text-navy">{event.title}</h3>
              <p className="text-sm text-muted">{event.time}</p>
              <p className="text-sm text-muted">{event.location}</p>
              <Link className={smallButton} href="/join">
                {event.action}
              </Link>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
