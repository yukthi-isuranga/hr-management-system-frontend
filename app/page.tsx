import { redirect } from 'next/navigation';

export default async function HomePage() {
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
