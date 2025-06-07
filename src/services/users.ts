import { ApiResponse } from "@/types/api";

export type User = {
  id: number;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
};

type Pagination = {
  page: number;
  take: number;
  sortBy: keyof User;
  order: "asc" | "desc";
};

export async function getUsers({ page, take, sortBy, order }: Pagination) {
  const params = new URLSearchParams({
    page: String(page),
    take: String(take),
    sortBy,
    order,
  });

  const res = await fetch(`/api/users?${params.toString()}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) {
    const message = await res.text();

    throw new Error(message || "Error fetching users");
  }

  const data = await res.json();

  return data as ApiResponse<User>;
}

export async function getUser(id: string) {
  const res = await fetch(`/api/users/${id}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) {
    const message = await res.text();

    throw new Error(message || "Error fetching user");
  }

  const data = await res.json();

  return data as User;
}

export async function deleteUser(id: string) {
  const res = await fetch(`/api/users/${id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) {
    const message = await res.text();

    throw new Error(message || "Error deleting user");
  }
}

export async function createUser(
  user: Omit<User, "id" | "createdAt" | "updatedAt">,
) {
  const res = await fetch(`/api/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });

  if (!res.ok) {
    const message = await res.text();

    throw new Error(message || "Error creating user");
  }

  const data = await res.json();

  return data as User;
}
