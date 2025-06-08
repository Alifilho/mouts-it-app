import { getSession } from "@/lib/session";
import { ApiErrorResponse } from "@/lib/types";
import { NextResponse } from "next/server";

export async function GET(
  _: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { accessToken } = await getSession();
  if (!accessToken) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  const res = await fetch(`${process.env.BASE_URL}/users/${id}`, {
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

export async function DELETE(
  _: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { accessToken } = await getSession();
  if (!accessToken) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  const res = await fetch(`${process.env.BASE_URL}/users/${id}`, {
    method: "DELETE",
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

  return NextResponse.json({ message: "User deleted successfully" });
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { accessToken } = await getSession();
  if (!accessToken) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  const body = await request.json();

  const res = await fetch(`${process.env.BASE_URL}/users/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const data = await res.json();

  if (!res.ok) {
    const { message, statusCode } = data as ApiErrorResponse;

    return NextResponse.json({ message }, { status: statusCode });
  }

  return NextResponse.json(data);
}
