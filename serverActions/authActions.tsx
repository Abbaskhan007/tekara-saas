'use server';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export const loginAction = async () => {
  
  const cookieStore = await cookies();
  cookieStore.set({
    name: 'auth',
    value: 'true',
    httpOnly: true,
    path: '/',
  });

  // Redirect to dashboard
  redirect('/users');
};

export const logoutAction = async () => {
  const cookieStore = await cookies();
  cookieStore.delete('auth');
};

export const isUserLogin = async () => {
  const cookieStore = await cookies();
  const authCookie = cookieStore.get('auth');
  return !!authCookie;
};
