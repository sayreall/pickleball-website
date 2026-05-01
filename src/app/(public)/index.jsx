import Link from "next/link";

const stats = [
  { value: "480+", label: "Active Members" },
  { value: "32+", label: "Weekly Sessions" },
  { value: "12+", label: "Annual Events" },
  { value: "4+", label: "Skill Levels" },
];

const highlights = [
  {
    title: "Welcome for every level",
    description: "Beginner clinics to competitive ladders. There is always a game for you.",
    href: "/why-join",
    cta: "Why Join",
  },
  {
    title: "Play when it works",
    description: "Morning, evening, and weekend sessions across six courts each week.",
    href: "/schedule",
    cta: "View Schedule",
  },
  {
    title: "Events that keep it fun",
    description: "Tournaments, mixers, and social nights that keep the energy high.",
    href: "/events",
    cta: "See Events",
  },
];

export default function Home() {
  const buttonBase =
    "inline-flex items-center justify-center rounded-full font-semibold transition";
  const primaryButton = `${buttonBase} bg-lime text-navy px-6 py-3 shadow-[0_10px_24px_rgba(191,255,0,0.35)] hover:-translate-y-0.5`;

  return (
    <div className="min-h-screen">
      <section className="hero-bg min-h-screen pt-32 text-white">
        <div className="hero-circle hero-circle-1 z-0" aria-hidden="true" />
        <div className="hero-circle hero-circle-2 z-0" aria-hidden="true" />
        <div className="hero-circle hero-circle-3 z-0" aria-hidden="true" />
        <div className="hero-ghost z-0" aria-hidden="true">
          PB
        </div>
        <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 pb-16">
          <div className="flex w-fit items-center gap-2 rounded-full bg-lime/15 px-4 py-2 text-sm font-semibold text-lime">
            <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-lime" aria-hidden="true" />
            Now Accepting New Members
          </div>
          <div className="max-w-2xl space-y-4">
            <h1 className="text-5xl font-display tracking-wider sm:text-6xl lg:text-7xl">
              Play. <span className="text-lime">Connect</span>. Compete.
            </h1>
            <p className="text-lg text-white/80">
              DeucePB is a welcoming club for every level, from first-time players to fierce competitors. Show up,
              meet new friends, and play your best game.
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            <Link className={primaryButton} href="/join">
              Join Now - It&#39;s Free
            </Link>
          </div>
          <div className="grid gap-4 rounded-3xl border border-lime/20 bg-navy/70 p-6 backdrop-blur sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label}>
                <div className="text-3xl font-display tracking-wide text-white">{stat.value}</div>
                <div className="text-sm text-white/70">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-off-white py-24">
        <div className="mx-auto w-full max-w-6xl px-6">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center rounded-full bg-lime/20 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-lime">
              Club Highlights
            </span>
            <h2 className="mt-4 text-4xl font-display tracking-wider text-navy sm:text-5xl">
              A community built to keep you playing
            </h2>
            <p className="mt-4 text-muted">
              Everything you need is here: friendly people, flexible schedules, and events that keep the energy high.
            </p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {highlights.map((item) => (
              <article
                key={item.title}
                className="rounded-2xl border-t-4 border-lime bg-white p-6 shadow-[0_12px_30px_rgba(10,22,40,0.08)]"
              >
                <h3 className="text-xl font-semibold text-navy">{item.title}</h3>
                <p className="mt-3 text-sm text-muted">{item.description}</p>
                <Link className="mt-6 inline-flex text-sm font-semibold text-navy" href={item.href}>
                  {item.cta}
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-navy-mid py-20 text-white">
        <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-6 px-6 text-center">
          <h2 className="text-4xl font-display tracking-wider sm:text-5xl">Ready to claim your spot?</h2>
          <p className="max-w-2xl text-white/70">
            Join DeucePB today and get matched with the right session for your level. First game is on us.
          </p>
          <Link className={primaryButton} href="/join">
            Join Now
          </Link>
        </div>
      </section>
    </div>
  );
}
