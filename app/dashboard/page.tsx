import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { prisma } from "@/lib/db";
import { getUserOrRedirect } from "@/lib/auth/server-auth";
import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { PAGES } from "@/lib/constants";
import { Separator } from "@radix-ui/react-separator";
import { formatDate } from "@/lib/utils";
import { StatusBadge } from "@/components/status-badge";
import { DeleteLoanDialog } from "@/components/delete-loan-dialog";

export default async function Page() {
  const { user } = await getUserOrRedirect();
  const loans = await prisma.loan.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
  });

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
                  <BreadcrumbPage>Loans</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
      </div>

      <div className='px-4'>
        <div className='flex items-center justify-between'>
          <h1 className="text-2xl font-semibold leading-none tracking-tight">Loans</h1>
          <Link href={PAGES.CREATE_NEW_LONE}>
            <Button aria-label="Create a new loan">Create New</Button>
          </Link>
        </div>
        <div>
          <Table 
            role="table" 
            aria-label="List of loans"
            className="mt-4"
          >
            <TableHeader>
              <TableRow>
                <TableHead scope="col">ID</TableHead>
                <TableHead scope="col">Amount</TableHead>
                <TableHead scope="col">Interest Rate</TableHead>
                <TableHead scope="col">Term</TableHead>
                <TableHead scope="col">Status</TableHead>
                <TableHead scope="col">Purpose</TableHead>
                <TableHead scope="col">Monthly Payment</TableHead>
                <TableHead scope="col">Created</TableHead>
                <TableHead scope="col">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loans.map((loan) => (
                <TableRow key={loan.id}>
                  <TableCell className='text-sm text-gray-600'>
                    {loan.id.slice(-8)}
                  </TableCell>
                  <TableCell className='font-medium'>
                    ${loan.amount.toLocaleString()}
                  </TableCell>
                  <TableCell>{loan.interestRate.toFixed(2)}%</TableCell>
                  <TableCell>{loan.termMonths} months</TableCell>
                  <TableCell>
                    <StatusBadge status={loan.status} />
                  </TableCell>
                  <TableCell>{loan.purpose || "-"}</TableCell>
                  <TableCell>
                    {loan.monthlyPayment
                      ? `$${loan.monthlyPayment.toLocaleString()}`
                      : "-"}
                  </TableCell>
                  <TableCell className='text-sm text-gray-600'>
                    {formatDate(loan.createdAt)}
                  </TableCell>
                  <TableCell>
                    <div className='flex gap-2'>
                      <Button variant='outline' asChild>
                        <Link 
                          href={`/dashboard/loan/${loan.id}`}
                          aria-label={`View details for loan ${loan.id.slice(-8)}`}
                        >
                          View
                        </Link>
                      </Button>
                      <Button variant='outline' asChild>
                        <Link 
                          href={`/dashboard/loan/${loan.id}/edit`}
                          aria-label={`Edit loan ${loan.id.slice(-8)}`}
                        >
                          Edit
                        </Link>
                      </Button>
                      <DeleteLoanDialog
                        loanId={loan.id}
                        loanAmount={`$${loan.amount.toLocaleString()}`}
                      />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
