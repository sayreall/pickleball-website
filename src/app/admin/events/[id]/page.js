import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import EventForm from "@/components/admin/EventForm";

export default async function EditEventPage({ params }) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: event, error } = await supabase
    .from("events")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !event) {
    notFound();
  }

  return (
    <div className="max-w-2xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Edit Event</h1>
        <p className="mt-1 text-sm text-gray-500">
          Update the details for this event
        </p>
      </div>
      <EventForm event={event} />
    </div>
  );
}
