"use client";

import { LoanForm } from "@/components/Forms/loan-form";
import { LoanFormData } from "@/lib/schemas/loan";

interface EditLoanFormProps {
  onSubmit: (data: LoanFormData) => Promise<void>;
  initialValues?: Partial<LoanFormData>;
}

export function EditLoanForm({ onSubmit, initialValues }: EditLoanFormProps) {
  return <LoanForm onSubmit={onSubmit} initialValues={initialValues} />;
}
