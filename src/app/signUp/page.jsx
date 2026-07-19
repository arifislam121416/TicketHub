"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { 
  Card, 
  CardHeader, 
  CardBody, 
  Input, 
  Button, 
  Select, 
  Label,
  ListBox
} from "@heroui/react";
import { 
  FaUser, 
  FaEnvelope, 
  FaLock, 
  FaImage, 
  FaGoogle 
} from "react-icons/fa";
import { authClient } from "../lib/auth-client";

export default function SignUpPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [authError, setAuthError] = useState("");


  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      image: "",
      password: "",
      role: "user", 
    }
  });

  // Submit Handler connected to Better Auth
  const onSubmit = async (data) => {
    setLoading(true);
    setAuthError("");
    try {
      const { data: res, error } = await authClient.signUp.email({
        email: data.email,
        password: data.password,
        name: data.name,
        image: data.image, 
        role: data.role,
        plan:"Free",
      });

      if (error) {
        setAuthError(error.message || "Failed to create account. Please try again.");
      } else {
        router.push(`/dashboard/${data.role}`);
        router.refresh();
      }
    } catch (err) {
      setAuthError("An unexpected system error occurred.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Google Social Sign In handler
  const handleGoogleSignIn = async () => {
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/dashboard/user"
      });
    } catch (err) {
      console.error("Google authentication failed", err);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 bg-slate-950 text-white">
      <Card className="w-full max-w-lg border border-white/5 bg-slate-900/40 backdrop-blur-xl shadow-2xl p-6">
        <CardHeader className="flex flex-col gap-1 items-center pb-6 text-center">
          <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-tr from-pink-500 to-indigo-600 text-white shadow-lg shadow-pink-500/20 mb-3">
            <FaUser className="text-xl" />
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
            Create an Account
          </h1>
          <p className="text-slate-400 text-xs">
            Join Tricket to book premium, curated events globally.
          </p>
        </CardHeader>

        <Card className="p-0">
          {/* Auth System Error Display */}
          {authError && (
            <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs text-center font-medium">
              {authError}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            
            {/* NAME FIELD */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="name" className="text-xs font-semibold text-slate-300">
                Full Name
              </label>
              <Input
                {...register("name", { required: "Name is required" })}
                id="name"
                placeholder="John Doe"
                variant="primary"
                className="w-full"
                startContent={<FaUser className="text-slate-500 text-xs mr-1 shrink-0" />}
                isInvalid={!!errors.name}
              />
              {errors.name && (
                <span className="text-xs text-red-400 pl-1">{errors.name.message}</span>
              )}
            </div>

            {/* EMAIL FIELD */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="email" className="text-xs font-semibold text-slate-300">
                Email Address
              </label>
              <Input
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+\.\S+$/,
                    message: "Invalid email address",
                  },
                })}
                id="email"
                type="email"
                placeholder="john@example.com"
                variant="primary"
                className="w-full"
                startContent={<FaEnvelope className="text-slate-500 text-xs mr-1 shrink-0" />}
                isInvalid={!!errors.email}
              />
              {errors.email && (
                <span className="text-xs text-red-400 pl-1">{errors.email.message}</span>
              )}
            </div>

            {/* PROFILE IMAGE URL FIELD */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="image" className="text-xs font-semibold text-slate-300">
                Profile Image URL
              </label>
              <Input
                {...register("image", { required: "Image URL is required" })}
                id="image"
                type="url"
                placeholder="https://example.com/avatar.jpg"
                variant="primary"
                className="w-full"
                startContent={<FaImage className="text-slate-500 text-xs mr-1 shrink-0" />}
                isInvalid={!!errors.image}
              />
              {errors.image && (
                <span className="text-xs text-red-400 pl-1">{errors.image.message}</span>
              )}
            </div>

            {/* PASSWORD FIELD */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="password" className="text-xs font-semibold text-slate-300">
                Password
              </label>
              <Input
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
                id="password"
                type="password"
                placeholder="••••••"
                variant="primary"
                className="w-full"
                startContent={<FaLock className="text-slate-500 text-xs mr-1 shrink-0" />}
                isInvalid={!!errors.password}
              />
              {errors.password && (
                <span className="text-xs text-red-400 pl-1">{errors.password.message}</span>
              )}
            </div>

            {/* ROLE SELECT FIELD (HeroUI v3 Select Pattern) */}
            <div className="flex flex-col gap-1.5">
              <Controller
                name="role"
                control={control}
                rules={{ required: "Role selection is required" }}
                render={({ field }) => (
                  <Select 
                    className="w-full" 
                    placeholder="Select Account Role"
                    value={field.value}
                    onChange={(val) => field.onChange(val)}
                  >
                    <Label className="text-xs font-semibold text-slate-300">Select Account Role</Label>
                    <Select.Trigger className="rounded-xl border border-white/10 bg-white/5 p-3 flex items-center justify-between text-xs text-slate-200 focus-visible:border-pink-500">
                      <Select.Value />
                      <Select.Indicator />
                    </Select.Trigger>
                    <Select.Popover className="bg-slate-900 border border-white/10 rounded-xl">
                      <ListBox className="p-1">
                        <ListBox.Item id="user" textValue="User" className="text-xs text-slate-200 p-2 hover:bg-white/5 rounded-lg cursor-pointer">
                          User
                        </ListBox.Item>
                        <ListBox.Item id="vendor" textValue="Vendor" className="text-xs text-slate-200 p-2 hover:bg-white/5 rounded-lg cursor-pointer">
                          Vendor
                        </ListBox.Item>
                        <ListBox.Item id="admin" textValue="Admin" className="text-xs text-slate-200 p-2 hover:bg-white/5 rounded-lg cursor-pointer">
                          Admin
                        </ListBox.Item>
                      </ListBox>
                    </Select.Popover>
                  </Select>
                )}
              />
              {errors.role && (
                <span className="text-xs text-red-400 pl-1">{errors.role.message}</span>
              )}
            </div>

            {/* FORM ACTION SUBMIT */}
            <Button
              type="submit"
              isLoading={loading}
              className="w-full h-11 bg-gradient-to-r from-pink-500 to-indigo-600 hover:from-pink-600 hover:to-indigo-700 font-semibold text-xs text-white shadow-lg shadow-pink-500/10 hover:shadow-pink-500/25 transition duration-300"
              radius="xl"
            >
              {loading ? "Creating Account..." : "Create Account"}
            </Button>
          </form>

          {/* DIVIDER ACCENTS */}
          <div className="flex items-center my-5">
            <div className="flex-grow border-t border-white/5" />
            <span className="mx-3 text-[10px] text-slate-500 font-bold tracking-wider">
              OR CONTINUE WITH
            </span>
            <div className="flex-grow border-t border-white/5" />
          </div>

          {/* SOCIAL MEDIA GOOGLE INTEGRATION */}
          <Button
            variant="secondary"
            onPress={handleGoogleSignIn}
            className="w-full h-11 border border-white/10 text-slate-300 hover:text-white hover:bg-white/5 font-semibold text-xs transition duration-200"
            radius="xl"
            startContent={<FaGoogle className="text-xs shrink-0" />}
          >
            Google Account
          </Button>

          {/* FOOTER METRICS */}
          <p className="text-center text-xs text-slate-400 mt-6">
            Already have an account?{" "}
            <Link href="/login" className="text-pink-500 font-bold hover:underline transition ml-1">
              Login here
            </Link>
          </p>
        </Card>
      </Card>
    </div>
  );
}