"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";

import Navbar from "@/components/Navbar";
import PrimaryButton from "@/components/PrimaryButton";

export default function AddMemberPage() {
  const params = useParams();
  const router = useRouter();

  const id = params.id as string;

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAddMember = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setLoading(true);

    try {
      const response = await fetch(`/api/groups/${id}/members`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message);
        return;
      }

      alert("Member added successfully!");

      router.push(`/groups/${id}`);
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
            Add Member
          </h1>

          <p className="text-slate-400 mt-2">
            Invite a member by email.
          </p>

          <form
            onSubmit={handleAddMember}
            className="mt-8 space-y-6"
          >

            <div>

              <label className="block mb-2 text-sm text-slate-300">
                Email
              </label>

              <input
                type="email"
                placeholder="member@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 outline-none focus:border-blue-500"
              />

            </div>

            <PrimaryButton type ="submit">
              {loading ? "Adding..." : "Add Member"}
            </PrimaryButton>

          </form>

        </div>

      </div>

    </div>
  );
}