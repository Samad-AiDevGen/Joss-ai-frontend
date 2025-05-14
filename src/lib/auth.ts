// src/lib/auth.ts
import { signIn } from "next-auth/react";

// Function to handle Google sign in
export const signInWithGoogle = async () => {
  try {
    await signIn("google", { callbackUrl: "/dashboard" });
  } catch (error) {
    console.error("Google sign in error:", error);
    throw error;
  }
};