import { getSession } from "@/lib/session";
import { ApiErrorResponse } from "@/lib/types";
import { NextResponse } from "next/server";

export async function GET() {
  const { accessToken } = await getSession();
  if (!accessToken) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const res = await fetch(`${process.env.BASE_URL}/users`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();

  if (!res.ok) {
    const { message, statusCode } = data as ApiErrorResponse;

    return NextResponse.json({ message }, { status: statusCode });
  }

  return NextResponse.json(data);
}

export async function POST(request: Request) {
  const { accessToken } = await getSession();
  if (!accessToken) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const user = await request.json();

  const res = await fetch(`${process.env.BASE_URL}/users`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  const data = await res.json();

  if (!res.ok) {
    const { message, statusCode } = data as ApiErrorResponse;

    return NextResponse.json({ message }, { status: statusCode });
  }

  return NextResponse.json(data);
}
