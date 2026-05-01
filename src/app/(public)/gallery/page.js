import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

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

// Default gallery items when no images are in the database
const defaultGalleryItems = [
  { label: "Morning Open Play", className: "lg:row-span-2 bg-gradient-to-br from-sky to-navy" },
  { label: "Competitive Rally", className: "lg:col-span-2 bg-gradient-to-br from-lime to-[#5a7a1f]" },
  { label: "After-Game Socials", className: "bg-gradient-to-br from-[#ff8a5b] to-[#4a1f1f]" },
  { label: "Annual Tournament", className: "bg-gradient-to-br from-purple to-[#1f1735]" },
  { label: "Beginner Clinic", className: "lg:col-span-2 bg-gradient-to-br from-sky to-navy" },
  { label: "Weekend Open Play", className: "bg-gradient-to-br from-[#f5d142] to-[#8a5b00]" },
];

const gridClasses = [
  "lg:row-span-2",
  "lg:col-span-2",
  "",
  "",
  "lg:col-span-2",
  "",
];

export default async function GalleryPage() {
  const supabase = await createClient();
  
  const { data: galleryImages } = await supabase
    .from("gallery_images")
    .select("*")
    .eq("is_active", true)
    .order("display_order", { ascending: true });

  const primaryButton =
    "inline-flex items-center justify-center rounded-full bg-lime px-6 py-3 text-sm font-semibold text-navy shadow-[0_10px_24px_rgba(191,255,0,0.35)] transition hover:-translate-y-0.5";

  const hasImages = galleryImages && galleryImages.length > 0;

  return (
    <div className="bg-navy pt-32 pb-24 text-white">
      <div className="mx-auto grid w-full max-w-6xl gap-12 px-6 lg:grid-cols-2">
        <div>
          <span className="inline-flex items-center rounded-full bg-lime/20 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-lime">
            The SMASH Experience
          </span>
          <h1 className="mt-4 text-4xl font-display tracking-wider sm:text-5xl">
            Real Games. Real People. Real Fun.
          </h1>
          <p className="mt-4 text-white/70">
            Every session is built around connection, confidence, and community. We match you with games that fit your
            pace and make it easy to meet new partners.
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
          <Link className={`${primaryButton} mt-8 inline-flex`} href="/join">
            Join Now - First Game Free
          </Link>
        </div>
        <div className="grid auto-rows-[140px] gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {hasImages ? (
            galleryImages.map((image, index) => (
              <div
                key={image.id}
                className={`relative flex items-end overflow-hidden rounded-2xl p-4 ${gridClasses[index % gridClasses.length]}`}
              >
                <img 
                  src={image.image_url} 
                  alt={image.title || "Gallery image"}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/30 to-transparent" />
                <span className="relative text-sm font-semibold">{image.title}</span>
              </div>
            ))
          ) : (
            defaultGalleryItems.map((item) => (
              <div
                key={item.label}
                className={`relative flex items-end overflow-hidden rounded-2xl p-4 ${item.className}`}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/30 to-transparent" />
                <span className="relative text-sm font-semibold">{item.label}</span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
