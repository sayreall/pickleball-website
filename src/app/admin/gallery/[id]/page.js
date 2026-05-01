import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import GalleryForm from "@/components/admin/GalleryForm";

export default async function EditGalleryPage({ params }) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: image, error } = await supabase
    .from("gallery_images")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !image) {
    notFound();
  }

  return (
    <div className="max-w-2xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Edit Image</h1>
        <p className="mt-1 text-sm text-gray-500">
          Update the details for this gallery image
        </p>
      </div>
      <GalleryForm image={image} />
    </div>
  );
}
