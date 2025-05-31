'use client';

import { Button } from '@/components/ui/button';
import { redirect } from 'next/navigation';
import { LogOut } from 'lucide-react';
import { logoutAction } from '@/serverActions/authActions';

export default function Navbar() {
  const handleLogout = async () => {
    await logoutAction();
    redirect('/login');
  };

  return (
    <header className='bg-white border-b shadow-sm md:px-10 px-4 py-5 flex items-center justify-between'>
      <h1 className='text-3xl font-bold tracking-tight text-gray-800'>
        Tekara
      </h1>

      {/* Logout Button */}
      <Button variant='outline' onClick={handleLogout} className='gap-2'>
        <LogOut className='w-4 h-4' />
        Logout
      </Button>
    </header>
  );
}
