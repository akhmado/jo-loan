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
import { CardTitle } from "@/components/ui/card";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { PAGES } from "@/lib/constants";
import { Separator } from "@radix-ui/react-separator";
import { formatDate } from "@/lib/utils";
import { StatusBadge } from "@/components/status-badge";

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
          <CardTitle>Loans</CardTitle>
          <Link href={PAGES.CREATE_NEW_LONE}>
            <Button>Create New</Button>
          </Link>
        </div>
        <div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Interest Rate</TableHead>
                <TableHead>Term</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Purpose</TableHead>
                <TableHead>Monthly Payment</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Actions</TableHead>
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
                      <Button variant='outline' size='sm' asChild>
                        <Link href={`/dashboard/loan/${loan.id}`}>View</Link>
                      </Button>
                      <Button variant='outline' size='sm' asChild>
                        <Link href={`/dashboard/loan/${loan.id}/edit`}>
                          Edit
                        </Link>
                      </Button>
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
