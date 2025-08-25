import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { LoanStatus } from "@/lib/generated/prisma";
import { prisma } from "@/lib/db";
import { getUserOrRedirect } from "@/lib/auth/server-auth";
import { ClassNameValue } from "tailwind-merge";

const getStatusBadge = (status: LoanStatus) => {
  const statusColors: Record<LoanStatus, ClassNameValue> = {
    PENDING: "bg-yellow-100 text-yellow-800",
    APPROVED: "bg-blue-100 text-blue-800",
    REJECTED: "bg-red-100 text-red-800",
    ACTIVE: "bg-green-100 text-green-800",
    COMPLETED: "bg-gray-100 text-gray-800",
    DEFAULTED: "bg-red-100 text-red-800",
  };

  return (
    <span
      className={`rounded-full px-2 py-1 text-xs font-medium ${statusColors[status]}`}
    >
      {status}
    </span>
  );
};

export default async function Page() {
  const { user } = await getUserOrRedirect();
  const loans = await prisma.loan.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
  });

  return (
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
              <TableCell>{getStatusBadge(loan.status)}</TableCell>
              <TableCell>{loan.purpose || "-"}</TableCell>
              <TableCell>
                {loan.monthlyPayment
                  ? `$${loan.monthlyPayment.toLocaleString()}`
                  : "-"}
              </TableCell>
              <TableCell className='text-sm text-gray-600'>
                {loan.createdAt.toLocaleDateString()}
              </TableCell>
              <TableCell>
                <div className='flex gap-2'>
                  <Button variant='outline' size='sm'>
                    View
                  </Button>
                  <Button variant='outline' size='sm'>
                    Edit
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
