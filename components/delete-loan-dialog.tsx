"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { deleteLoanById } from "@/lib/actions/loan-actions";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

interface DeleteLoanDialogProps {
  loanId: string;
  loanAmount: string;
  size?: "default" | "sm" | "lg";
}

export function DeleteLoanDialog({
  loanId,
  loanAmount,
  size = 'default'
}: DeleteLoanDialogProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      await deleteLoanById(loanId);
      toast.success("Loan deleted successfully!");
        router.push("/dashboard");
    } catch (error) {
      console.error("Error deleting loan:", error);
      toast.error(
        error instanceof Error ? error.message : "Failed to delete loan"
      );
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button 
          variant={'outline'} 
          aria-label={`Delete loan of ${loanAmount}`}
          className="text-destructive hover:text-destructive"
          size={size}
        >
          <Trash2 className="h-4 w-4" />
          Delete
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent role="dialog" aria-labelledby="delete-dialog-title" aria-describedby="delete-dialog-description">
        <AlertDialogHeader>
          <AlertDialogTitle id="delete-dialog-title">Delete Loan</AlertDialogTitle>
          <AlertDialogDescription id="delete-dialog-description">
            Are you sure you want to delete this loan of{" "}
            <strong>{loanAmount}</strong>? This action cannot be undone and will
            permanently remove the loan from your records.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            disabled={isDeleting}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90 focus:ring-destructive"
            aria-label="Confirm deletion"
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}