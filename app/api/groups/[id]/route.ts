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

  try {
    const decoded: any = jwt.verify(
      token,
      process.env.JWT_SECRET!
    );

    const { id } = await params;

    const group = await Group.findById(id)
      .populate("createdBy", "name email")
      .populate("members", "name email");

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

    return NextResponse.json(
      {
        group,
        currentUser: decoded.userId,
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

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
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

  try {
    const decoded: any = jwt.verify(
      token,
      process.env.JWT_SECRET!
    );

    const body = await request.json();

    const { id } = await params;

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
          message: "Only the group admin can rename this group.",
        },
        {
          status: 403,
        }
      );
    }

    if (!body.name || body.name.trim() === "") {
      return NextResponse.json(
        {
          message: "Group name is required.",
        },
        {
          status: 400,
        }
      );
    }

    group.name = body.name.trim();

    await group.save();

    const updatedGroup = await Group.findById(id)
      .populate("createdBy", "name email")
      .populate("members", "name email");

    return NextResponse.json(
      {
        message: "Group renamed successfully.",
        group: updatedGroup,
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