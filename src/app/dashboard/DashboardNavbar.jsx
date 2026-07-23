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
                src={session?.user?.image || "" }
                className="cursor-pointer"
              />
            </DropdownTrigger>

            <DropdownMenu aria-label="User Menu">
              <DropdownItem key="profile">
                Profile
              </DropdownItem>

              <DropdownItem key="settings">
                Settings
              </DropdownItem>

              <DropdownItem
                key="logout"
                color="danger"
                onClick={handleLogout}
              >
                Logout
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
    </header>
  );
}