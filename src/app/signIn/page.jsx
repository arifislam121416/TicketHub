"use client";

import Link from "next/link";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

import {
  Card,
  CardHeader,
  CardContent as CardBody,
  Input,
  Button,
  Form,
} from "@heroui/react";

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

useEffect(() => {
  if (!isPending && session?.user?.role) {
    router.replace(`/dashboard/${session.user.role}`);
  }
}, [session, isPending, router]);
  const [showPassword, setShowPassword] = useState(false);

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
      toast.error(error.message);
      return;
    }

    toast.success("Login Successful");

    
  } catch (err) {
    toast.error("Something went wrong");
  }
};

useEffect(() => {
  if (!isPending && session?.user?.role) {
    router.replace(`/dashboard/${session.user.role}`);
  }
}, [session, isPending, router]);
  const handleGoogleLogin = async () => {
    try {
     await authClient.signIn.social({
  provider: "google",
  callbackURL: "/dashboard",
});
    } catch (err) {
      console.log(err);
      toast.error("Google Login Failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-5 bg-gradient-to-br from-slate-950 via-slate-900 to-black">

      {/* Glow */}
      <div className="absolute w-96 h-96 bg-pink-500/20 blur-3xl rounded-full top-20 left-20" />
      <div className="absolute w-96 h-96 bg-indigo-500/20 blur-3xl rounded-full bottom-20 right-20" />

      <Card className="relative w-full max-w-md border border-white/10 bg-white/5 backdrop-blur-2xl shadow-2xl rounded-3xl p-6">

        <CardHeader className="flex flex-col items-center gap-4 pb-8">

          <div className="p-3 rounded-2xl bg-gradient-to-r from-pink-500 to-indigo-600 shadow-lg shadow-pink-500/30">
            <Logo/>
          </div>

          <h1 className="text-4xl font-black bg-gradient-to-r from-white via-slate-200 to-pink-500 bg-clip-text text-transparent">
            Welcome Back 🚀
          </h1>

          <p className="text-sm text-slate-400 text-center">
            Login to manage your events and tickets
          </p>

        </CardHeader>

        <CardBody>

          <Form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5"
          >

            {/* Email */}

            <div className="w-full">

              <Input
                label="Email Address"
                labelPlacement="outside"
                type="email"
                placeholder="you@example.com"
                startContent={<FaEnvelope className="text-pink-400" />}
                classNames={{
                  inputWrapper:
                    "bg-slate-900/60 border border-white/10 hover:border-pink-500",
                }}
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+\.\S+$/,
                    message: "Invalid email address",
                  },
                })}
              />

              {errors.email && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.email.message}
                </p>
              )}

            </div>

            {/* Password */}

            <div className="w-full">

              <Input
                label="Password"
                labelPlacement="outside"
                placeholder="********"
                type={showPassword ? "text" : "password"}
                startContent={<FaLock className="text-pink-400" />}
                endContent={
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                }
                classNames={{
                  inputWrapper:
                    "bg-slate-900/60 border border-white/10 hover:border-pink-500",
                }}
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
              />

              {errors.password && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.password.message}
                </p>
              )}

            </div>

            <div className="flex justify-end w-full">
              <Link
                href="/forgot-password"
                className="text-xs text-pink-400 hover:underline"
              >
                Forgot Password?
              </Link>
            </div>

            <Button
  isLoading={isSubmitting}
  type="submit"
  className="w-full h-12 rounded-xl bg-gradient-to-r from-pink-500 to-indigo-600 text-white"
>
  Sign In
</Button>

          </Form>

          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 border-t border-white/10" />
            <span className="text-xs text-slate-500">OR</span>
            <div className="flex-1 border-t border-white/10" />
          </div>

         <Button
  onPress={handleGoogleLogin}
  variant="bordered"
  className="w-full h-12"
  startContent={<FaGoogle />}
>
  Continue with Google
</Button>

          <p className="text-center text-sm text-slate-400 mt-7">
            Don't have an account?

            <Link
              href="/signIn"
              className="ml-2 text-pink-400 font-semibold hover:text-pink-300 hover:underline"
            >
              Create Account
            </Link>

          </p>

        </CardBody>

      </Card>
    </div>
  );
}