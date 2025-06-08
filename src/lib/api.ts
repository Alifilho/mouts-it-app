type RequestOptions = {
  method: "GET" | "POST" | "PUT" | "DELETE";
  body?: unknown;
  params?: Record<string, string>;
  noAuth?: boolean;
};

export async function api<T>(
  endpoint: string,
  options: RequestOptions,
): Promise<T> {
  const { method, body, params } = options;

  let url = `/api/${endpoint}`;
  if (params) url += `?${new URLSearchParams(params).toString()}`;

  const res = await fetch(url, {
    method,
    headers: { "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!res.ok) {
    const { message } = await res.json();
    const status = res.status;

    if (status === 401 && !options.noAuth) {
      await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      if (globalThis.window !== undefined) {
        globalThis.location.href = "/sign-in";
      }

      throw new Error("Your session has expired. Please sign in again.");
    }

    throw new Error(message || "Error fetching data");
  }

  return res.json() as Promise<T>;
}
