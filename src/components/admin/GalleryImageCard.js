"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";

export default function GalleryImageCard({ image }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const toggleActive = async () => {
    setLoading(true);
    const supabase = createClient();

    const { error } = await supabase
      .from("gallery_images")
      .update({ is_active: !image.is_active })
      .eq("id", image.id);

    setLoading(false);

    if (error) {
      alert("Error updating image: " + error.message);
      return;
    }

    router.refresh();
  };

  const deleteImage = async () => {
    if (!confirm("Are you sure you want to delete this image?")) return;

    setLoading(true);
    const supabase = createClient();

    const { error } = await supabase.from("gallery_images").delete().eq("id", image.id);

    setLoading(false);

    if (error) {
      alert("Error deleting image: " + error.message);
      return;
    }

    router.refresh();
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className="aspect-video bg-gray-100 relative">
        <img
          src={image.image_url}
          alt={image.title || "Gallery image"}
          className="w-full h-full object-cover"
        />
        {!image.is_active && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="text-white text-sm font-medium">Hidden</span>
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-medium text-gray-900 truncate">
          {image.title || "Untitled"}
        </h3>
        {image.description && (
          <p className="text-sm text-gray-500 line-clamp-2 mt-1">
            {image.description}
          </p>
        )}
        <div className="flex items-center justify-between mt-4">
          <span className="text-xs text-gray-400">Order: {image.display_order}</span>
          <div className="flex gap-2">
            <button
              onClick={toggleActive}
              disabled={loading}
              className={`px-3 py-1 text-xs font-medium rounded-lg transition-colors ${
                image.is_active
                  ? "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  : "bg-teal-100 text-teal-700 hover:bg-teal-200"
              }`}
            >
              {image.is_active ? "Hide" : "Show"}
            </button>
            <Link
              href={`/admin/gallery/${image.id}`}
              className="px-3 py-1 text-xs font-medium rounded-lg bg-blue-100 text-blue-700 hover:bg-blue-200 transition-colors"
            >
              Edit
            </Link>
            <button
              onClick={deleteImage}
              disabled={loading}
              className="px-3 py-1 text-xs font-medium rounded-lg bg-red-100 text-red-700 hover:bg-red-200 transition-colors"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
