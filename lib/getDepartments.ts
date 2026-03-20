import { cookies } from 'next/headers';

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

export async function getDepartmentsFunction() {
  const cookieStore = await cookies();
  const token = cookieStore.get('jwtToken')?.value;

  if (!token) return null;

  const res = await fetch('https://localhost:7268/api/Departments', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) return null;

  return res.json();
}
