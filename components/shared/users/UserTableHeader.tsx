'use client';

import React, { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { useRouter, useSearchParams } from 'next/navigation';
import { debounce } from '@/lib/utils';

export default function UsersHeader() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialSearch = searchParams.get('name') || '';

  const [search, setSearch] = useState(initialSearch);

  // Debounced URL update
  useEffect(() => {
    const handler = debounce(() => {
      const params = new URLSearchParams(window.location.search);
      if (search) {
        params.set('name', search);
      } else {
        params.delete('name');
      }
      router.push(`?${params.toString()}`);
    }, 500); // 500ms debounce

    handler();

    return () => handler.cancel?.();
  }, [search, router]);

  return (
    <div className="flex items-center justify-between mb-4">
      <h2 className="hidden md:block text-2xl font-semibold">Users Listing</h2>
      <h2 className="block md:hidden md:text-2xl text-lg font-semibold">Users </h2>
      <Input
        type="text"
        placeholder="Search by user name"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="md:w-80 w-[50%]"
      />
    </div>
  );
}
