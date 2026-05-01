import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import SessionForm from "@/components/admin/SessionForm";

export default async function EditSessionPage({ params }) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: session, error } = await supabase
    .from("sessions")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !session) {
    notFound();
  }

  return (
    <div className="max-w-2xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Edit Session</h1>
        <p className="mt-1 text-sm text-gray-500">
          Update the details for this session
        </p>
      </div>
      <SessionForm session={session} />
    </div>
  );
}
