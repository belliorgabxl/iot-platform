import { getDataFromToken } from "@/app/actions/getDataFromToken";
import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function GET(request: NextRequest) {
  try {
    const userId = await getDataFromToken(request);
    if (userId != "none") {
      const user = await User.findOne({ _id: userId });
      return NextResponse.json({
        message: "User found",
        data: user,
      });
    } else {
      return NextResponse.json({ message: "Unauthorized" }, { status: 200 });
    }
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 401 }
    );
  }
}
