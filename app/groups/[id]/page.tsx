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
    name: string;
  };
  participants: unknown[];
};

export default function GroupPage() {
  const params = useParams();
  const id = params.id as string;

  const [balances, setBalances] = useState<Balance[]>([]);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const balanceResponse = await fetch(
          `/api/groups/${id}/balances`
        );
        const balanceData = await balanceResponse.json();
        setBalances(balanceData.balances || []);

        const expenseResponse = await fetch(
          `/api/groups/${id}/expenses`
        );
        const expenseData = await expenseResponse.json();
        setExpenses(expenseData.expenses || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  const totalAmount = useMemo(() => {
    return expenses.reduce(
      (sum, expense) => sum + expense.amount,
      0
    );
  }, [expenses]);

  const totalMembers = balances.length;
  const totalExpenses = expenses.length;

  return (
    <div className="min-h-screen bg-slate-950 text-white">

      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-8">
<div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">

  <div>
    <h1 className="text-4xl font-bold">
      Group Dashboard
    </h1>

    <p className="text-slate-400 mt-2">
      Group ID : {id}
    </p>
  </div>

  <div className="flex gap-3">

    <Link href={`/groups/${id}/add-member`}>
      <PrimaryButton>
        + Add Member
      </PrimaryButton>
    </Link>

    <Link href={`/groups/${id}/add-expense`}>
      <PrimaryButton>
        + Add Expense
      </PrimaryButton>
    </Link>

  </div>

</div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">

          <SummaryCard
            title="Members"
            value={totalMembers}
          />

          <SummaryCard
            title="Expenses"
            value={totalExpenses}
          />

          <SummaryCard
            title="Total Amount"
            value={`₹${totalAmount}`}
          />

        </div>

        <div className="grid lg:grid-cols-2 gap-8 mt-12">

          <div>

            <h2 className="text-2xl font-bold mb-5">
              Balances
            </h2>

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

            <h2 className="text-2xl font-bold mb-5">
              Expense History
            </h2>

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

                {expenses.map((expense) => (

                  <ExpenseCard
                    key={expense._id}
                    title={expense.title}
                    amount={expense.amount}
                    paidBy={expense.paidBy?.name}
                    participantCount={expense.participants.length}
                  />

                ))}

              </div>

            )}

          </div>

        </div>

      </div>

    </div>
  );
}