import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
import { PAGES } from "@/lib/constants";

const signupSchema = z
  .object({
    firstName: z
      .string()
      .min(1, "First name is required")
      .min(2, "First name must be at least 2 characters"),
    lastName: z
      .string()
      .min(1, "Last name is required")
      .min(2, "Last name must be at least 2 characters"),
    email: z.string().email({ message: "Please enter a valid email address" }),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        "Password must contain at least one uppercase letter, one lowercase letter, and one number"
      ),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export type SignupFormData = z.infer<typeof signupSchema>;

interface SignupFormProps
  extends Omit<React.ComponentProps<"div">, "onSubmit"> {
  onSubmit: (data: SignupFormData) => Promise<void>;
}

export function SignupForm({ className, onSubmit, ...props }: SignupFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Create your account</CardTitle>
          <CardDescription>
            Enter your information below to create your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={handleSubmit(onSubmit)}
            aria-label='Sign up form'
            noValidate
          >
            <div className='flex flex-col gap-6'>
              <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
                <div className='grid gap-3'>
                  <Label htmlFor='firstName'>First Name</Label>
                  <Input
                    id='firstName'
                    type='text'
                    placeholder='John'
                    aria-describedby='firstName-error'
                    {...register("firstName")}
                  />
                  {errors.firstName && (
                    <p
                      id='firstName-error'
                      className='text-sm text-red-500'
                      role='alert'
                    >
                      {errors.firstName.message}
                    </p>
                  )}
                </div>
                <div className='grid gap-3'>
                  <Label htmlFor='lastName'>Last Name</Label>
                  <Input
                    id='lastName'
                    type='text'
                    placeholder='Doe'
                    aria-describedby='lastName-error'
                    {...register("lastName")}
                  />
                  {errors.lastName && (
                    <p
                      id='lastName-error'
                      className='text-sm text-red-500'
                      role='alert'
                    >
                      {errors.lastName.message}
                    </p>
                  )}
                </div>
              </div>

              <div className='grid gap-3'>
                <Label htmlFor='email'>Email</Label>
                <Input
                  id='email'
                  type='email'
                  placeholder='john.doe@example.com'
                  aria-describedby='email-error'
                  {...register("email")}
                />
                {errors.email && (
                  <p
                    id='email-error'
                    className='text-sm text-red-500'
                    role='alert'
                  >
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div className='grid gap-3'>
                <Label htmlFor='password'>Password</Label>
                <Input
                  id='password'
                  type='password'
                  placeholder='Create a strong password'
                  aria-describedby='password-error password-help'
                  {...register("password")}
                />
                <p id='password-help' className='text-muted-foreground text-xs'>
                  Must be at least 8 characters with uppercase, lowercase, and
                  number
                </p>
                {errors.password && (
                  <p
                    id='password-error'
                    className='text-sm text-red-500'
                    role='alert'
                  >
                    {errors.password.message}
                  </p>
                )}
              </div>

              <div className='grid gap-3'>
                <Label htmlFor='confirmPassword'>Confirm Password</Label>
                <Input
                  id='confirmPassword'
                  type='password'
                  placeholder='Confirm your password'
                  aria-describedby='confirmPassword-error'
                  {...register("confirmPassword")}
                />
                {errors.confirmPassword && (
                  <p
                    id='confirmPassword-error'
                    className='text-sm text-red-500'
                    role='alert'
                  >
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>

              <div className='flex flex-col gap-3'>
                <Button
                  type='submit'
                  className='w-full'
                  disabled={isSubmitting}
                  aria-label={
                    isSubmitting ? "Creating account..." : "Create account"
                  }
                >
                  {isSubmitting ? "Creating Account..." : "Create Account"}
                </Button>
              </div>
            </div>
            <div className='mt-4 text-center text-sm'>
              Already have an account?{" "}
              <Link href={PAGES.LOGIN} className='underline underline-offset-4'>
                Sign in
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
