import { getSession } from "@/lib/session";
import { ApiErrorResponse } from "@/lib/types";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { accessToken } = await getSession();
  if (!accessToken) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const searchParams = request.nextUrl.searchParams;
  const page = searchParams.get("page") || "0";
  const take = searchParams.get("take") || "25";
  const sortBy = searchParams.get("sortBy") || "createdAt";
  const order = searchParams.get("order") || "desc";
  const params = new URLSearchParams({ page, take, sortBy, order }).toString();

  const res = await fetch(`${process.env.BASE_URL}/users?${params}`, {
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
