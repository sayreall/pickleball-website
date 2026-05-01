import Link from "next/link";

export default function AdminPage() {
  return (
    <div className="bg-off-white pt-32 pb-24">
      <div className="mx-auto w-full max-w-4xl px-6">
        <div className="rounded-3xl border border-navy/10 bg-white p-8 shadow-[0_20px_50px_rgba(10,22,40,0.12)]">
          <span className="inline-flex items-center rounded-full bg-lime/20 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-lime">
            Admin Console
          </span>
          <h1 className="mt-4 text-3xl font-display tracking-wider text-navy sm:text-4xl">
            SMASH PB Admin
          </h1>
          <p className="mt-3 text-sm text-muted">
            This is the admin landing page. Wire your content management tools and Supabase roles here.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              className="inline-flex items-center justify-center rounded-full bg-navy px-5 py-2 text-sm font-semibold text-white"
              href="/"
            >
              Back to Site
            </Link>
            <Link
              className="inline-flex items-center justify-center rounded-full border border-navy/30 px-5 py-2 text-sm font-semibold text-navy"
              href="/login"
            >
              Sign Out
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
