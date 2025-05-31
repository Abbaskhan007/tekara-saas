'use client';
import React, { useEffect, useState } from 'react';
import { type User } from '@/types/userType';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent } from '@/components/ui/card';
import EditUserModal from './EditUserModal';

export default function UsersTable({ users }: { users: User[] }) {
  const [usersList, setUsersList] = useState(users);

  useEffect(() => {
    setUsersList(users);
  }, [users]);
  
  return (
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
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {usersList.map((user, index) => (
              <TableRow
                key={user.id}
                className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}
              >
                <TableCell className='font-semibold text-sm text-gray-700'>
                  {user.id}
                </TableCell>
                <TableCell className='text-sm'>{user.name}</TableCell>
                <TableCell className='text-sm text-blue-700'>
                  {user.email}
                </TableCell>
                <TableCell className='text-sm'>{user.company.name}</TableCell>
                <TableCell className='text-sm'>{user.address.city}</TableCell>
                <TableCell>
                  <EditUserModal
                    user={user}
                    users={usersList}
                    setUsers={setUsersList}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
