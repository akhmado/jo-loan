"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
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
  const form = useForm<LoanFormData>({
    resolver: zodResolver(loanFormSchema),
    defaultValues: {
      amount: "",
      interestRate: "",
      termMonths: "",
      purpose: "",
      status: "PENDING",
      monthlyPayment: "",
      totalInterest: "",
      totalAmount: "",
      startDate: "",
      endDate: "",
      ...initialValues,
    },
  });

  const isSubmitting = form.formState.isSubmitting;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
        <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
          <FormField
            control={form.control}
            name='amount'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Loan Amount</FormLabel>
                <FormControl>
                  <Input
                    placeholder='25000'
                    type='number'
                    step='0.01'
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Enter the loan amount in dollars
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='interestRate'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Interest Rate (%)</FormLabel>
                <FormControl>
                  <Input
                    placeholder='7.5'
                    type='number'
                    step='0.01'
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Annual interest rate as a percentage
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='termMonths'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Term (Months)</FormLabel>
                <FormControl>
                  <Input placeholder='60' type='number' {...field} />
                </FormControl>
                <FormDescription>Loan term in months (1-480)</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='status'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder='Select loan status' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value={LoanStatus.PENDING}>Pending</SelectItem>
                    <SelectItem value={LoanStatus.APPROVED}>
                      Approved
                    </SelectItem>
                    <SelectItem value={LoanStatus.REJECTED}>
                      Rejected
                    </SelectItem>
                    <SelectItem value={LoanStatus.ACTIVE}>Active</SelectItem>
                    <SelectItem value={LoanStatus.COMPLETED}>
                      Completed
                    </SelectItem>
                    <SelectItem value={LoanStatus.DEFAULTED}>
                      Defaulted
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>Current status</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name='purpose'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Purpose (Optional)</FormLabel>
              <FormControl>
                <Input
                  placeholder='Home renovation, debt consolidation, etc.'
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Brief description of the loan purpose
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className='grid grid-cols-1 gap-6 md:grid-cols-3'>
          <FormField
            control={form.control}
            name='monthlyPayment'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Monthly Payment (Optional)</FormLabel>
                <FormControl>
                  <Input
                    placeholder='501.82'
                    type='number'
                    step='0.01'
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Calculated or estimated monthly payment
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='totalInterest'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Total Interest (Optional)</FormLabel>
                <FormControl>
                  <Input
                    placeholder='5109.20'
                    type='number'
                    step='0.01'
                    {...field}
                  />
                </FormControl>
                <FormDescription>Total interest over loan term</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='totalAmount'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Total Amount (Optional)</FormLabel>
                <FormControl>
                  <Input
                    placeholder='30109.20'
                    type='number'
                    step='0.01'
                    {...field}
                  />
                </FormControl>
                <FormDescription>Total amount to be repaid</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
          <FormField
            control={form.control}
            name='startDate'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Start Date (Optional)</FormLabel>
                <FormControl>
                  <Input type='date' {...field} />
                </FormControl>
                <FormDescription>Loan start date</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='endDate'
            render={({ field }) => (
              <FormItem>
                <FormLabel>End Date (Optional)</FormLabel>
                <FormControl>
                  <Input type='date' {...field} />
                </FormControl>
                <FormDescription>Expected loan end date</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className='flex justify-end space-x-4'>
          <Button type='submit' disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : "Save Loan"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
