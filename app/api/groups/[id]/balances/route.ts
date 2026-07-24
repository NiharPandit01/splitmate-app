import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Expense from "@/models/Expense";
import User from "@/models/User";
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  await connectDB();

  const { id } = await params;

  try {
    const expenses = await Expense.find({ group: id });
    const balances: Record<string, number> = {};

for (const expense of expenses) {

    if (expense.participants.length === 0) {
        continue;
    }

    const share = expense.amount / expense.participants.length;

    // Person who paid gets full amount
    balances[expense.paidBy.toString()] =
        (balances[expense.paidBy.toString()] || 0) + expense.amount;

    // Every participant owes their share
    for (const participant of expense.participants) {

        balances[participant.toString()] =
            (balances[participant.toString()] || 0) - share;

    }

}
const result = [];

for (const userId in balances) {

    const user = await User.findById(userId).select("name email");

    result.push({
        name: user?.name,
        email: user?.email,
        balance: balances[userId]
    });

}

   return NextResponse.json(
    {
        balances: result,
        expenses
    },
    {
        status: 200
    }
);
  } catch (error) {
    return NextResponse.json(
      {
        message: "Something went wrong",
      },
      {
        status: 500,
      }
    );
  }
}