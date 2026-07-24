"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

import Navbar from "@/components/Navbar";
import PrimaryButton from "@/components/PrimaryButton";
import SummaryCard from "@/components/SummaryCard";
import ExpenseCard from "@/components/ExpenseCard";

type Expense = {
  _id: string;
  title: string;
  amount: number;
  paidBy: {
    _id: string;
    name: string;
    email: string;
  };
  participants: {
    _id: string;
    name: string;
    email: string;
  }[];
};

export default function ExpensesPage() {
  const params = useParams();
  const id = params.id as string;

  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchExpenses = async () => {
    try {
      const response = await fetch(
        `/api/groups/${id}/expenses`
      );

      const data = await response.json();

      setExpenses(data.expenses || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchExpenses();
    }
  }, [id]);

  const totalExpenseAmount = useMemo(() => {
    return expenses.reduce(
      (sum, expense) => sum + expense.amount,
      0
    );
  }, [expenses]);

  const averageExpense = useMemo(() => {
    if (expenses.length === 0) return 0;

    return Math.round(
      totalExpenseAmount / expenses.length
    );
  }, [expenses, totalExpenseAmount]);

  return (
    <div className="min-h-screen bg-slate-950 text-white">

      <Navbar title="Group Expenses" />

      <div className="max-w-7xl mx-auto px-6 py-8">

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

          <div>

            <h1 className="text-4xl font-bold">
              Expenses
            </h1>

            <p className="text-slate-400 mt-2">
              View every expense recorded in this group.
            </p>

          </div>

          <div className="flex gap-3 flex-wrap">

            <Link href={`/groups/${id}`}>
              <PrimaryButton type="button">
                ← Back
              </PrimaryButton>
            </Link>

            <Link href={`/groups/${id}/add-expense`}>
              <PrimaryButton type="button">
                + Add Expense
              </PrimaryButton>
            </Link>

          </div>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">

          <SummaryCard
            title="Total Expenses"
            value={expenses.length}
          />

          <SummaryCard
            title="Total Amount"
            value={`₹${totalExpenseAmount}`}
          />

          <SummaryCard
            title="Average Expense"
            value={`₹${averageExpense}`}
          />

        </div>

        <div className="mt-12">

          <h2 className="text-2xl font-bold mb-6">
            Expense History
          </h2>
                    {loading ? (

            <div className="text-center py-12">
              <p className="text-slate-400 text-lg">
                Loading expenses...
              </p>
            </div>

          ) : expenses.length === 0 ? (

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-10 text-center">

              <h3 className="text-2xl font-semibold">
                No Expenses Yet
              </h3>

              <p className="text-slate-400 mt-3">
                Start tracking your group's spending by adding the
                first expense.
              </p>

              <div className="mt-8">

                <Link href={`/groups/${id}/add-expense`}>
                  <PrimaryButton type="button">
                    + Add First Expense
                  </PrimaryButton>
                </Link>

              </div>

            </div>

          ) : (

            <div className="space-y-5">

              {expenses.map((expense) => (

                <ExpenseCard
                  key={expense._id}
                  title={expense.title}
                  amount={expense.amount}
                  paidBy={expense.paidBy.name}
                  participantCount={
                    expense.participants.length
                  }
                />

              ))}

            </div>

          )}

        </div>

      </div>

    </div>
  );
}