import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Shield, BarChart3, CheckCircle, DollarSign } from "lucide-react";
import { PAGES } from "@/lib/constants";

export default function Home() {
  return (
    <div className='min-h-screen bg-gradient-to-br from-background to-muted p-4 md:p-8'>
      <div className='mx-auto max-w-6xl'>
        <main className='flex flex-col items-center text-center'>
          {/* Hero Section */}
          <div className='mb-12 flex flex-col items-center space-y-6'>
            <Badge variant="secondary" className='mb-4 px-4 py-2'>
              AI GENERATED PAGE
            </Badge>
            
            <div className='mb-8 rounded-full bg-primary/10 p-8'>
              <DollarSign className='h-16 w-16 text-primary' aria-hidden='true' />
            </div>
            
            <h1 className='mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl'>
              Welcome to{" "}
              <span className='bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent'>
                Loan Management
              </span>
            </h1>
            
            <p className='mb-8 max-w-2xl text-lg text-muted-foreground sm:text-xl'>
              Streamline your lending operations with our comprehensive loan management system. 
              Create, track, and manage loans with ease and efficiency.
            </p>
            
            <div className='flex flex-col gap-4 sm:flex-row'>
              <Button asChild size='lg' className='group'>
                <Link href={PAGES.DASHBOARD}>
                  Get Started
                  <ArrowRight className='ml-2 h-4 w-4 transition-transform group-hover:translate-x-1' />
                </Link>
              </Button>
              
              <Button variant='outline' size='lg' asChild>
                <Link href={PAGES.LOGIN}>
                  Sign In
                </Link>
              </Button>
            </div>
          </div>
          
          {/* Features Grid */}
          <div className='mt-16 grid w-full grid-cols-1 gap-6 md:grid-cols-3'>
            <Card className='group transition-all duration-200 hover:shadow-lg'>
              <CardHeader>
                <div className='mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-green-100 dark:bg-green-900/20'>
                  <CheckCircle className='h-6 w-6 text-green-600 dark:text-green-400' />
                </div>
                <CardTitle className='text-left'>Easy Management</CardTitle>
              </CardHeader>
              <CardContent>
                <p className='text-left text-muted-foreground'>
                  Create, view, edit, and delete loans with an intuitive interface designed for efficiency
                </p>
              </CardContent>
            </Card>
            
            <Card className='group transition-all duration-200 hover:shadow-lg'>
              <CardHeader>
                <div className='mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/20'>
                  <BarChart3 className='h-6 w-6 text-blue-600 dark:text-blue-400' />
                </div>
                <CardTitle className='text-left'>Comprehensive Tracking</CardTitle>
              </CardHeader>
              <CardContent>
                <p className='text-left text-muted-foreground'>
                  Monitor loan status, payments, and financial calculations with detailed analytics
                </p>
              </CardContent>
            </Card>
            
            <Card className='group transition-all duration-200 hover:shadow-lg'>
              <CardHeader>
                <div className='mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-orange-100 dark:bg-orange-900/20'>
                  <Shield className='h-6 w-6 text-orange-600 dark:text-orange-400' />
                </div>
                <CardTitle className='text-left'>Secure & Reliable</CardTitle>
              </CardHeader>
              <CardContent>
                <p className='text-left text-muted-foreground'>
                  Built with security best practices and robust authentication for peace of mind
                </p>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
