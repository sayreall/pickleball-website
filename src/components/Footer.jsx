import Link from "next/link";

const footerLinks = [
  { label: "Home", href: "/" },
  { label: "Why Join", href: "/why-join" },
  { label: "Schedule", href: "/schedule" },
  { label: "Events", href: "/events" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/contact" },
];

export default function Footer() {
  return (
    <footer className="bg-navy py-12 text-white">
      <div className="mx-auto grid w-full max-w-6xl gap-8 px-6 text-center md:grid-cols-3 md:text-left">
        <div>
          <div className="text-2xl font-display tracking-wide">
            Deuce<span className="text-lime">PB</span>
          </div>
          <p className="mt-2 text-sm text-white/70">Play. Connect. Compete.</p>
        </div>
        <div className="flex flex-col gap-2 text-sm text-white/80">
          {footerLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}
        </div>
        <div className="flex items-center justify-center md:justify-end">
          <Link
            className="inline-flex items-center justify-center rounded-full bg-lime px-6 py-3 text-sm font-semibold text-navy shadow-[0_10px_24px_rgba(191,255,0,0.35)] transition hover:-translate-y-0.5"
            href="/join"
          >
            Join Now
          </Link>
        </div>
      </div>
      <div className="mt-8 text-center text-xs text-white/60">
        Copyright {new Date().getFullYear()} DeucePB - Quezon City, Philippines
      </div>
    </footer>
  );
}
