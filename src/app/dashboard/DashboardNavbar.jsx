"use client";

import {
  Input,
  Avatar,
  Badge,
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/react";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { authClient } from "../lib/auth-client";


export default function DashboardNavbar() {
  const router = useRouter();
  const { data: session } = authClient.useSession();

  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => router.push("/login"),
      },
    });
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-800 bg-slate-950/80 backdrop-blur-xl">
      <div className="flex h-16 items-center justify-between px-6">
        {/* Left */}
        <div className="flex items-center gap-8">
          <Link
            href="/dashboard"
            className="text-2xl font-bold text-white"
          >
            TicketHub
          </Link>

          <div className="hidden lg:block w-80">
            <Input
              className="bg-slate-800 px-2 rounded-2xl text-slate-300 placeholder:text-slate-500 border-slate-600"
              placeholder="Search..."
              variant="bordered"
            />
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center gap-4">
          <Button isIconOnly variant="light">
            <Badge color="danger" content="3">
              🔔
            </Badge>
          </Button>

          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                name={session?.user?.name || "User"}
                src={session?.user?.image || undefined} 
                className="cursor-pointer w-10 h-10"
              />
            </DropdownTrigger>

            <DropdownMenu aria-label="User Menu" onAction={(key) => {
              if (key === "signOut") onClick={handleLogout};
            }}>
              <DropdownItem
                key="signOut"
                color="danger"
                className="flex items-center bg-white p-2 rounded-3xl font-semibold gap-2 text-danger"
              >
                <button>Sign Out</button>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
    </header>
  );
}