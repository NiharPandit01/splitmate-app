import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";
export async function  POST(request:Request){
    await connectDB();

    const body = await request.json();
    const existinguser = await User.findOne({email:body.email});
    if(existinguser){return NextResponse.json(
        {message:"email already registered "} , {status:400});}
    const hashpassword = await bcrypt.hash(body.password,10);
    const newUser = await User.create({name:body.name,email:body.email,password:hashpassword});

    
    return NextResponse.json({message:"User recived successfully " ,user:body});

}