import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSignIcon, PercentIcon, ClockIcon } from "lucide-react";
import { getDetailedLoanById } from "@/lib/actions/loan-actions";
import Link from "next/link";
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
import { formatDate, sleep } from "@/lib/utils";
import { StatusBadge } from "@/components/status-badge";

interface LoanDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function LoanDetailPage({ params }: LoanDetailPageProps) {
  await sleep(5000);
  const loan = await getDetailedLoanById((await params).id);

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
                  <BreadcrumbPage>{loan.id.slice(-8)}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
      </div>

      <div className='space-y-6 p-4'>
        <div className='flex items-center justify-between'>
          <div>
            <h1 className='text-2xl font-bold'>Loan Details</h1>
            <p className='text-muted-foreground'>ID: {loan.id}</p>
          </div>
          <div className='flex gap-2'>
            <Button variant='outline' asChild>
              <Link href={`/dashboard/loan/${loan.id}/edit`}>Edit</Link>
            </Button>
            <Button variant='outline' asChild>
              <Link href='/dashboard'>Back to Dashboard</Link>
            </Button>
          </div>
        </div>

        <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>Loan Amount</CardTitle>
              <DollarSignIcon className='text-muted-foreground h-4 w-4' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>
                ${loan.amount.toLocaleString()}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>
                Interest Rate
              </CardTitle>
              <PercentIcon className='text-muted-foreground h-4 w-4' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>
                {loan.interestRate.toFixed(2)}%
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>Term</CardTitle>
              <ClockIcon className='text-muted-foreground h-4 w-4' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>{loan.termMonths} months</div>
            </CardContent>
          </Card>
        </div>

        <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
          <Card>
            <CardHeader>
              <CardTitle>Loan Information</CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='flex justify-between'>
                <span className='text-sm font-medium'>Status:</span>
                <StatusBadge status={loan.status} />
              </div>
              <div className='flex justify-between'>
                <span className='text-sm font-medium'>Purpose:</span>
                <span className='text-sm'>
                  {loan.purpose || "Not specified"}
                </span>
              </div>
              <div className='flex justify-between'>
                <span className='text-sm font-medium'>Monthly Payment:</span>
                <span className='font-mono text-sm'>
                  {loan.monthlyPayment
                    ? `$${loan.monthlyPayment.toLocaleString()}`
                    : "Not calculated"}
                </span>
              </div>
              <div className='flex justify-between'>
                <span className='text-sm font-medium'>Total Interest:</span>
                <span className='font-mono text-sm'>
                  {loan.totalInterest
                    ? `$${loan.totalInterest.toLocaleString()}`
                    : "Not calculated"}
                </span>
              </div>
              <div className='flex justify-between'>
                <span className='text-sm font-medium'>Total Amount:</span>
                <span className='font-mono text-sm'>
                  {loan.totalAmount
                    ? `$${loan.totalAmount.toLocaleString()}`
                    : "Not calculated"}
                </span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Important Dates</CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='flex justify-between'>
                <span className='text-sm font-medium'>Created:</span>
                <span className='text-sm'>{formatDate(loan.createdAt)}</span>
              </div>
              <div className='flex justify-between'>
                <span className='text-sm font-medium'>Updated:</span>
                <span className='text-sm'>{formatDate(loan.updatedAt)}</span>
              </div>
              <div className='flex justify-between'>
                <span className='text-sm font-medium'>Start Date:</span>
                <span className='text-sm'>
                  {loan.startDate ? formatDate(loan.startDate) : "Not set"}
                </span>
              </div>
              <div className='flex justify-between'>
                <span className='text-sm font-medium'>End Date:</span>
                <span className='text-sm'>
                  {loan.endDate ? formatDate(loan.endDate) : "Not set"}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
