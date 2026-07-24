import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Group from "@/models/Group";
import jwt from "jsonwebtoken";


export async function GET(
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


        jwt.verify(
            token,
            process.env.JWT_SECRET!
        );


        const { id } = await params;


        const group = await Group.findById(id)
        .populate(
            "createdBy",
            "name email"
        )
        .populate(
            "members",
            "name email"
        );


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



        return NextResponse.json(
            {
                group
            },
            {
                status:200
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