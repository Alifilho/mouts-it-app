export type SignInDto = { email: string; password: string };

export async function signIn(data: SignInDto) {
  const res = await fetch("/api/auth/sign-in", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const message = await res.text();

    throw new Error(message || "Error in sign in");
  }
}
