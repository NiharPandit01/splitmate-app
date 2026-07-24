"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

import Navbar from "@/components/Navbar";
import PrimaryButton from "@/components/PrimaryButton";
import SummaryCard from "@/components/SummaryCard";
import MemberCard from "@/components/MemberCard";

type Member = {
  _id: string;
  name: string;
  email: string;
};

type Group = {
  _id: string;
  name: string;
  createdBy: {
    _id: string;
    name: string;
    email: string;
  };
  members: Member[];
};

export default function MembersPage() {
  const params = useParams();
  const id = params.id as string;

  const [group, setGroup] = useState<Group | null>(null);
  const [currentUser, setCurrentUser] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchGroup = async () => {
    try {
      const response = await fetch(`/api/groups/${id}`);
      const data = await response.json();

      if (!response.ok) {
        alert(data.message);
        return;
      }

      setGroup(data.group);
      setCurrentUser(data.currentUser);
    } catch (error) {
      console.error(error);
      alert("Failed to fetch group.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchGroup();
    }
  }, [id]);

  const handleRemove = async (memberId: string) => {
    const confirmRemove = window.confirm(
      "Are you sure you want to remove this member?"
    );

    if (!confirmRemove) return;

    try {
      const response = await fetch(
        `/api/groups/${id}/members/${memberId}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message);
        return;
      }

      alert(data.message);

      await fetchGroup();
    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">

      <Navbar title="Group Members" />

      <div className="max-w-6xl mx-auto px-6 py-8">

        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-6">

          <div>

            <h1 className="text-4xl font-bold">
              Members
            </h1>

            <p className="text-slate-400 mt-2">
              Manage everyone in this group.
            </p>

          </div>

          <div className="flex gap-3 flex-wrap">

            <Link href={`/groups/${id}`}>
              <PrimaryButton type="button">
                ← Back
              </PrimaryButton>
            </Link>

            <Link href={`/groups/${id}/add-member`}>
              <PrimaryButton type="button">
                + Add Member
              </PrimaryButton>
            </Link>

          </div>

        </div>

        <div className="mt-10">

          <SummaryCard
            title="Total Members"
            value={group?.members.length ?? 0}
          />

        </div>

        <div className="mt-10">          {loading ? (

            <div className="text-center py-10">
              <p className="text-slate-400 text-lg">
                Loading members...
              </p>
            </div>

          ) : !group || group.members.length === 0 ? (

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-10 text-center">

              <h2 className="text-2xl font-semibold">
                No Members Found
              </h2>

              <p className="text-slate-400 mt-3">
                Invite people to start splitting expenses together.
              </p>

              <div className="mt-8">

                <Link href={`/groups/${id}/add-member`}>
                  <PrimaryButton type="button">
                    + Add Member
                  </PrimaryButton>
                </Link>

              </div>

            </div>

          ) : (

            <div className="space-y-5">

              {group.members.map((member) => (

                <MemberCard
                  key={member._id}
                  id={member._id}
                  name={member.name}
                  email={member.email}
                  isAdmin={
                    member._id === group.createdBy._id
                  }
                  showRemove={
                    currentUser === group.createdBy._id &&
                    member._id !== currentUser
                  }
                  onRemove={handleRemove}
                />

              ))}

            </div>

          )}

      </div>

    </div>

  </div>
  );
}