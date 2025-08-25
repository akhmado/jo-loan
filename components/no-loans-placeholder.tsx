import { PAGES } from "@/lib/constants";
import { Button } from "./ui/button";
import Link from "next/link";
import { DollarSignIcon } from "lucide-react";

export default function NoLoansPlaceholder() {
  return (
    <div className='mt-8 py-12 text-center'>
      <div className='bg-muted mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full'>
        <DollarSignIcon size={40} className='text-muted-foreground' />
      </div>
      <h2 className='text-foreground mb-2 text-xl font-semibold'>
        No loans yet
      </h2>
      <p className='text-muted-foreground mx-auto mb-6 max-w-md'>
        Get started by creating your first loan application. Track amounts,
        interest rates, and manage your loan portfolio all in one place.
      </p>
      <Link href={PAGES.CREATE_NEW_LONE}>
        <Button size='lg' className='px-6'>
          Create your first loan
        </Button>
      </Link>
    </div>
  );
}
