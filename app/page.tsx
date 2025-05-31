import { isUserLogin } from '@/serverActions/authActions';
import { redirect } from 'next/navigation';

export default async function Home() {
  const isLogin = await isUserLogin();
  if (isLogin) {
    redirect('/users');
  } else {
    redirect('/login');
  }

  return (
    <div>
      <h1>Tekara home page</h1>
    </div>
  );
}
