import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Group from "@/models/Group";
import jwt from "jsonwebtoken";
import User from "@/models/User";


export async function POST(request: Request) {

    await connectDB();


    const token = request.cookies.get("token")?.value;


    if (!token) {

        return NextResponse.json(
            {
                message: "Unauthorized"
            },
            {
                status: 401
            }
        );

    }


    try {

        const decoded:any = jwt.verify(
            token,
            process.env.JWT_SECRET!
        );


        console.log("Decoded token:", decoded);



        const body = await request.json();



        if (!decoded.userId) {

            return NextResponse.json(
                {
                    message: "User ID missing in token",
                    decoded
                },
                {
                    status:400
                }
            );

        }



        const group = await Group.create({

            name: body.name,

            createdBy: decoded.userId,

            members: [
                decoded.userId
            ]

        });



        console.log("Created group:", group);



        return NextResponse.json(
            {
                message: "Group created successfully",
                group
            },
            {
                status: 201
            }
        );


    } catch (error) {


        console.log("Group creation error:", error);


        return NextResponse.json(
            {
                message: "Something went wrong"
            },
            {
                status:500
            }
        );

    }

}
export async function GET(request: Request) {

    await connectDB();

    const token = request.cookies.get("token")?.value;

    if (!token) {
        return NextResponse.json(
            {
                message:"Unauthorized"
            },
            {
                status:401
            }
        );
    }

    try {

        const decoded:any = jwt.verify(
            token,
            process.env.JWT_SECRET!
        );


        const groups = await Group.find({
            members: decoded.userId
        })
        .populate("members", "name email")
        .populate("createdBy", "name email");


        return NextResponse.json(
            {
                groups
            },
            {
                status:200
            }
        );


    } catch(error) {

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