import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import GalleryGrid from "@/components/gallery/GalleryGrid";

const experiencePoints = [
  {
    title: "Show up, we will do the rest",
    description: "No experience needed. Members always welcome newcomers.",
  },
  {
    title: "Games that match your pace",
    description: "Choose casual rallies, drills, or competitive play.",
  },
  {
    title: "A social life built in",
    description: "Post-game hangouts, group chats, and member spotlights.",
  },
];

function formatDateLabel(dateStr) {
  if (!dateStr) return "Unsorted";
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function groupImagesByDate(images) {
  const groups = new Map();
  for (const img of images) {
    const key = img.game_date || "unsorted";
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(img);
  }
  // Convert to array sorted by date desc (unsorted goes last)
  return Array.from(groups.entries())
    .sort(([a], [b]) => {
      if (a === "unsorted") return 1;
      if (b === "unsorted") return -1;
      return b.localeCompare(a);
    })
    .map(([date, items]) => ({
      date: date === "unsorted" ? null : date,
      label: date === "unsorted" ? "More Moments" : formatDateLabel(date),
      category: items[0]?.category || null,
      images: items,
    }));
}

export default async function GalleryPage() {
  const supabase = await createClient();

  const { data: galleryImages } = await supabase
    .from("gallery_images")
    .select("*")
    .eq("is_active", true)
    .order("game_date", { ascending: false, nullsFirst: false })
    .order("display_order", { ascending: true })
    .order("created_at", { ascending: false });

  const primaryButton =
    "inline-flex items-center justify-center rounded-full bg-lime px-6 py-3 text-sm font-semibold text-navy shadow-[0_10px_24px_rgba(191,255,0,0.35)] transition hover:-translate-y-0.5";

  const hasImages = galleryImages && galleryImages.length > 0;
  const grouped = hasImages ? groupImagesByDate(galleryImages) : [];
  const totalImages = galleryImages?.length || 0;

  return (
    <div className="bg-navy pt-32 pb-24 text-white">
      {/* Hero */}
      <div className="mx-auto w-full max-w-6xl px-6">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <span className="inline-flex items-center rounded-full bg-lime/20 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-lime">
              The SMASH Experience
            </span>
            <h1 className="mt-4 text-4xl font-display tracking-wider sm:text-5xl">
              Real Games. Real People. Real Fun.
            </h1>
            <p className="mt-4 text-white/70">
              Every session is built around connection, confidence, and community. Browse moments from
              every game day, tournament, and clinic our members have shared.
            </p>
            <div className="mt-6 space-y-4">
              {experiencePoints.map((point, index) => (
                <div key={point.title} className="flex gap-4">
                  <div className="text-3xl font-display text-lime">{index + 1}</div>
                  <div>
                    <h3 className="text-lg font-semibold">{point.title}</h3>
                    <p className="text-sm text-white/70">{point.description}</p>
                  </div>
                </div>
              ))}
            </div>
            <Link className={`${primaryButton} mt-8`} href="/join">
              Join Now - First Game Free
            </Link>
          </div>

          <div className="flex flex-col justify-end">
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <div className="text-3xl font-display text-lime">{totalImages}</div>
                <div className="mt-1 text-xs uppercase tracking-widest text-white/60">
                  Photos in the gallery
                </div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <div className="text-3xl font-display text-lime">{grouped.length}</div>
                <div className="mt-1 text-xs uppercase tracking-widest text-white/60">
                  Game days captured
                </div>
              </div>
            </div>
            {hasImages && (
              <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-5">
                <div className="text-xs uppercase tracking-widest text-white/60">Latest game day</div>
                <div className="mt-1 text-lg font-semibold">
                  {grouped[0]?.label || "Unsorted"}
                </div>
                {grouped[0]?.category && (
                  <div className="mt-1 text-sm text-lime">{grouped[0].category}</div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Grouped Galleries */}
      <div className="mx-auto mt-20 w-full max-w-6xl px-6">
        {!hasImages ? (
          <div className="rounded-3xl border border-white/10 bg-white/5 p-12 text-center">
            <h2 className="text-2xl font-display tracking-wider">No photos yet</h2>
            <p className="mt-3 text-white/70">
              Once our admins upload photos from a game day, you&apos;ll see them right here.
            </p>
          </div>
        ) : (
          <div className="space-y-16">
            {grouped.map((group) => (
              <section key={group.date || "unsorted"}>
                <div className="mb-6 flex flex-wrap items-end justify-between gap-3 border-b border-white/10 pb-4">
                  <div>
                    <h2 className="text-2xl font-display tracking-wider sm:text-3xl">
                      {group.label}
                    </h2>
                    {group.category && (
                      <span className="mt-2 inline-flex items-center rounded-full bg-lime/20 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-lime">
                        {group.category}
                      </span>
                    )}
                  </div>
                  <span className="text-sm text-white/60">
                    {group.images.length} {group.images.length === 1 ? "photo" : "photos"}
                  </span>
                </div>

                <GalleryGrid images={group.images} />
              </section>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
