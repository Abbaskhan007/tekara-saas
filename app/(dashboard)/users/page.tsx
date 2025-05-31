import UserTableHeader from '@/components/shared/users/UserTableHeader';
import UsersTable from '@/components/shared/users/UsersTable';
import { getUsersAction } from '@/serverActions/userActions';
import React from 'react';

type SearchParams = Promise<{ [key: string]: string | undefined }>;

export default async function UsersListing({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const queryParams = await searchParams;
  const users = await getUsersAction(queryParams.name);

  return (
    <div className=''>
      <UserTableHeader />
      <UsersTable users={users} />
    </div>
  );
}
