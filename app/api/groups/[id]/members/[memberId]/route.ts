import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import connectDB from "@/lib/mongodb";
import Group from "@/models/Group";

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; memberId: string }> }
) {
  try {
    await connectDB();

    const token = request.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const decoded: any = jwt.verify(
      token,
      process.env.JWT_SECRET!
    );

    const { id, memberId } = await params;

    const group = await Group.findById(id);

    if (!group) {
      return NextResponse.json(
        { message: "Group not found" },
        { status: 404 }
      );
    }

    // Only the group admin can remove members
    if (group.createdBy.toString() !== decoded.userId) {
      return NextResponse.json(
        { message: "Only the admin can remove members." },
        { status: 403 }
      );
    }

    // Prevent the admin from removing themselves
    if (memberId === decoded.userId) {
      return NextResponse.json(
        { message: "Admin cannot remove themselves." },
        { status: 400 }
      );
    }

    const memberExists = group.members.some(
      (member: any) => member.toString() === memberId
    );

    if (!memberExists) {
      return NextResponse.json(
        { message: "Member not found in this group." },
        { status: 404 }
      );
    }

    group.members = group.members.filter(
      (member: any) => member.toString() !== memberId
    );

    await group.save();

    const updatedGroup = await Group.findById(id)
      .populate("createdBy", "name email")
      .populate("members", "name email");

    return NextResponse.json(
      {
        message: "Member removed successfully.",
        group: updatedGroup,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}