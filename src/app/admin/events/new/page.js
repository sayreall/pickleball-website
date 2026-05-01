import EventForm from "@/components/admin/EventForm";

export default function NewEventPage() {
  return (
    <div className="max-w-2xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Create New Event</h1>
        <p className="mt-1 text-sm text-gray-500">
          Add a new event for your club members
        </p>
      </div>
      <EventForm />
    </div>
  );
}
