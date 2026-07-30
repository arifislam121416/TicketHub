import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  /** 
   * Vercel ENV থেকে URL নিবে। 
   * ব্রাউজারে থাকলে fallback হিসেবে window.location.origin ব্যবহার করবে 
   * যাতে কোনো অবস্থাতেই localhost-এ রিকোয়েস্ট না যায়।
   */
  baseURL:
    process.env.NEXT_PUBLIC_BETTER_AUTH_URL ||
    (typeof window !== "undefined" ? window.location.origin : ""),
});

// আলাদা করে createAuthClient() কল না করে authClient থেকেই মেথডগুলো destructure করুন
export const { signIn, signUp, signOut, useSession } = authClient;