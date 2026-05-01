export default function ContactPage() {
  return (
    <div className="bg-off-white pt-32 pb-24">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="relative min-h-[320px] overflow-hidden rounded-2xl bg-gradient-to-br from-[#d7e3f4] to-[#8bb4f2]">
          <div className="absolute bottom-4 left-4 rounded-xl bg-navy/75 px-4 py-3 text-white">
            <h3 className="text-lg font-semibold">SMASH PB Courts</h3>
            <p className="text-sm text-white/70">123 Rally Street, Quezon City</p>
          </div>
        </div>
        <div className="space-y-4">
          <span className="inline-flex items-center rounded-full bg-lime/20 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-lime">
            Find Us
          </span>
          <h1 className="text-4xl font-display tracking-wider text-navy sm:text-5xl">We Are Right Here</h1>
          <div className="space-y-4">
            <div>
              <p className="text-sm font-semibold text-navy">Address</p>
              <p className="text-sm text-muted">123 Rally Street, Quezon City, Metro Manila 1100</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-navy">Phone</p>
              <p className="text-sm text-muted">+63 917 123 4567</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-navy">Email</p>
              <p className="text-sm text-muted">hello@smashpb.com</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-navy">Hours</p>
              <p className="text-sm text-muted">Mon-Fri 6AM-10PM, Sat-Sun 6AM-8PM</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <a className="rounded-full border border-navy/30 px-4 py-2 text-sm font-semibold text-navy" href="#">
              Facebook
            </a>
            <a className="rounded-full border border-navy/30 px-4 py-2 text-sm font-semibold text-navy" href="#">
              Instagram
            </a>
            <a className="rounded-full border border-navy/30 px-4 py-2 text-sm font-semibold text-navy" href="#">
              TikTok
            </a>
            <a className="rounded-full border border-navy/30 px-4 py-2 text-sm font-semibold text-navy" href="#">
              YouTube
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
