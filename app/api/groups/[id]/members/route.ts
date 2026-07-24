import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Group from "@/models/Group";
import User from "@/models/User";
import jwt from "jsonwebtoken";


export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const token = request.cookies.get("token")?.value;

if (!token) {
  return NextResponse.json(
    {
      message: "Unauthorized",
    },
    {
      status: 401,
    }
  );
}
const decoded: any = jwt.verify(
  token,
  process.env.JWT_SECRET!
);

    const { id } = await params;

    const body = await request.json();

    const user = await User.findOne({
      email: body.email,
    });

    if (!user) {
      return NextResponse.json(
        {
          message: "User not found",
        },
        {
          status: 404,
        }
      );
    }

    const group = await Group.findById(id);

    if (!group) {
      return NextResponse.json(
        {
          message: "Group not found",
        },
        {
          status: 404,
        }
      );
    }
    if (group.createdBy.toString() !== decoded.userId) {
  return NextResponse.json(
    {
      message: "Forbidden. Only the group creator can add members.",
    },
    {
      status: 403,
    }
  );
}
const alreadyMember = group.members.some(
  (memberId: any) => memberId.toString() === user._id.toString()
);

if (alreadyMember) {
  return NextResponse.json(
    {
      message: "User is already a member",
    },
    {
      status: 400,
    }
  );
}

group.members.push(user._id);

await group.save();

    return NextResponse.json(
      {
        message: "Member added successfully",
        group,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log(error);

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