import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(request: Request) {

    await connectDB();

    const body = await request.json();


    const existingUser = await User.findOne({
        email: body.email,
    });


    if (!existingUser) {
        return NextResponse.json(
            {
                message: "User not found",
            },
            {
                status: 404,
            }
        );
    }


    const isPasswordCorrect = await bcrypt.compare(
        body.password,
        existingUser.password
    );


    if (!isPasswordCorrect) {
        return NextResponse.json(
            {
                message: "Invalid password",
            },
            {
                status: 401,
            }
        );
    }


    // Create JWT token
    const token = jwt.sign(
        {
            userId: existingUser._id,
            email: existingUser.email,
        },
        process.env.JWT_SECRET!,
        {
            expiresIn: "7d",
        }
    );


    const response = NextResponse.json(
        {
            message: "Login successful",
        },
        {
            status: 200,
        }
    );


    // Store token in browser cookie
    response.cookies.set(
        "token",
        token,
        {
            httpOnly: true,
            secure: false,
            maxAge: 60 * 60 * 24 * 7,
            path: "/",
        }
    );


    return response;
}