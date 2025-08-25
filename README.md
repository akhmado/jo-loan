# Loan Management Application

A full-stack Next.js application that allows lenders to create, view, and manage loans.

## Features

### 🏦 Loan Management
- **Create Loans**: Add new loan applications with details
- **View Loans**: Browse all loans in a responsive table
- **Edit Loans**: Update existing loan information
- **Delete Loans**: Remove loans with confirmation dialogs
- **Loan Details**: View comprehensive loan information

### 🔐 Authentication & Security
- **User Registration**: Sign up with first name, last name, email, and secure password
- **User Login**: Secure authentication with better-auth
- **Session Management**: Persistent login sessions
- **Protected Routes**: Dashboard and loan management require authentication

### 🎨 User Interface
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Accessibility**: WCAG-compliant with proper ARIA labels and keyboard navigation
- **Modern UI**: Built with Tailwind CSS and shadcn/ui components
- **Empty States**: Helpful guidance when no entities are available
- **Loading States**: Skeleton loaders and loading indicators for better UX

### 📊 Loan Features
- **Comprehensive Data**: Track amount, interest rate, term, status, purpose, and dates
- **Status Management**: Pending, Approved, Rejected, Active, Completed, Defaulted
- **Financial Calculations**: Optional fields for monthly payment, total interest, and total amount
- **Date Tracking**: Start and end dates for loan periods
- **Status Badges**: Visual indicators for loan status with descriptions

## Tech Stack

- **Framework**: Next.js 15.5.0 with App Router
- **Authentication**: better-auth with email/password
- **Database**: PostgreSQL with Prisma ORM
- **UI Components**: shadcn/ui with Radix UI primitives
- **Styling**: Tailwind CSS with custom design system
- **Forms**: React Hook Form with Zod validation
- **TypeScript**: Full type safety throughout the application
- **Icons**: Lucide React icons

## Getting Started

### Prerequisites

- Node.js 18+ 
- PostgreSQL database
- pnpm (recommended) or npm

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd jo-loan
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   # or
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory (you could use .example.env as the starting point):
   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/jo_loan"
   BETTER_AUTH_SECRET="your-secret-key-here"
   ```

4. **Set up the database**
   
   **Option A: Use your own PostgreSQL database**
   ```bash
   # Generate Prisma client
   pnpm prisma generate
   
   # Run database migrations
   pnpm prisma migrate deploy
   
   # (Optional) Seed the database
   pnpm prisma db seed
   ```
   
   **Option B: Use Prisma's development database (easier for development)**
   ```bash
   # Start Prisma development database
   pnpm dev:db:start
   
   # Generate Prisma client
   pnpm prisma generate
   
   # Run database migrations
   pnpm prisma migrate dev
   ```

5. **Start the development server**
   ```bash
   pnpm dev
   ```

6. **Open the application**
   
   Navigate to [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
jo-loan/
├── app/                    # Next.js app directory
│   ├── api/               # API routes (better-auth)
│   ├── dashboard/         # Dashboard pages
│   ├── login/            # Login page
│   ├── signup/           # Signup page
│   └── layout.tsx        # Root layout
├── components/            # React components
│   ├── Forms/            # Form components
│   ├── ui/              # shadcn/ui components
│   └── delete-loan-dialog.tsx
├── lib/                  # Utility libraries
│   ├── actions/         # Server actions
│   ├── auth/           # Authentication logic
│   ├── schemas/        # Zod validation schemas
│   └── utils.ts        # Utility functions
├── prisma/             # Database schema and migrations
└── public/            # Static assets
```

## Database Schema

### User Model
- ID, name, email, email verification
- Sessions and accounts for authentication

### Loan Model
- Financial details (amount, interest rate, term)
- Status tracking (pending, approved, active, etc.)
- Optional calculations (monthly payment, total interest)
- Date tracking (start date, end date, created/updated)
- User association for data isolation

## Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint
- `pnpm prettier` - Check code formatting
- `pnpm prettier:fix` - Fix code formatting
- `pnpm dev:db:start` - Start Prisma development database
- `pnpm dev:db:studio` - Open Prisma Studio
- `pnpm generate-auth-tables` - Generate better-auth database tables
- `pnpm create-user` - Run user creation script

## Authentication

The application uses better-auth for secure authentication:
- Email/password registration and login
- Session management with secure cookies
- Protected routes with middleware
- User data isolation

## Deployment

### Environment Setup
Ensure all environment variables are properly configured for production:
- `DATABASE_URL` - PostgreSQL connection string
- `BETTER_AUTH_SECRET` - Secure random string for auth

### Database Deployment
1. Set up PostgreSQL database
2. Run migrations: `pnpm prisma migrate deploy`
3. Generate client: `pnpm prisma generate`

## Acknowledgments

Special thanks to my fellow colleagues **Claude Code** and **Cursor** for their invaluable contributions to this project :)

