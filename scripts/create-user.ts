import * as readline from "readline";
import { auth } from "@/lib/auth/server-auth";
import { PrismaClient } from "@/lib/generated/prisma";

const prisma = new PrismaClient();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function askQuestion(question: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
}

async function createUser() {
  console.log("Creating user...");

  const email = await askQuestion("Enter email: ");

  // Check if email already exists
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    console.error("Error: Email already in use");
    await prisma.$disconnect();
    rl.close();
    return;
  }

  const password = await askQuestion("Enter password: ");
  const firstName = await askQuestion("Enter first name: ");
  const lastName = await askQuestion("Enter last name: ");

  const body = {
    email,
    password,
    name: `${firstName} ${lastName}`,
  };

  try {
    await auth.api.signUpEmail({
      body,
    });
    console.log("User created successfully:", email);
  } catch (error) {
    console.error("Error creating user:", error);
  } finally {
    await prisma.$disconnect();
    rl.close();
  }
}

createUser();
