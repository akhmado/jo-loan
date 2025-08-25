"use client";

import { LoginForm, LoginFormData } from "@/components/Forms/login-form";
import { authClient } from "@/lib/auth/client-auth";
import { PAGES } from "@/lib/constants";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function Page() {
  const router = useRouter();

  const handleLoginSubmit = async (data: LoginFormData) => {
    const { error } = await authClient.signIn.email(data);

    if (error?.message) {
      toast(error.message, { type: "error" });
      return;
    }

    router.replace(PAGES.DASHBOARD);
  };

  return (
    <div className='flex min-h-svh w-full items-center justify-center p-6 md:p-10'>
      <div className='w-full max-w-sm'>
        <LoginForm onSubmit={handleLoginSubmit} />
      </div>
    </div>
  );
}
