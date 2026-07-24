"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import Navbar from "@/components/Navbar";
import PrimaryButton from "@/components/PrimaryButton";

type Member = {
  _id: string;
  name: string;
  email: string;
};

export default function AddExpensePage() {
  const params = useParams();
  const router = useRouter();

  const id = params.id as string;

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [members, setMembers] = useState<Member[]>([]);
  const [paidBy, setPaidBy] = useState("");
  const [splitBetween, setSplitBetween] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await fetch(`/api/groups/${id}`);
        const data = await response.json();

        setMembers(data.group.members || []);

        if (data.group.members.length > 0) {
          setPaidBy(data.group.members[0]._id);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchMembers();
  }, [id]);

  const toggleMember = (memberId: string) => {
    if (splitBetween.includes(memberId)) {
      setSplitBetween(splitBetween.filter((id) => id !== memberId));
    } else {
      setSplitBetween([...splitBetween, memberId]);
    }
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setLoading(true);

    try {
      const response = await fetch(`/api/groups/${id}/expenses`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          amount: Number(amount),
          paidBy,
          splitBetween,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message);
        return;
      }

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

      <div className="max-w-2xl mx-auto px-6 py-10">

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">

          <h1 className="text-3xl font-bold">
            Add Expense
          </h1>

          <p className="text-slate-400 mt-2">
            Record a new expense for this group.
          </p>

          <form
            onSubmit={handleSubmit}
            className="space-y-6 mt-8"
          >

            <div>
              <label className="block mb-2">
                Expense Title
              </label>

              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block mb-2">
                Amount
              </label>

              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block mb-2">
                Paid By
              </label>

              <select
                value={paidBy}
                onChange={(e) => setPaidBy(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3"
              >
                {members.map((member) => (
                  <option
                    key={member._id}
                    value={member._id}
                  >
                    {member.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block mb-3">
                Split Between
              </label>

              <div className="space-y-3">
                {members.map((member) => (
                  <label
                    key={member._id}
                    className="flex items-center gap-3 bg-slate-800 p-3 rounded-lg"
                  >
                    <input
                      type="checkbox"
                      checked={splitBetween.includes(member._id)}
                      onChange={() => toggleMember(member._id)}
                    />

                    <span>
                      {member.name} ({member.email})
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <PrimaryButton type = "submit">
              {loading ? "Saving..." : "Add Expense"}
            </PrimaryButton>

          </form>

        </div>

      </div>
    </div>
  );
}