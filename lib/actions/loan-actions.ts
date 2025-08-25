"use server";

import { prisma } from "@/lib/db";
import { getUserOrRedirect } from "@/lib/auth/server-auth";
import { loanFormSchema, LoanFormData } from "../schemas/loan";
import { redirect } from "next/navigation";
import { PAGES } from "../constants";
import { isRedirectError } from "next/dist/client/components/redirect-error";

function getSerializedData(data: LoanFormData) {
  // Validate data using the same schema as the form
  const validatedData = loanFormSchema.parse(data);

  // Parse numeric values
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

  return {
    ...validatedData,
    amount,
    interestRate,
    termMonths,
    monthlyPayment,
    totalInterest,
    totalAmount,
    startDate,
    endDate,
  };
}

export async function createLoan(data: LoanFormData) {
  try {
    const { user } = await getUserOrRedirect();
    const serializedData = getSerializedData(data);
    await prisma.loan.create({
      data: {
        ...serializedData,
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
      redirect(PAGES.DASHBOARD);
    }

    return loan;
  } catch (error) {
    if (isRedirectError(error)) throw error;
    console.log(error);
    throw error;
  }
}

export async function updateLoanById(id: string, data: LoanFormData) {
  try {
    const { user } = await getUserOrRedirect();

    // Check if loan exists and belongs to user
    const existingLoan = await prisma.loan.findFirst({
      where: {
        id,
        userId: user.id,
      },
    });

    if (!existingLoan) {
      redirect(PAGES.DASHBOARD);
    }

    const serializedData = getSerializedData(data);
    const updatedLoan = await prisma.loan.update({
      where: {
        id,
        userId: user.id,
      },
      data: serializedData,
    });

    return updatedLoan;
  } catch (error) {
    if (isRedirectError(error)) throw error;
    console.log(error);
    throw error;
  }
}

export async function deleteLoanById(id: string) {
  try {
    const { user } = await getUserOrRedirect();

    // Check if loan exists and belongs to user
    const existingLoan = await prisma.loan.findFirst({
      where: {
        id,
        userId: user.id,
      },
    });

    if (!existingLoan) {
      redirect(PAGES.DASHBOARD);
    }

    await prisma.loan.delete({
      where: {
        id,
        userId: user.id,
      },
    });

    return { success: true };
  } catch (error) {
    if (isRedirectError(error)) throw error;
    console.log(error);
    throw error;
  }
}
