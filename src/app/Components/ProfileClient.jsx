"use client";

import { useEffect, useState } from "react";
import { Avatar, Card, Chip, Button, Tooltip } from "@heroui/react";
import {
  BiUser,
  BiCalendar,
  BiMailSend,
  BiEditAlt,
  BiUserCircle,
  BiCrown,
  BiBadge,
} from "react-icons/bi";
import { CrownDiamond, ShieldCheck } from "@gravity-ui/icons";
import { FaUserGear, FaClock } from "react-icons/fa6";
import { HiOutlineSparkles } from "react-icons/hi";
import { motion } from "framer-motion";

const UserProfileClient = ({ user }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Format date only on client side to avoid hydration mismatch
  const joinedDate = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "N/A";

  const userStats = {
    posts: 24,
    followers: 128,
    following: 64,
  };

  const roleColors = {
    admin: "danger",
    moderator: "warning",
    user: "primary",
  };

  const planColors = {
    premium: "success",
    pro: "secondary",
    free: "default",
  };

  const infoItems = [
    {
      icon: BiUser,
      label: "Full Name",
      value: user.name || "N/A",
      color: "violet",
      gradient: "from-violet-500 to-purple-500",
    },
    {
      icon: BiMailSend,
      label: "Email Address",
      value: user.email || "N/A",
      color: "emerald",
      gradient: "from-emerald-500 to-teal-500",
    },
    {
      icon: ShieldCheck,
      label: "Account Role",
      value: user.role || "User",
      color: "amber",
      gradient: "from-amber-500 to-orange-500",
      badge: true,
    },
    {
      icon: CrownDiamond,
      label: "Current Plan",
      value: user.plan || "Free Membership",
      color: "cyan",
      gradient: "from-cyan-500 to-blue-500",
      badge: true,
    },
    {
      icon: BiCalendar,
      label: "Member Since",
      value: joinedDate,
      color: "rose",
      gradient: "from-rose-500 to-pink-500",
      span: true,
    },
  ];

  // Prevent hydration mismatch by rendering only on client
  if (!mounted) {
    return null;
  }

  return (
    <section className="max-w-5xl mx-auto px-4 py-8 space-y-8">
      {/* Animated Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
      >
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500 bg-clip-text text-transparent">
              User Profile
            </h1>
            <HiOutlineSparkles className="text-2xl text-violet-400 animate-pulse" />
          </div>
          <p className="text-slate-500 dark:text-slate-400 mt-1 text-sm md:text-base flex items-center gap-2">
            <span>Manage your account settings and personal details</span>
            <span className="hidden sm:inline">•</span>
            <Chip size="sm" variant="flat" color="primary" className="text-xs">
              Online
            </Chip>
          </p>
        </div>
        <Button
          color="primary"
          variant="shadow"
          startContent={<BiEditAlt size={18} />}
          className="font-semibold"
        >
          Edit Profile
        </Button>
      </motion.div>

      {/* Main Profile Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <Card className="shadow-2xl border border-slate-200/80 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-3xl overflow-hidden hover:shadow-3xl transition-shadow duration-500">
          {/* Animated Cover / Header Banner */}
          <motion.div
            className="h-40 w-full bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500 relative overflow-hidden"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <div className="absolute inset-0 bg-black/10 backdrop-blur-[2px]" />
            <div className="absolute top-10 right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl animate-pulse" />
            <div className="absolute bottom-10 left-20 w-24 h-24 bg-white/5 rounded-full blur-2xl animate-pulse delay-1000" />
            <div className="absolute inset-0 flex items-center justify-end px-8">
              <div className="flex gap-2">
                <Chip color="white" variant="flat" className="text-white/90">
                  Verified
                </Chip>
                <Chip color="white" variant="flat" className="text-white/90">
                  {user.plan || "Free"}
                </Chip>
              </div>
            </div>
          </motion.div>

          <div className="px-6 md:px-8 pb-8">
            {/* User Avatar + Quick Actions Header */}
            <div className="flex flex-col lg:flex-row items-center lg:items-end justify-between -mt-16 mb-8 gap-6">
              <div className="flex flex-col sm:flex-row items-center sm:items-end gap-6 text-center sm:text-left">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative"
                >
                  <Avatar
                    src={user.image || undefined}
                    name={user.name || "User"}
                    className="w-32 h-32 text-4xl font-bold shadow-2xl ring-4 ring-white dark:ring-slate-900 rounded-3xl"
                  />
                  <div className="absolute -bottom-1 -right-1 bg-green-500 w-4 h-4 rounded-full ring-2 ring-white dark:ring-slate-900" />
                </motion.div>
                <div className="space-y-1 mb-1">
                  <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
                    {user.name || "Anonymous User"}
                    <Tooltip content="Verified Account">
                      <BiBadge className="text-blue-500 text-2xl" />
                    </Tooltip>
                  </h2>
                  <p className="text-sm text-slate-500 dark:text-slate-400 font-medium flex items-center gap-2">
                    <BiMailSend className="inline" />
                    {user.email || "No email provided"}
                  </p>
                </div>
              </div>

              {/* Badges / Status Tags */}
              <div className="flex flex-wrap items-center gap-2 mb-1 justify-center lg:justify-end">
                <Chip
                  color={roleColors[user.role] || "primary"}
                  variant="flat"
                  size="md"
                  className="capitalize font-semibold border border-primary/20"
                >
                  <span className="flex items-center gap-1">
                    <FaUserGear className="text-sm" />
                    {user.role || "User"}
                  </span>
                </Chip>
                <Chip
                  color={planColors[user.plan?.toLowerCase()] || "default"}
                  variant="solid"
                  size="md"
                  className="capitalize font-semibold text-white shadow-sm"
                >
                  <span className="flex items-center gap-1">
                    <BiCrown className="text-sm" />
                    {user.plan || "Free Plan"}
                  </span>
                </Chip>
              </div>
            </div>

            {/* Stats Section */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="grid grid-cols-3 gap-4 mb-8 p-4 rounded-2xl bg-gradient-to-r from-violet-50/50 to-indigo-50/50 dark:from-violet-950/30 dark:to-indigo-950/30 border border-slate-200/60 dark:border-slate-800/60"
            >
              {Object.entries(userStats).map(([key, value]) => (
                <div key={key} className="text-center">
                  <div className="text-2xl font-bold text-slate-900 dark:text-white">
                    {value}
                  </div>
                  <div className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    {key}
                  </div>
                </div>
              ))}
            </motion.div>

            <hr className="border-slate-200 dark:border-slate-800/80 my-6" />

            {/* Detailed Info Grid */}
            <div className="grid gap-4 sm:grid-cols-2">
              {infoItems.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.05 }}
                  className={`group flex items-center gap-4 rounded-2xl border border-slate-200/60 dark:border-slate-800/60 p-4 bg-slate-50/50 dark:bg-slate-950/40 transition-all duration-300 hover:shadow-lg ${
                    item.span ? "sm:col-span-2" : ""
                  }`}
                >
                  <div
                    className={`p-3.5 rounded-xl bg-gradient-to-br ${item.gradient} text-white shadow-lg transition-transform group-hover:scale-110 duration-300`}
                  >
                    <item.icon size={22} />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                      {item.label}
                    </p>
                    <h4 className="font-semibold text-slate-800 dark:text-slate-200 mt-0.5 flex items-center gap-2">
                      {item.value}
                      {item.badge && (
                        <Chip size="sm" variant="flat" color="primary" className="text-xs">
                          Active
                        </Chip>
                      )}
                    </h4>
                  </div>
                  <motion.div
                    whileHover={{ rotate: 90 }}
                    transition={{ duration: 0.3 }}
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <BiEditAlt className="text-slate-400 text-sm" />
                  </motion.div>
                </motion.div>
              ))}
            </div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-8 flex flex-wrap gap-3 justify-center"
            >
              <Button color="primary" variant="shadow" size="lg">
                <BiEditAlt className="text-lg" />
                Edit Profile
              </Button>
              <Button color="secondary" variant="bordered" size="lg">
                <BiUserCircle className="text-lg" />
                View Activity
              </Button>
              <Button variant="light" size="lg">
                <FaClock className="text-lg" />
                Account History
              </Button>
            </motion.div>
          </div>
        </Card>
      </motion.div>
    </section>
  );
};

export default UserProfileClient;