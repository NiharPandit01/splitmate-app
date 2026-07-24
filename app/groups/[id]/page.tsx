"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

import Navbar from "@/components/Navbar";
import PrimaryButton from "@/components/PrimaryButton";
import SummaryCard from "@/components/SummaryCard";
import BalanceCard from "@/components/BalanceCard";
import ExpenseCard from "@/components/ExpenseCard";

type Balance = {
  name: string;
  email: string;
  balance: number;
};

type Expense = {
  _id: string;
  title: string;
  amount: number;
  paidBy: {
    _id: string;
    name: string;
  };
  participants: unknown[];
};

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

export default function GroupPage() {
  const params = useParams();
  const id = params.id as string;

  const [group, setGroup] = useState<Group | null>(null);
  const [currentUser, setCurrentUser] = useState("");

  const [balances, setBalances] = useState<Balance[]>([]);
  const [expenses, setExpenses] = useState<Expense[]>([]);

  const [loading, setLoading] = useState(true);

  const [editingName, setEditingName] = useState(false);
  const [newGroupName, setNewGroupName] = useState("");

  const fetchGroup = async () => {
    const response = await fetch(`/api/groups/${id}`);
    const data = await response.json();

    setGroup(data.group);
    setCurrentUser(data.currentUser);

    if (data.group) {
      setNewGroupName(data.group.name);
    }
  };

  const fetchBalances = async () => {
    const response = await fetch(
      `/api/groups/${id}/balances`
    );

    const data = await response.json();

    setBalances(data.balances || []);
  };

  const fetchExpenses = async () => {
    const response = await fetch(
      `/api/groups/${id}/expenses`
    );

    const data = await response.json();

    setExpenses(data.expenses || []);
  };

  useEffect(() => {
    async function load() {
      try {
        await Promise.all([
          fetchGroup(),
          fetchBalances(),
          fetchExpenses(),
        ]);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      load();
    }
  }, [id]);

  const totalAmount = useMemo(() => {
    return expenses.reduce(
      (sum, expense) => sum + expense.amount,
      0
    );
  }, [expenses]);

  const isAdmin =
    group?.createdBy?._id === currentUser;

  const handleRename = async () => {
    if (!newGroupName.trim()) return;

    const response = await fetch(
      `/api/groups/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: newGroupName,
        }),
      }
    );

    const data = await response.json();

    if (response.ok) {
      setGroup(data.group);
      setEditingName(false);
    } else {
      alert(data.message);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">

      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-8">

        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-6">

          <div>

            {!editingName ? (

              <>
                <h1 className="text-4xl font-bold">
                  {group?.name}
                </h1>

                <p className="text-slate-400 mt-2">
                  Created by {group?.createdBy?.name}
                </p>
              </>

            ) : (

              <div className="flex gap-3 mt-2">

                <input
                  value={newGroupName}
                  onChange={(e) =>
                    setNewGroupName(e.target.value)
                  }
                  className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-2"
                />

                <PrimaryButton
                  onClick={handleRename}
                >
                  Save
                </PrimaryButton>

              </div>

            )}

            {isAdmin && !editingName && (
              <button
                onClick={() =>
                  setEditingName(true)
                }
                className="mt-3 text-blue-400 hover:text-blue-300"
              >
                ✏ Rename Group
              </button>
            )}

          </div>

          <div className="flex flex-wrap gap-3">

            <Link href={`/groups/${id}`}>
              <PrimaryButton>
                Overview
              </PrimaryButton>
            </Link>

            <Link href={`/groups/${id}/expenses`}>
              <PrimaryButton>
                Expenses
              </PrimaryButton>
            </Link>

            <Link href={`/groups/${id}/members`}>
              <PrimaryButton>
                Members
              </PrimaryButton>
            </Link>

            <Link href={`/groups/${id}/chat`}>
              <PrimaryButton>
                Chat
              </PrimaryButton>
            </Link>

            <Link href={`/groups/${id}/settings`}>
              <PrimaryButton>
                Settings
              </PrimaryButton>
            </Link>

          </div>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">

          <SummaryCard
            title="Members"
            value={group?.members.length ?? 0}
          />

          <SummaryCard
            title="Expenses"
            value={expenses.length}
          />

          <SummaryCard
            title="Total Amount"
            value={`₹${totalAmount}`}
          />

        </div>

        <div className="grid lg:grid-cols-2 gap-8 mt-12">
                    <div>

            <div className="flex items-center justify-between mb-5">

              <h2 className="text-2xl font-bold">
                Balances
              </h2>

              <Link href={`/groups/${id}/members`}>
                <button className="text-blue-400 hover:text-blue-300">
                  View Members →
                </button>
              </Link>

            </div>

            {loading ? (

              <p className="text-slate-400">
                Loading balances...
              </p>

            ) : balances.length === 0 ? (

              <p className="text-slate-400">
                No balances available.
              </p>

            ) : (

              <div className="space-y-4">

                {balances.map((person) => (

                  <BalanceCard
                    key={person.email}
                    name={person.name}
                    email={person.email}
                    balance={person.balance}
                  />

                ))}

              </div>

            )}

          </div>

          <div>

            <div className="flex items-center justify-between mb-5">

              <h2 className="text-2xl font-bold">
                Recent Expenses
              </h2>

              <Link href={`/groups/${id}/expenses`}>
                <button className="text-blue-400 hover:text-blue-300">
                  View All →
                </button>
              </Link>

            </div>

            {loading ? (

              <p className="text-slate-400">
                Loading expenses...
              </p>

            ) : expenses.length === 0 ? (

              <p className="text-slate-400">
                No expenses added yet.
              </p>

            ) : (

              <div className="space-y-4">

                {expenses
                  .slice(0, 5)
                  .map((expense) => (

                    <ExpenseCard
                      key={expense._id}
                      title={expense.title}
                      amount={expense.amount}
                      paidBy={expense.paidBy?.name}
                      participantCount={
                        expense.participants.length
                      }
                    />

                  ))}

              </div>

            )}

          </div>

        </div>

        <div className="mt-14">

          <h2 className="text-2xl font-bold mb-6">
            Quick Actions
          </h2>

          <div className="grid md:grid-cols-2 gap-5">

            <Link href={`/groups/${id}/add-member`}>

              <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-blue-500 transition cursor-pointer">

                <h3 className="text-xl font-semibold">
                  Add Member
                </h3>

                <p className="text-slate-400 mt-2">
                  Invite a new member into this group.
                </p>

              </div>

            </Link>

            <Link href={`/groups/${id}/add-expense`}>

              <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-green-500 transition cursor-pointer">

                <h3 className="text-xl font-semibold">
                  Add Expense
                </h3>

                <p className="text-slate-400 mt-2">
                  Record a new shared expense.
                </p>

              </div>

            </Link>

          </div>

        </div>

      </div>

    </div>
  );
}