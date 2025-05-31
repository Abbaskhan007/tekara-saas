// app/users/loading.tsx
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import UserTableHeader from '@/components/shared/users/UserTableHeader';

export default function UsersLoading() {
  return (
    <div className='space-y-4'>
      <UserTableHeader />

      <Card className='shadow-md border border-gray-200 rounded-lg'>
        <CardContent className='p-6'>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className='w-[60px]'>#</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>City</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[...Array(10)].map((_, i) => (
                <TableRow key={i}>
                  <TableCell>
                    <Skeleton className='h-9 md:w-32 w-20' />
                  </TableCell>
                  <TableCell>
                    <Skeleton className='h-9 md:w-40 w-24' />
                  </TableCell>
                  <TableCell>
                    <Skeleton className='h-9 md:w-40 w-24' />
                  </TableCell>
                  <TableCell>
                    <Skeleton className='h-9 md:w-40 w-24' />
                  </TableCell>
                  <TableCell>
                    <Skeleton className='h-9 md:w-40 w-24' />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
