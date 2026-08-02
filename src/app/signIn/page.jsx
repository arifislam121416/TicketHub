"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Card, Input, Button } from "@heroui/react";
import {
  FaEnvelope,
  FaLock,
  FaGoogle,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import Logo from "../Components/Logo";
import { authClient } from "../lib/auth-client";

export default function LoginPage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [showPassword, setShowPassword] = useState(false);

  // Auto redirect if already logged in
  useEffect(() => {
    if (!isPending && session?.user?.role) {
      router.replace(`/dashboard/${session.user.role}`);
    }
  }, [session, isPending, router]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const { error } = await authClient.signIn.email({
        email: data.email,
        password: data.password,
      });

      if (error) {
        toast.error(error.message || "Invalid credentials");
        return;
      }

      toast.success("Login Successful");
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: session?.user?.role
          ? `/dashboard/${session.user.role}`
          : "/dashboard/user",
      });
    } catch (err) {
      console.error(err);
      toast.error("Google Login Failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-5 bg-gradient-to-br from-slate-950 via-slate-900 to-black relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute w-96 h-96 bg-pink-500/10 blur-3xl rounded-full top-20 left-20 pointer-events-none" />
      <div className="absolute w-96 h-96 bg-indigo-500/10 blur-3xl rounded-full bottom-20 right-20 pointer-events-none" />

      <Card className="relative w-full max-w-md border border-white/10 bg-white/5 backdrop-blur-2xl shadow-2xl rounded-3xl p-6 text-white">
        <div className="p-3 rounded-2xl bg-gradient-to-r from-pink-700 to-indigo-300 shadow-lg shadow-pink-500/30">
          <Logo />
        </div>

        <h1 className="text-3xl mt-4 font-bold bg-gradient-to-r from-white via-slate-200 to-pink-500 bg-clip-text text-transparent">
          Welcome Back 🚀
        </h1>

        <p className="text-sm mb-6 text-slate-400">
          Login to manage your events and tickets
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Email Field */}
          <div className="w-full">
            <Input
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: "Invalid email address",
                },
              })}
              label="Email Address"
              labelPlacement="outside"
              type="email"
              placeholder="you@example.com"
              startContent={<FaEnvelope className="text-pink-400 shrink-0" />}
              classNames={{
                inputWrapper:
                  "bg-slate-900/60 border border-white/10 hover:border-pink-500 focus-within:!border-pink-500 rounded-xl transition",
                input: "text-sm text-white placeholder:text-slate-500 font-medium",
                label: "text-slate-300 font-medium text-xs mb-1",
              }}
            />
            {errors.email && (
              <p className="text-rose-500 text-xs mt-1 pl-1 font-semibold">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password Field */}
          <div className="w-full">
            <Input
              {...register("password", {
                required: "Password is required",
              })}
              label="Password"
              labelPlacement="outside"
              placeholder="••••••••"
              type={showPassword ? "text" : "password"}
              startContent={<FaLock className="text-pink-400 shrink-0" />}
              endContent={
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="focus:outline-none text-slate-400 hover:text-white transition cursor-pointer"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              }
              classNames={{
                inputWrapper:
                  "bg-slate-900/60 border border-white/10 hover:border-pink-500 focus-within:!border-pink-500 rounded-xl transition",
                input: "text-sm w-full text-white placeholder:text-slate-500 font-medium",
                label: "text-slate-300 font-medium text-xs mb-1",
              }}
            />
            {errors.password && (
              <p className="text-rose-500 text-xs mt-1 pl-1 font-semibold">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Forgot Password Link */}
          <div className="flex justify-end w-full">
            <Link
              href="/forgot-password"
              className="text-xs text-pink-400 hover:underline font-medium"
            >
              Forgot Password?
            </Link>
          </div>

          {/* Submit Button */}
          <Button
            isLoading={isSubmitting}
            type="submit"
            className="w-full h-11 rounded-xl bg-gradient-to-r from-pink-500 to-indigo-600 text-white font-bold text-sm shadow-lg shadow-pink-500/20 hover:opacity-95 transition cursor-pointer"
          >
            Sign In
          </Button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-3 my-5">
          <div className="flex-1 border-t border-white/10" />
          <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">
            OR
          </span>
          <div className="flex-1 border-t border-white/10" />
        </div>

        {/* Google Login Button */}
        <Button
          onPress={handleGoogleLogin}
          variant="bordered"
          className="w-full border-white/10 text-slate-300 hover:bg-white/5 h-11 rounded-xl text-xs font-semibold cursor-pointer"
          startContent={<FaGoogle className="text-xs text-pink-400" />}
        >
          Continue with Google
        </Button>

        {/* Footer Link */}
        <p className="text-center text-xs text-slate-400 mt-6">
          Don't have an account?
          <Link
            href="/signUp"
            className="ml-1.5 text-pink-400 font-semibold hover:text-pink-300 hover:underline"
          >
            Create Account
          </Link>
        </p>
      </Card>
    </div>
  );
}