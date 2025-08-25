"use client";

import { LoanForm } from "@/components/Forms/loan-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createLoan } from "@/lib/actions/loan-actions";
import { PAGES } from "@/lib/constants";
import { LoanFormData } from "@/lib/schemas/loan";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function NewLoanPage() {
  const router = useRouter();

  const handleSubmit = async (data: LoanFormData) => {
    try {
      await createLoan({
        amount: data.amount,
        interestRate: data.interestRate,
        termMonths: data.termMonths,
        purpose: data.purpose,
        status: data.status,
        monthlyPayment: data.monthlyPayment,
        totalInterest: data.totalInterest,
        totalAmount: data.totalAmount,
        startDate: data.startDate,
        endDate: data.endDate,
      });

      toast.success("Loan created successfully!");
      router.replace(PAGES.DASHBOARD);
    } catch (error) {
      console.error("Error creating loan:", error);
      toast.error(
        error instanceof Error ? error.message : "Failed to create loan"
      );
    }
  };

  return (
    <div className='container mx-auto py-8'>
      <Card>
        <CardHeader>
          <CardTitle>Create New Loan</CardTitle>
        </CardHeader>
        <CardContent>
          <LoanForm onSubmit={handleSubmit} />
        </CardContent>
      </Card>
    </div>
  );
}
