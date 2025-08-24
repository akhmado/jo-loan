import z from "zod";
import { LoanStatus } from "../generated/prisma";

export type LoanFormData = z.infer<typeof loanFormSchema>;

export const loanFormSchema = z.object({
  amount: z
    .string()
    .min(1, "Amount is required")
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
      message: "Amount must be a positive number",
    }),
  interestRate: z
    .string()
    .min(1, "Interest rate is required")
    .refine(
      (val) => !isNaN(Number(val)) && Number(val) > 0 && Number(val) <= 100,
      {
        message: "Interest rate must be between 0 and 100",
      }
    ),
  termMonths: z
    .string()
    .min(1, "Term is required")
    .refine(
      (val) => !isNaN(Number(val)) && Number(val) > 0 && Number(val) <= 480,
      {
        message: "Term must be between 1 and 480 months",
      }
    ),
  purpose: z.string().optional(),
  status: z
    .enum([
      LoanStatus.PENDING,
      LoanStatus.APPROVED,
      LoanStatus.REJECTED,
      LoanStatus.ACTIVE,
      LoanStatus.COMPLETED,
      LoanStatus.DEFAULTED,
    ])
    .default(LoanStatus.PENDING),
  monthlyPayment: z
    .string()
    .optional()
    .refine((val) => !val || (!isNaN(Number(val)) && Number(val) > 0), {
      message: "Monthly payment must be a positive number",
    }),
  totalInterest: z
    .string()
    .optional()
    .refine((val) => !val || (!isNaN(Number(val)) && Number(val) >= 0), {
      message: "Total interest must be a positive number",
    }),
  totalAmount: z
    .string()
    .optional()
    .refine((val) => !val || (!isNaN(Number(val)) && Number(val) > 0), {
      message: "Total amount must be a positive number",
    }),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
});
