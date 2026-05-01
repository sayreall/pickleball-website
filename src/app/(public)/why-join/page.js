import Link from "next/link";

const benefits = [
  {
    title: "Welcoming Community",
    description: "No judgment, no cliques. Everyone belongs.",
  },
  {
    title: "All Skill Levels",
    description: "Beginner to competitive, every player is welcome.",
  },
  {
    title: "32+ Weekly Games",
    description: "Morning, evening, and weekends every day.",
  },
  {
    title: "Tournaments and Events",
    description: "Social nights, seasonal tournaments, and mixers.",
  },
  {
    title: "Free Coaching Clinics",
    description: "Monthly clinics led by certified instructors.",
  },
  {
    title: "Premium Courts",
    description: "Six dedicated courts with lighting.",
  },
];

const testimonials = [
  {
    quote:
      "I joined not knowing how to hold a paddle. Within two weeks I had 20 new friends.",
    name: "Maria Reyes, Member since 2023",
  },
  {
    quote:
      "Best fitness decision I have made in years. The community keeps bringing me back.",
    name: "James Tan, Member since 2022",
  },
];

export default function WhyJoinPage() {
  const primaryButton =
    "inline-flex items-center justify-center rounded-full bg-lime px-6 py-3 text-sm font-semibold text-navy shadow-[0_10px_24px_rgba(191,255,0,0.35)] transition hover:-translate-y-0.5";

  return (
    <div className="bg-off-white pt-32 pb-24">
      <div className="mx-auto w-full max-w-6xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center rounded-full bg-lime/20 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-lime">
            Why Join Us
          </span>
          <h1 className="mt-4 text-4xl font-display tracking-wider text-navy sm:text-5xl">
            More Than a Game. It&#39;s a Community.
          </h1>
          <p className="mt-4 text-muted">
            DeucePB is built on friendly competition, inclusive play, and unforgettable social moments on and off the
            court.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit) => (
            <article
              key={benefit.title}
              className="rounded-2xl border-t-4 border-lime bg-white p-6 shadow-[0_12px_30px_rgba(10,22,40,0.08)]"
            >
              <h3 className="text-xl font-semibold text-navy">{benefit.title}</h3>
              <p className="mt-2 text-sm text-muted">{benefit.description}</p>
            </article>
          ))}
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {testimonials.map((testimonial) => (
            <article
              key={testimonial.name}
              className="rounded-2xl bg-navy p-6 text-white shadow-[0_20px_50px_rgba(10,22,40,0.25)]"
            >
              <p className="text-lg">&quot;{testimonial.quote}&quot;</p>
              <span className="mt-4 block text-sm text-white/70">{testimonial.name}</span>
            </article>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <Link className={primaryButton} href="/join">
            Join Now
          </Link>
        </div>
      </div>
    </div>
  );
}
