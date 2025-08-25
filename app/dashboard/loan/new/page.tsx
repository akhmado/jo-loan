"use client";

import { LoanForm } from "@/components/Forms/loan-form";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { createLoan } from "@/lib/actions/loan-actions";
import { PAGES } from "@/lib/constants";
import { LoanFormData } from "@/lib/schemas/loan";
import { Separator } from "@radix-ui/react-separator";
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
    <div className='container mx-auto px-4'>
      <div>
        <header className='flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12'>
          <div className='flex items-center gap-2 px-4'>
            <SidebarTrigger className='-ml-1' />
            <Separator
              orientation='vertical'
              className='mr-2 data-[orientation=vertical]:h-4'
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href='/dashboard'>Loans</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Create new loan</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
      </div>

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
