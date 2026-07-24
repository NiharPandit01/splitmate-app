import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Expense from "@/models/Expense";

export async function POST(request: Request){

    try {

        await connectDB();

        const body = await request.json();

        const expense = await Expense.create({
  group: body.group,
  title: body.title,
  amount: body.amount,
  paidBy: body.paidBy,
  participants: body.participants,
});

        return NextResponse.json({
            message:"Expense added",
            expense
        });

    } catch(error){

        console.log(error);

        return NextResponse.json(
            {
                message:"Failed to add expense"
            },
            {
                status:500
            }
        );
    }
}