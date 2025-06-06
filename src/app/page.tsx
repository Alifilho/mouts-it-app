import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";

export default async function Home() {
  const { accessToken } = await getSession();
  if (accessToken) {
    redirect("/users");
  }

  redirect("/sign-in");
}
