"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function DeleteButton({ table, id, itemName }) {
  const router = useRouter();
  const [confirming, setConfirming] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    const supabase = createClient();

    const { error } = await supabase.from(table).delete().eq("id", id);

    setLoading(false);

    if (error) {
      alert("Error deleting item: " + error.message);
      return;
    }

    router.refresh();
    setConfirming(false);
  };

  if (confirming) {
    return (
      <span className="inline-flex items-center gap-2">
        <button
          onClick={handleDelete}
          disabled={loading}
          className="text-red-600 hover:text-red-800 text-sm font-medium"
        >
          {loading ? "..." : "Confirm"}
        </button>
        <button
          onClick={() => setConfirming(false)}
          className="text-gray-500 hover:text-gray-700 text-sm font-medium"
        >
          Cancel
        </button>
      </span>
    );
  }

  return (
    <button
      onClick={() => setConfirming(true)}
      className="text-red-600 hover:text-red-800 text-sm font-medium"
    >
      Delete
    </button>
  );
}
