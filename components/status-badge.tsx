import { LoanStatus } from "@/lib/generated/prisma";
import { ClassNameValue } from "tailwind-merge";

interface StatusBadgeProps {
  status: LoanStatus;
}

const statusColors: Record<LoanStatus, ClassNameValue> = {
  PENDING: "bg-yellow-100 text-yellow-800 hover:bg-yellow-200",
  APPROVED: "bg-blue-100 text-blue-800 hover:bg-blue-200",
  REJECTED: "bg-red-100 text-red-800 hover:bg-red-200",
  ACTIVE: "bg-green-100 text-green-800 hover:bg-green-200",
  COMPLETED: "bg-gray-100 text-gray-800 hover:bg-gray-200",
  DEFAULTED: "bg-red-100 text-red-800 hover:bg-red-200",
};

export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span
      className={`rounded-full px-2 py-1 text-xs font-medium ${statusColors[status]}`}
    >
      {status}
    </span>
  );
}
