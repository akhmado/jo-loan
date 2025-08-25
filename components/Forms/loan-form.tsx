"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LoanStatus } from "@/lib/generated/prisma";
import { LoanFormData, loanFormSchema } from "@/lib/schemas/loan";

interface LoanFormProps {
  onSubmit: (data: LoanFormData) => Promise<void>;
  initialValues?: Partial<LoanFormData>;
}

export function LoanForm({ onSubmit, initialValues }: LoanFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
  } = useForm<LoanFormData>({
    resolver: zodResolver(loanFormSchema),
    defaultValues: {
      amount: "",
      interestRate: "",
      termMonths: "",
      purpose: "",
      status: LoanStatus.PENDING,
      monthlyPayment: "",
      totalInterest: "",
      totalAmount: "",
      startDate: "",
      endDate: "",
      ...initialValues,
    },
  });

  const statusValue = watch("status");

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='space-y-6'
      aria-label='Loan application form'
      noValidate
    >
      <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
        <div className='grid gap-3'>
          <Label htmlFor='amount'>Loan Amount</Label>
          <Input
            id='amount'
            placeholder='25000'
            type='number'
            step='0.01'
            aria-describedby='amount-error amount-help'
            {...register("amount")}
          />
          <p id='amount-help' className='text-muted-foreground text-xs'>
            Enter the loan amount in dollars
          </p>
          {errors.amount && (
            <p id='amount-error' className='text-sm text-red-500' role='alert'>
              {errors.amount.message}
            </p>
          )}
        </div>

        <div className='grid gap-3'>
          <Label htmlFor='interestRate'>Interest Rate (%)</Label>
          <Input
            id='interestRate'
            placeholder='7.5'
            type='number'
            step='0.01'
            aria-describedby='interestRate-error interestRate-help'
            {...register("interestRate")}
          />
          <p id='interestRate-help' className='text-muted-foreground text-xs'>
            Annual interest rate as a percentage
          </p>
          {errors.interestRate && (
            <p
              id='interestRate-error'
              className='text-sm text-red-500'
              role='alert'
            >
              {errors.interestRate.message}
            </p>
          )}
        </div>

        <div className='grid gap-3'>
          <Label htmlFor='termMonths'>Term (Months)</Label>
          <Input
            id='termMonths'
            placeholder='60'
            type='number'
            aria-describedby='termMonths-error termMonths-help'
            {...register("termMonths")}
          />
          <p id='termMonths-help' className='text-muted-foreground text-xs'>
            Loan term in months (1-480)
          </p>
          {errors.termMonths && (
            <p
              id='termMonths-error'
              className='text-sm text-red-500'
              role='alert'
            >
              {errors.termMonths.message}
            </p>
          )}
        </div>

        <div className='grid gap-3'>
          <Label htmlFor='status'>Status</Label>
          <Select
            onValueChange={(value) => setValue("status", value as LoanStatus)}
            defaultValue={statusValue}
          >
            <SelectTrigger
              id='status'
              aria-describedby='status-error status-help'
            >
              <SelectValue placeholder='Select loan status' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={LoanStatus.PENDING}>Pending</SelectItem>
              <SelectItem value={LoanStatus.APPROVED}>Approved</SelectItem>
              <SelectItem value={LoanStatus.REJECTED}>Rejected</SelectItem>
              <SelectItem value={LoanStatus.ACTIVE}>Active</SelectItem>
              <SelectItem value={LoanStatus.COMPLETED}>Completed</SelectItem>
              <SelectItem value={LoanStatus.DEFAULTED}>Defaulted</SelectItem>
            </SelectContent>
          </Select>
          <p id='status-help' className='text-muted-foreground text-xs'>
            Current loan status
          </p>
          {errors.status && (
            <p id='status-error' className='text-sm text-red-500' role='alert'>
              {errors.status.message}
            </p>
          )}
        </div>
      </div>

      <div className='grid gap-3'>
        <Label htmlFor='purpose'>Purpose (Optional)</Label>
        <Input
          id='purpose'
          placeholder='Home renovation, debt consolidation, etc.'
          aria-describedby='purpose-error purpose-help'
          {...register("purpose")}
        />
        <p id='purpose-help' className='text-muted-foreground text-xs'>
          Brief description of the loan purpose
        </p>
        {errors.purpose && (
          <p id='purpose-error' className='text-sm text-red-500' role='alert'>
            {errors.purpose.message}
          </p>
        )}
      </div>

      <div className='grid grid-cols-1 gap-6 md:grid-cols-3'>
        <div className='grid gap-3'>
          <Label htmlFor='monthlyPayment'>Monthly Payment (Optional)</Label>
          <Input
            id='monthlyPayment'
            placeholder='501.82'
            type='number'
            step='0.01'
            aria-describedby='monthlyPayment-error monthlyPayment-help'
            {...register("monthlyPayment")}
          />
          <p id='monthlyPayment-help' className='text-muted-foreground text-xs'>
            Calculated or estimated monthly payment
          </p>
          {errors.monthlyPayment && (
            <p
              id='monthlyPayment-error'
              className='text-sm text-red-500'
              role='alert'
            >
              {errors.monthlyPayment.message}
            </p>
          )}
        </div>

        <div className='grid gap-3'>
          <Label htmlFor='totalInterest'>Total Interest (Optional)</Label>
          <Input
            id='totalInterest'
            placeholder='5109.20'
            type='number'
            step='0.01'
            aria-describedby='totalInterest-error totalInterest-help'
            {...register("totalInterest")}
          />
          <p id='totalInterest-help' className='text-muted-foreground text-xs'>
            Total interest over loan term
          </p>
          {errors.totalInterest && (
            <p
              id='totalInterest-error'
              className='text-sm text-red-500'
              role='alert'
            >
              {errors.totalInterest.message}
            </p>
          )}
        </div>

        <div className='grid gap-3'>
          <Label htmlFor='totalAmount'>Total Amount (Optional)</Label>
          <Input
            id='totalAmount'
            placeholder='30109.20'
            type='number'
            step='0.01'
            aria-describedby='totalAmount-error totalAmount-help'
            {...register("totalAmount")}
          />
          <p id='totalAmount-help' className='text-muted-foreground text-xs'>
            Total amount to be repaid
          </p>
          {errors.totalAmount && (
            <p
              id='totalAmount-error'
              className='text-sm text-red-500'
              role='alert'
            >
              {errors.totalAmount.message}
            </p>
          )}
        </div>
      </div>

      <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
        <div className='grid gap-3'>
          <Label htmlFor='startDate'>Start Date (Optional)</Label>
          <Input
            id='startDate'
            type='date'
            aria-describedby='startDate-error startDate-help'
            {...register("startDate")}
          />
          <p id='startDate-help' className='text-muted-foreground text-xs'>
            Loan start date
          </p>
          {errors.startDate && (
            <p
              id='startDate-error'
              className='text-sm text-red-500'
              role='alert'
            >
              {errors.startDate.message}
            </p>
          )}
        </div>

        <div className='grid gap-3'>
          <Label htmlFor='endDate'>End Date (Optional)</Label>
          <Input
            id='endDate'
            type='date'
            aria-describedby='endDate-error endDate-help'
            {...register("endDate")}
          />
          <p id='endDate-help' className='text-muted-foreground text-xs'>
            Expected loan end date
          </p>
          {errors.endDate && (
            <p id='endDate-error' className='text-sm text-red-500' role='alert'>
              {errors.endDate.message}
            </p>
          )}
        </div>
      </div>

      <div className='flex justify-end space-x-4'>
        <Button
          type='submit'
          disabled={isSubmitting}
          aria-label={isSubmitting ? "Saving loan..." : "Save loan"}
        >
          {isSubmitting ? "Saving..." : "Save Loan"}
        </Button>
      </div>
    </form>
  );
}
