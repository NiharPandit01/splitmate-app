"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import Navbar from "@/components/Navbar";
import PrimaryButton from "@/components/PrimaryButton";

export default function CreateGroupPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCreateGroup = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setLoading(true);

    try {
      const response = await fetch("/api/groups", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message);
        return;
      }

      router.push(`/groups/${data.group._id}`);
    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />

      <div className="max-w-xl mx-auto px-6 py-12">

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">

          <h1 className="text-3xl font-bold">
            Create New Group
          </h1>

          <p className="text-slate-400 mt-2">
            Give your expense group a name.
          </p>

          <form
            onSubmit={handleCreateGroup}
            className="mt-8 space-y-6"
          >

            <div>
              <label className="block mb-2 text-sm text-slate-300">
                Group Name
              </label>

              <input
                type="text"
                placeholder="Goa Trip"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white outline-none focus:border-blue-500"
              />
            </div>

            <PrimaryButton type = "submit">
              {loading ? "Creating..." : "Create Group"}
            </PrimaryButton>

          </form>

        </div>

      </div>
    </div>
  );
}