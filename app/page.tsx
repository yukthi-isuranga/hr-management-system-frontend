import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

export default async function HomePage() {
  const cookieStore = await cookies();
  if (cookieStore.has('jwtToken')) {
    redirect('/dashboard');
  }

  return redirect('auth/login');

  // if (!user) {
  //   redirect('auth/login');
  // }

  // if (user.role === 'Admin') {
  //   redirect('/admin/dashboard');
  // }

  // if (user.role === 'HR') {
  //   redirect('/caregivers/dashboard');
  // }

  // if (user.role === 'User') {
  //   redirect('/caretakers/dashboard');
  // }
}
