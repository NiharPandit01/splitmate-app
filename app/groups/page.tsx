"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import Navbar from "@/components/Navbar";
import PrimaryButton from "@/components/PrimaryButton";

type Group = {
  _id: string;
  name: string;
  members: {
    _id: string;
    name: string;
    email: string;
  }[];
};

export default function GroupsPage() {
  const [groups, setGroups] = useState<Group[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await fetch("/api/groups");
        const data = await response.json();

        setGroups(data.groups || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchGroups();
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />

      <div className="max-w-6xl mx-auto px-6 py-8">

        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold">Your Groups</h1>
            <p className="text-slate-400 mt-2">
              Select a group to view expenses.
            </p>
          </div>

          <Link href="/groups/create">
            <PrimaryButton>
              + Create Group
            </PrimaryButton>
          </Link>
        </div>

        {loading ? (
          <p className="text-slate-400">Loading groups...</p>
        ) : groups.length === 0 ? (
          <p className="text-slate-400">
            No groups created yet.
          </p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {groups.map((group) => (
              <Link
                key={group._id}
                href={`/groups/${group._id}`}
              >
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-blue-500 transition cursor-pointer">

                  <h2 className="text-2xl font-semibold">
                    {group.name}
                  </h2>

                  <p className="text-slate-400 mt-3">
                    Members: {group.members.length}
                  </p>

                </div>
              </Link>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}