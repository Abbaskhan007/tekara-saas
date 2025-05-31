import Navbar from '@/components/shared/Navbar';
import { isUserLogin } from '@/serverActions/authActions';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
    title: 'Tekara - Dashboard',
    description: 'Tekarak app dashboard',
  };

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isLoggedIn = await isUserLogin();
  if (!isLoggedIn) {
    redirect('/login');
  }
  return (
    <>
      <Navbar />
      <main className='p-4 md:px-10 md:py-6'>{children}</main>
    </>
  );
}
