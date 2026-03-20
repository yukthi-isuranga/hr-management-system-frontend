'use client';

import { toast } from 'sonner';
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';

export const LogOutButton = () => {
  const router = useRouter();

  return <Button onClick={() => LogOutFunction(router)}>Log Out</Button>;
};

export const LogOutFunction = async (router: ReturnType<typeof useRouter>) => {
  try {
    const res = await fetch('http://localhost:5001/auth/logout', {
      method: 'POST',
      credentials: 'include', // important if JWT is in cookie
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const result = await res.json();

    if (!res.ok) {
      toast.error(result.message || 'Logout failed');
      return;
    }

    toast.success(result.message || 'Logged out successfully');
    localStorage.removeItem('jwtToken');

    // Redirect user to login page
    router.push('/'); // soft navigation
    // If you want a full reload: window.location.href = '/';
  } catch (err) {
    console.error(err);
    toast.error('Something went wrong!');
  }
};
