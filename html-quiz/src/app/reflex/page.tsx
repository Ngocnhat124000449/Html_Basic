import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import ReflexGame from "./reflex-game";

export default async function ReflexPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");
  return <ReflexGame />;
}
