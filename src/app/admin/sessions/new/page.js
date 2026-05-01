import SessionForm from "@/components/admin/SessionForm";

export default function NewSessionPage() {
  return (
    <div className="max-w-2xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Create New Session</h1>
        <p className="mt-1 text-sm text-gray-500">
          Add a new recurring weekly session
        </p>
      </div>
      <SessionForm />
    </div>
  );
}
