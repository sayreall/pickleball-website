"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Why Join", href: "/why-join" },
  { label: "Schedule", href: "/schedule" },
  { label: "Events", href: "/events" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const progressRef = useRef(null);
  const pathname = usePathname();

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    let ticking = false;

    const updateScroll = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 60);

      if (progressRef.current) {
        const height = document.documentElement.scrollHeight - window.innerHeight;
        const progress = height > 0 ? scrollY / height : 0;
        progressRef.current.style.transform = `scaleX(${progress})`;
      }
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(() => {
          updateScroll();
          ticking = false;
        });
      }
    };

    updateScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const headerShell = scrolled
    ? "bg-navy shadow-[0_12px_30px_rgba(10,22,40,0.45)]"
    : "bg-navy shadow-[0_6px_18px_rgba(10,22,40,0.25)]";
  const navBase = "rounded-full px-3 py-2 transition";
  const primaryButton =
    "inline-flex items-center justify-center rounded-full bg-lime px-6 py-3 text-sm font-semibold text-navy shadow-[0_10px_24px_rgba(191,255,0,0.35)] transition hover:-translate-y-0.5";

  return (
    <header className="fixed left-0 top-0 z-50 w-full">
      <div className="mx-auto w-full max-w-6xl px-4 pt-4">
        <div
          className={`relative flex items-center justify-between gap-6 rounded-full border border-white/10 px-5 py-3 transition-all ${headerShell}`}
        >
          <Link href="/" className="flex items-center gap-3 text-white">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-lime">
              <svg viewBox="0 0 64 64" className="h-7 w-7" aria-hidden="true">
                <rect x="28" y="14" width="8" height="24" rx="3" fill="#0A1628" />
                <circle cx="32" cy="44" r="10" fill="#0A1628" />
              </svg>
            </span>
            <span className="text-2xl font-display tracking-wide">
              Deuce<span className="text-lime">PB</span>
            </span>
          </Link>
          <nav className="hidden items-center gap-1 text-sm font-semibold lg:flex">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`${navBase} ${
                    isActive
                      ? "bg-white/10 text-lime"
                      : "text-white/80 hover:bg-white/10 hover:text-lime"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <div className="hidden items-center gap-3 lg:flex">
            <Link className={primaryButton} href="/join">
              Join Now
            </Link>
          </div>
          <button
            type="button"
            className="rounded-full border border-white/40 px-4 py-2 text-sm font-semibold text-white lg:hidden"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            Menu
          </button>
          <div
            ref={progressRef}
            className="scroll-progress absolute bottom-0 left-6 right-6 h-1 rounded-full bg-lime"
            aria-hidden="true"
          />
        </div>
        <div
          id="mobile-menu"
          className={`mt-3 rounded-3xl border border-white/10 bg-navy px-6 py-6 text-white shadow-[0_18px_40px_rgba(10,22,40,0.35)] lg:hidden ${
            menuOpen ? "block" : "hidden"
          }`}
        >
          <div className="flex flex-col gap-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-white/90"
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-2 flex flex-col gap-3">
              <Link className={primaryButton} href="/join">
                Join Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
