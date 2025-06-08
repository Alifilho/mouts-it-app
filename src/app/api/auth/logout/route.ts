import { destroySession } from "@/lib/session";
import { NextResponse } from "next/server";

export async function POST() {
  await destroySession();

  return NextResponse.json({ message: "Logout successful!" }, { status: 200 });
}
