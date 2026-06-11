import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import PracticeGame from "./practice-game";

export default async function PracticePage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");
  return <PracticeGame />;
}
