import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "@/app/lib/auth";
import UserProfileClient from "@/app/Components/ProfileClient";

export default async function UserProfilePage() {
  const headersList = await headers();
  const session = await auth.api.getSession({
    headers: headersList,
  });

  if (!session?.user) {
    redirect("/signIn?callbackUrl=/profile");
  }

  return <UserProfileClient user={session.user} />;
}