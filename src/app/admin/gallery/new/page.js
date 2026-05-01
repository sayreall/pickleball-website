import GalleryForm from "@/components/admin/GalleryForm";

export default function NewGalleryPage() {
  return (
    <div className="max-w-2xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Upload Image</h1>
        <p className="mt-1 text-sm text-gray-500">
          Add a new image to your gallery
        </p>
      </div>
      <GalleryForm />
    </div>
  );
}
