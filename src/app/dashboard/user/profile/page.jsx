import { redirect } from "next/navigation";
import { headers } from "next/headers";

import { Avatar, Calendar, Card, Chip } from "@heroui/react";

import { auth } from "@/app/lib/auth";
import { BiUser } from "react-icons/bi";
import { RiMvAiLine } from "react-icons/ri";
import { CrownDiamond, ShieldCheck } from "@gravity-ui/icons";

export default async function UserProfilePage() {
  const headersList = await headers();
  const session = await auth.api.getSession({
    headers: headersList,
  });

  if (!session?.user) {
    redirect("/signIn?callbackUrl=/profile");
  }

  const user = session.user;

  const joinedDate = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "N/A";

  return (
    <section className="max-w-4xl mx-auto bg-gray-200 px-4 py-8 space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
          User Profile
        </h1>
        <p className="text-default-500 mt-1 text-sm md:text-base">
          View and manage your personal account details.
        </p>
      </div>

      {/* Profile Card */}
      <Card className="shadow-2xl border border-default-100 bg-background/50 p-2 rounded-xl backdrop-blur-md">
       
          
          {/* Top Hero Section */}
          <div className="flex flex-col items-center text-center md:text-left md:flex-row gap-6">
            <Avatar
              src={user.image || ""}
              name={user.name || "User"}
              className="h-28 w-28 text-2xl font-semibold shadow-xl ring-4 ring-primary/20 transform hover:scale-105 transition-all duration-300"
              showFallback
            />

            <div className="space-y-2">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                {user.name || "Anonymous User"}
              </h2>

              <div className="flex items-center justify-center md:justify-start gap-2">
                <Chip color="primary" variant="flat" size="sm" className="capitalize font-medium shadow-sm">
                  {user.role || "User"}
                </Chip>

                <Chip
                  color={user.plan === "Premium" ? "success" : "default"}
                  variant="dot"
                  size="sm"
                  className="capitalize font-medium shadow-sm"
                >
                  {user.plan || "Free Plan"}
                </Chip>
              </div>
            </div>
          </div>

         

          {/* User Details Grid */}
          <div className="grid gap-5 sm:grid-cols-2">
            
            {/* Full Name */}
            <div className="group flex items-center gap-4 rounded-2xl border border-default-200/60 p-4 bg-default-50/50 hover:bg-default-100/60 hover:shadow-md transition-all duration-300">
              {/* Gravity-effect Icon Wrapper */}
              <div className="p-3.5 rounded-2xl bg-primary/10 text-primary shadow-md shadow-primary/10 group-hover:-translate-y-1 group-hover:shadow-lg group-hover:shadow-primary/20 transition-all duration-300 ease-out">
                <BiUser size={22} className="drop-shadow-sm" />
              </div>

              <div>
                <p className="text-xs font-medium text-default-500 uppercase tracking-wider">
                  Full Name
                </p>
                <h4 className="font-semibold text-foreground mt-0.5">
                  {user.name || "N/A"}
                </h4>
              </div>
            </div>

            {/* Email Address */}
            <div className="group flex items-center gap-4 rounded-2xl border border-default-200/60 p-4 bg-default-50/50 hover:bg-default-100/60 hover:shadow-md transition-all duration-300">
              {/* Gravity-effect Icon Wrapper */}
              <div className="p-3.5 rounded-2xl bg-success/10 text-success shadow-md shadow-success/10 group-hover:-translate-y-1 group-hover:shadow-lg group-hover:shadow-success/20 transition-all duration-300 ease-out">
                <RiMvAiLine size={22} className="drop-shadow-sm" />
              </div>

              <div className="overflow-hidden">
                <p className="text-xs font-medium text-default-500 uppercase tracking-wider">
                  Email
                </p>
                <h4 className="font-semibold text-foreground mt-0.5 truncate">
                  {user.email || "N/A"}
                </h4>
              </div>
            </div>

            {/* Role */}
            <div className="group flex items-center gap-4 rounded-2xl border border-default-200/60 p-4 bg-default-50/50 hover:bg-default-100/60 hover:shadow-md transition-all duration-300">
              {/* Gravity-effect Icon Wrapper */}
              <div className="p-3.5 rounded-2xl bg-warning/10 text-warning shadow-md shadow-warning/10 group-hover:-translate-y-1 group-hover:shadow-lg group-hover:shadow-warning/20 transition-all duration-300 ease-out">
                <ShieldCheck size={22} className="drop-shadow-sm" />
              </div>

              <div>
                <p className="text-xs font-medium text-default-500 uppercase tracking-wider">
                  Role
                </p>
                <h4 className="font-semibold text-foreground mt-0.5 capitalize">
                  {user.role || "User"}
                </h4>
              </div>
            </div>

            {/* Current Plan */}
            <div className="group flex items-center gap-4 rounded-2xl border border-default-200/60 p-4 bg-default-50/50 hover:bg-default-100/60 hover:shadow-md transition-all duration-300">
              {/* Gravity-effect Icon Wrapper */}
              <div className="p-3.5 rounded-2xl bg-secondary/10 text-secondary shadow-md shadow-secondary/10 group-hover:-translate-y-1 group-hover:shadow-lg group-hover:shadow-secondary/20 transition-all duration-300 ease-out">
                <CrownDiamond size={22} className="drop-shadow-sm" />
              </div>

              <div>
                <p className="text-xs font-medium text-default-500 uppercase tracking-wider">
                  Current Plan
                </p>
                <div className="mt-1">
                  <Chip
                    size="sm"
                    color={user.plan === "Premium" ? "success" : "default"}
                    variant="solid"
                    className="font-semibold shadow-sm"
                  >
                    {user.plan || "Free"}
                  </Chip>
                </div>
              </div>
            </div>

            {/* Joined Date */}
            <div className="group flex items-center gap-4 rounded-2xl border border-default-200/60 p-4 bg-default-50/50 hover:bg-default-100/60 hover:shadow-md transition-all duration-300 sm:col-span-2">
              {/* Gravity-effect Icon Wrapper */}
              <div className="p-3.5 rounded-2xl bg-danger/10 text-danger shadow-md shadow-danger/10 group-hover:-translate-y-1 group-hover:shadow-lg group-hover:shadow-danger/20 transition-all duration-300 ease-out">
                <Calendar size={22} className="drop-shadow-sm" />
              </div>

              <div>
                <p className="text-xs font-medium text-default-500 uppercase tracking-wider">
                  Joined At
                </p>
                <h4 className="font-semibold text-foreground mt-0.5">
                  {joinedDate}
                </h4>
              </div>
            </div>

          </div>

        
      </Card>
    </section>
  );
}