import { cookies } from 'next/headers';

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

export async function POST(req: Request) {
  try {
    const cookieStore = await cookies();
    cookieStore.delete('jwtToken');

    // Attempt to invoke the backend logout endpoint if it exists
    await fetch('https://localhost:7268/api/Auth/logout', {
      method: 'POST',
    }).catch(() => null);

    return Response.json({ message: 'Logged out successfully' });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Error logging out';
    return Response.json(
      { message },
      { status: 500 }
    );
  }
}
