import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@radix-ui/react-separator";

export default function EditLoanLoading() {
  return (
    <div>
      <div>
        <header className='flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12'>
          <div className='flex items-center gap-2 px-4'>
            <SidebarTrigger className='-ml-1' />
            <Separator
              orientation='vertical'
              className='mr-2 data-[orientation=vertical]:h-4'
            />
            <div className='flex items-center space-x-2'>
              <Skeleton className='h-4 w-12' />
              <Skeleton className='h-4 w-2' />
              <Skeleton className='h-4 w-16' />
              <Skeleton className='h-4 w-2' />
              <Skeleton className='h-4 w-8' />
            </div>
          </div>
        </header>
      </div>

      <div className='space-y-6 p-4'>
        <div className='flex items-center justify-between'>
          <div>
            <Skeleton className='mb-2 h-8 w-32' />
            <Skeleton className='h-4 w-64' />
          </div>
          <Skeleton className='h-10 w-16' />
        </div>

        <Card>
          <CardHeader>
            <Skeleton className='h-6 w-32' />
          </CardHeader>
          <CardContent className='space-y-6'>
            <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
              {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className='space-y-2'>
                  <Skeleton className='h-4 w-24' />
                  <Skeleton className='h-10 w-full' />
                  <Skeleton className='h-3 w-32' />
                </div>
              ))}
            </div>
            <div className='space-y-2'>
              <Skeleton className='h-4 w-24' />
              <Skeleton className='h-10 w-full' />
              <Skeleton className='h-3 w-48' />
            </div>
            <div className='grid grid-cols-1 gap-6 md:grid-cols-3'>
              {Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className='space-y-2'>
                  <Skeleton className='h-4 w-32' />
                  <Skeleton className='h-10 w-full' />
                  <Skeleton className='h-3 w-24' />
                </div>
              ))}
            </div>
            <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
              {Array.from({ length: 2 }).map((_, index) => (
                <div key={index} className='space-y-2'>
                  <Skeleton className='h-4 w-24' />
                  <Skeleton className='h-10 w-full' />
                  <Skeleton className='h-3 w-32' />
                </div>
              ))}
            </div>
            <div className='flex justify-end'>
              <Skeleton className='h-10 w-24' />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
