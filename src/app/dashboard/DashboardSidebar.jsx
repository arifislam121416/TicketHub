"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Button,
  Tooltip,
  Avatar,
  Spinner,
} from "@heroui/react";
import {
  LayoutCellsLarge,
  Persons,
  ShoppingBag,
  ChartColumn,
  Gear,
  CircleQuestion,
  ArrowRightFromSquare,
  ChevronLeft,
  ChevronRight,
} from "@gravity-ui/icons";
import { authClient } from "../lib/auth-client";

const DashboardSidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const { data: session, isPending } = authClient.useSession();

  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/login");
        },
      },
    });
  };

  const menuItems = [
    {
      title: "Dashboard",
      icon: LayoutCellsLarge,
      href: "/dashboard",
    },
    {
      title: "Users",
      icon: Persons,
      href: "/dashboard/users",
      badge: "12",
    },
    {
      title: "Products",
      icon: ShoppingBag,
      href: "/dashboard/products",
    },
    {
      title: "Analytics",
      icon: ChartColumn,
      href: "/dashboard/analytics",
    },
    {
      title: "Settings",
      icon: Gear,
      href: "/dashboard/settings",
    },
  ];

  return (
    <aside
      className={`relative min-h-screen bg-slate-900 border-r border-slate-800 text-slate-300 transition-all duration-300 flex flex-col justify-between ${
        isCollapsed ? "w-20" : "w-64"
      }`}
    >
      {/* Toggle */}
      <Button
        isIconOnly
        size="sm"
        radius="full"
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-8 z-20 h-6 w-6 min-w-0 bg-indigo-600 text-white hover:bg-indigo-500"
      >
        {isCollapsed ? (
          <ChevronRight width={14} />
        ) : (
          <ChevronLeft width={14} />
        )}
      </Button>

      {/* Top */}
      <div>
        {/* Logo */}
        <div className="flex items-center gap-3 border-b border-slate-800 px-6 py-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-500 font-bold text-white">
            T
          </div>

          {!isCollapsed && (
            <span className="text-lg font-bold text-white">
              TicketHub
            </span>
          )}
        </div>

        {/* Menu */}
        <nav className="space-y-2 p-4">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;

            const content = (
              <Link
                href={item.href}
                className={`flex items-center gap-3 rounded-xl px-3 py-3 transition-all ${
                  active
                    ? "bg-indigo-600 text-white"
                    : "text-slate-400 hover:bg-slate-800 hover:text-white"
                }`}
              >
                <Icon width={20} />

                {!isCollapsed && (
                  <>
                    <span className="flex-1">
                      {item.title}
                    </span>

                    {item.badge && (
                      <span className="rounded-full bg-slate-800 px-2 py-0.5 text-xs">
                        {item.badge}
                      </span>
                    )}
                  </>
                )}
              </Link>
            );

            return isCollapsed ? (
              <Tooltip
                key={item.title}
                content={item.title}
                placement="right"
              >
                <div>{content}</div>
              </Tooltip>
            ) : (
              <React.Fragment key={item.title}>
                {content}
              </React.Fragment>
            );
          })}
        </nav>
      </div>

      {/* Bottom */}
      <div className="border-t border-slate-800 p-4">

        {/* Support */}
        {isCollapsed ? (
          <Tooltip
            content="Help & Support"
            placement="right"
          >
            <Link
              href="/dashboard/support"
              className="mb-4 flex justify-center rounded-xl p-3 hover:bg-slate-800"
            >
              <CircleQuestion width={20} />
            </Link>
          </Tooltip>
        ) : (
          <Link
            href="/dashboard/support"
            className="mb-4 flex items-center gap-3 rounded-xl px-3 py-3 text-slate-400 hover:bg-slate-800 hover:text-white"
          >
            <CircleQuestion width={20} />
            Help & Support
          </Link>
        )}

        {/* User */}

        {isPending ? (
          <div className="flex justify-center py-4">
            <Spinner size="sm" />
          </div>
        ) : session ? (
          <div className="flex items-center gap-3">
            <div className="relative">
              <Avatar
                src={session.user.image || ""}
                name={session.user.name}
                size="sm"
                isBordered
                color="primary"
              />

              <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-slate-900 bg-green-500"></span>
            </div>

            {!isCollapsed && (
              <>
                <div className="flex-1 overflow-hidden">
                  <h4 className="truncate text-sm font-semibold text-white">
                    {session.user.name || "User"}
                  </h4>

                  <p className="truncate text-xs text-slate-500">
                    {session.user.email}
                  </p>

                  {session.user.role && (
                    <span className="mt-1 inline-block rounded-full bg-indigo-500/20 px-2 py-0.5 text-[10px] uppercase text-indigo-300">
                      {session.user.role}
                    </span>
                  )}
                </div>

                <Button
                  isIconOnly
                  size="sm"
                  variant="light"
                  className="text-slate-400 hover:text-red-500"
                  onClick={handleLogout}
                >
                  <ArrowRightFromSquare width={18} />
                </Button>
              </>
            )}
          </div>
        ) : (
          !isCollapsed && (
            <Button
              color="primary"
              className="w-full"
              onClick={() => router.push("/login")}
            >
              Login
            </Button>
          )
        )}
      </div>
    </aside>
  );
};

export default DashboardSidebar;