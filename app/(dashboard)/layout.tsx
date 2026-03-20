import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import ClientCareTakerLayout from './client-layout';

export default async function CareTakerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const token = cookieStore.get('jwtToken')?.value;

  if (!token) {
    redirect('/');
  }

  return <ClientCareTakerLayout>{children}</ClientCareTakerLayout>;
}
