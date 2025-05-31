import React from 'react';
import { Input } from '@/components/ui/input';
import { redirect } from 'next/navigation';
import { isUserLogin, loginAction } from '@/serverActions/authActions';
import SubmitButton from '@/components/shared/SubmitButton';

export default async function LoginPage() {
  const isLoggedIn = await isUserLogin();
  if (isLoggedIn) {
    redirect('/users');
  }
  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50'>
      <div className='bg-white p-8 rounded-lg shadow-md w-96'>
        <h1 className='text-2xl font-bold mb-6 text-center'>Login</h1>
        <form action={loginAction}>
          <div className='mb-4'>
            <Input
              type='email'
              placeholder='Email'
              className='w-full'
              required
            />
          </div>
          <div className='mb-6'>
            <Input
              type='password'
              placeholder='Password'
              className='w-full'
              required
            />
          </div>
          <SubmitButton buttonTitle='Login' buttonLoadingTitle='Logging In' />
        </form>
      </div>
    </div>
  );
}
