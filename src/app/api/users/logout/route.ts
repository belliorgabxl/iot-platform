import {NextResponse } from "next/server";

export async function GET() {
  try {
    const res = NextResponse.json({
      message: "Logout successfully",
      success: true,
    });
    res.cookies.set("token", "", {
      httpOnly: true,
      expires: new Date(0),
    });
    return res
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : "Unknown error");
  }
}
