import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbPage,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@radix-ui/react-separator";
import {
  getDetailedLoanById,
  updateLoanById,
} from "@/lib/actions/loan-actions";
import { LoanFormData } from "@/lib/schemas/loan";
import Link from "next/link";
import { redirect } from "next/navigation";
import { EditLoanForm } from "@/components/Forms/edit-loan-form";
import { isRedirectError } from "next/dist/client/components/redirect-error";

interface EditLoanPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditLoanPage({ params }: EditLoanPageProps) {
  const { id } = await params;

  try {
    const loan = await getDetailedLoanById(id);

    // Convert loan data to form format
    const initialValues: Partial<LoanFormData> = {
      amount: loan.amount.toString(),
      interestRate: loan.interestRate.toString(),
      termMonths: loan.termMonths.toString(),
      purpose: loan.purpose || "",
      status: loan.status,
      monthlyPayment: loan.monthlyPayment?.toString() || "",
      totalInterest: loan.totalInterest?.toString() || "",
      totalAmount: loan.totalAmount?.toString() || "",
      startDate: loan.startDate
        ? new Date(loan.startDate).toISOString().split("T")[0]
        : "",
      endDate: loan.endDate
        ? new Date(loan.endDate).toISOString().split("T")[0]
        : "",
    };

    //I will leave this for sake of demoing the server action, not a fan though :)
    async function handleUpdate(data: LoanFormData) {
      "use server";
      try {
        await updateLoanById(id, data);
        redirect(`/dashboard/loan/${id}`);
      } catch (error) {
        if (isRedirectError(error)) throw error;
        console.error("Failed to update loan:", error);
        throw new Error("Failed to update loan");
      }
    }

    return (
      <div>
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
                    <BreadcrumbLink href={`/dashboard/loan/${id}`}>
                      {id.slice(-8)}
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage>Edit</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          </header>
        </div>

        <div className='space-y-6 p-4'>
          <div className='flex items-center justify-between'>
            <div>
              <h1 className='text-2xl font-bold'>Edit Loan</h1>
              <p className='text-muted-foreground'>
                Modify the details of loan {id.slice(-8)}
              </p>
            </div>
            <div className='flex gap-2'>
              <Button variant='outline' asChild>
                <Link href={`/dashboard/loan/${id}`}>Cancel</Link>
              </Button>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Loan Information</CardTitle>
            </CardHeader>
            <CardContent>
              <EditLoanForm
                onSubmit={handleUpdate}
                initialValues={initialValues}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Failed to load loan:", error);
    redirect("/dashboard");
  }
}
