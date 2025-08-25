"use client";

import { SignupForm, SignupFormData } from "@/components/Forms/signup-form";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { PAGES } from "@/lib/constants";
import { authClient } from "@/lib/auth/client-auth";

export default function SignUpPage() {
  const router = useRouter();

  const handleSignup = async (data: SignupFormData) => {
    try {
      const response = await authClient.signUp.email({
        email: data.email,
        password: data.password,
        name: `${data.firstName} ${data.lastName}`,
      });

      if (response.error) {
        throw new Error(response.error.message || "Failed to create account");
      }

      toast.success("Account created successfully! Please log in.");
      router.push(PAGES.LOGIN);
    } catch (error) {
      console.error("Signup error:", error);
      toast.error(
        error instanceof Error ? error.message : "Failed to create account"
      );
    }
  };

  return (
    <main className='flex min-h-svh w-full items-center justify-center p-6 md:p-10'>
      <div className='w-full max-w-md'>
        <SignupForm onSubmit={handleSignup} />
      </div>
    </main>
  );
}
