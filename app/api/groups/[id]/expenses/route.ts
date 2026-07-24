import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Expense from "@/models/Expense";
import Group from "@/models/Group";
import jwt from "jsonwebtoken";


export async function POST(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {


    await connectDB();


    const token = request.cookies.get("token")?.value;


    if(!token){

        return NextResponse.json(
            {
                message:"Unauthorized"
            },
            {
                status:401
            }
        );

    }



    try{


        const decoded:any = jwt.verify(
            token,
            process.env.JWT_SECRET!
        );


        const {id} = await params;


        const group = await Group.findById(id);



        if(!group){

            return NextResponse.json(
                {
                    message:"Group not found"
                },
                {
                    status:404
                }
            );

        }



        const body = await request.json();



       const expense = await Expense.create({
    title: body.title,
    amount: body.amount,
    group: id,
    paidBy: body.paidBy,
    participants: body.splitBetween,
});



        return NextResponse.json(
            {
                message:"Expense created successfully",
                expense
            },
            {
                status:201
            }
        );



    }catch(error){


        console.log(error);


        return NextResponse.json(
            {
                message:"Something went wrong"
            },
            {
                status:500
            }
        );

    }


}
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await params;
const expenses = await Expense.find({
  group: id,
}).populate("paidBy", "name email");


    return NextResponse.json(
  {
    expenses,
  },
  {
    status: 200,
  }
);
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        message: "Failed to fetch expenses",
      },
      {
        status: 500,
      }
    );
  }
}