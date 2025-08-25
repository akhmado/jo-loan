import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function LoanDetailLoading() {
  return (
    <div className='space-y-6 p-4'>
      <div className='flex items-center justify-between'>
        <div>
          <Skeleton className='mb-2 h-8 w-48' />
          <Skeleton className='h-4 w-64' />
        </div>
        <div className='flex gap-2'>
          <Skeleton className='h-10 w-16' />
          <Skeleton className='h-10 w-32' />
        </div>
      </div>

      <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
        {Array.from({ length: 3 }).map((_, index) => (
          <Card key={index}>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <Skeleton className='h-4 w-24' />
              <Skeleton className='h-4 w-4 rounded' />
            </CardHeader>
            <CardContent>
              <Skeleton className='h-8 w-32' />
            </CardContent>
          </Card>
        ))}
      </div>

      <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
        <Card>
          <CardHeader>
            <CardTitle>
              <Skeleton className='h-6 w-32' />
            </CardTitle>
          </CardHeader>
          <CardContent className='space-y-4'>
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className='flex justify-between'>
                <Skeleton className='h-4 w-24' />
                <Skeleton className='h-4 w-32' />
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>
              <Skeleton className='h-6 w-32' />
            </CardTitle>
          </CardHeader>
          <CardContent className='space-y-4'>
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className='flex justify-between'>
                <Skeleton className='h-4 w-24' />
                <Skeleton className='h-4 w-32' />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
