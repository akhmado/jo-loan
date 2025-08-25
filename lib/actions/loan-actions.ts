"use server";

import { prisma } from "@/lib/db";
import { getUserOrRedirect } from "@/lib/auth/server-auth";
import { loanFormSchema, LoanFormData } from "../schemas/loan";
import { notFound } from "next/navigation";

export async function createLoan(data: LoanFormData) {
  try {
    const { user } = await getUserOrRedirect();

    // Validate data using the same schema as the form
    const validatedData = loanFormSchema.parse(data);

    // // Parse numeric values
    const amount = parseFloat(validatedData.amount);
    const interestRate = parseFloat(validatedData.interestRate);
    const termMonths = parseInt(validatedData.termMonths);

    // Parse optional numeric fields
    const monthlyPayment = validatedData.monthlyPayment
      ? parseFloat(validatedData.monthlyPayment)
      : null;
    const totalInterest = validatedData.totalInterest
      ? parseFloat(validatedData.totalInterest)
      : null;
    const totalAmount = validatedData.totalAmount
      ? parseFloat(validatedData.totalAmount)
      : null;

    // Parse optional dates
    const startDate = validatedData.startDate
      ? new Date(validatedData.startDate)
      : null;
    const endDate = validatedData.endDate
      ? new Date(validatedData.endDate)
      : null;

    await prisma.loan.create({
      data: {
        amount,
        interestRate,
        termMonths,
        purpose: validatedData.purpose || null,
        status: validatedData.status,
        monthlyPayment,
        totalInterest,
        totalAmount,
        startDate,
        endDate,
        userId: user.id,
      },
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getDetailedLoanById(id: string) {
  try {
    const { user } = await getUserOrRedirect();

    const loan = await prisma.loan.findFirst({
      where: {
        id,
        userId: user.id,
      },
    });

    if (!loan) {
      return notFound();
    }

    return loan;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
