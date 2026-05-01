"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function MemberActions({ member }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const updateStatus = async (newStatus) => {
    setLoading(true);
    const supabase = createClient();

    const { error } = await supabase
      .from("members")
      .update({ status: newStatus, updated_at: new Date().toISOString() })
      .eq("id", member.id);

    setLoading(false);
    setShowMenu(false);

    if (error) {
      alert("Error updating member: " + error.message);
      return;
    }

    router.refresh();
  };

  const deleteMember = async () => {
    if (!confirm(`Are you sure you want to delete ${member.first_name} ${member.last_name}?`)) {
      return;
    }

    setLoading(true);
    const supabase = createClient();

    const { error } = await supabase.from("members").delete().eq("id", member.id);

    setLoading(false);
    setShowMenu(false);

    if (error) {
      alert("Error deleting member: " + error.message);
      return;
    }

    router.refresh();
  };

  return (
    <div className="relative">
      <button
        onClick={() => setShowMenu(!showMenu)}
        disabled={loading}
        className="p-1 text-gray-400 hover:text-gray-600"
      >
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
        </svg>
      </button>

      {showMenu && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setShowMenu(false)}
          />
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-20">
            <div className="py-1">
              {member.status === "pending" && (
                <>
                  <button
                    onClick={() => updateStatus("approved")}
                    className="w-full px-4 py-2 text-left text-sm text-green-700 hover:bg-green-50"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => updateStatus("rejected")}
                    className="w-full px-4 py-2 text-left text-sm text-red-700 hover:bg-red-50"
                  >
                    Reject
                  </button>
                </>
              )}
              {member.status === "approved" && (
                <button
                  onClick={() => updateStatus("active")}
                  className="w-full px-4 py-2 text-left text-sm text-blue-700 hover:bg-blue-50"
                >
                  Mark as Active
                </button>
              )}
              {member.status === "active" && (
                <button
                  onClick={() => updateStatus("inactive")}
                  className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50"
                >
                  Mark as Inactive
                </button>
              )}
              {member.status === "inactive" && (
                <button
                  onClick={() => updateStatus("active")}
                  className="w-full px-4 py-2 text-left text-sm text-blue-700 hover:bg-blue-50"
                >
                  Reactivate
                </button>
              )}
              {member.status === "rejected" && (
                <button
                  onClick={() => updateStatus("pending")}
                  className="w-full px-4 py-2 text-left text-sm text-yellow-700 hover:bg-yellow-50"
                >
                  Move to Pending
                </button>
              )}
              <hr className="my-1" />
              <button
                onClick={deleteMember}
                className="w-full px-4 py-2 text-left text-sm text-red-700 hover:bg-red-50"
              >
                Delete Member
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
