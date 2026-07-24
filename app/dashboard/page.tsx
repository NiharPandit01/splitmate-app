"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import Navbar from "@/components/Navbar";
import SummaryCard from "@/components/SummaryCard";
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

type User = {
  name: string;
  email: string;
  createdAt: string;
};

export default function Dashboard() {
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);
  const [groups, setGroups] = useState<Group[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const profileResponse = await fetch("/api/profile");

        if (!profileResponse.ok) {
          router.replace("/login");
          return;
        }

        const profileData = await profileResponse.json();
        setUser(profileData.user);

        const groupResponse = await fetch("/api/groups");

        if (groupResponse.ok) {
          const groupData = await groupResponse.json();
          setGroups(groupData.groups || []);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [router]);

  const totalMembers = useMemo(() => {
    return groups.reduce((sum, group) => sum + group.members.length, 0);
  }, [groups]);

  const handleLogout = async () => {
    await fetch("/api/logout", {
      method: "POST",
    });

    router.replace("/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
        Loading Dashboard...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-8">

        <div className="flex flex-col md:flex-row justify-between items-center gap-5">

          <div>
            <h1 className="text-4xl font-bold">
              Welcome {user?.name} 👋
            </h1>

            <p className="text-slate-400 mt-2">
              Manage your shared expenses effortlessly.
            </p>
          </div>

          <Link href="/groups/create">
            <PrimaryButton>
              + Create Group
            </PrimaryButton>
          </Link>

        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">

          <SummaryCard
            title="Total Groups"
            value={groups.length}
          />

          <SummaryCard
            title="Total Members"
            value={totalMembers}
          />

          <SummaryCard
            title="Joined"
            value={
              user
                ? new Date(user.createdAt).toLocaleDateString()
                : "-"
            }
          />

        </div>

        <div className="mt-12">

          <h2 className="text-2xl font-bold mb-6">
            Your Groups
          </h2>

          {groups.length === 0 ? (
            <div className="bg-slate-900 rounded-xl p-6 text-slate-400">
              No groups created yet.
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

              {groups.map((group) => (

                <Link
                  key={group._id}
                  href={`/groups/${group._id}`}
                >
                  <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-blue-500 transition cursor-pointer">

                    <h3 className="text-2xl font-semibold">
                      {group.name}
                    </h3>

                    <p className="text-slate-400 mt-3">
                      Members: {group.members.length}
                    </p>

                    <p className="text-blue-400 mt-5">
                      View Group →
                    </p>

                  </div>
                </Link>

              ))}

            </div>
          )}

        </div>

        <div className="mt-12">
          <PrimaryButton onClick={handleLogout}>
            Logout
          </PrimaryButton>
        </div>

      </div>
    </div>
  );
}