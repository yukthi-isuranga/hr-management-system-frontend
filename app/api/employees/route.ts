import { cookies } from 'next/headers';

// Allow self-signed certs for local C# ASP.NET development
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('jwtToken')?.value;

    if (!token) {
      return new Response(JSON.stringify({ error: 'No token' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const res = await fetch('https://localhost:7268/api/Employees', {
      headers: { Authorization: `Bearer ${token}` },
      cache: 'no-store',
    });

    if (!res.ok) {
      const errText = await res.text().catch(() => '');
      return new Response(
        JSON.stringify({
          error: 'Failed upstream',
          status: res.status,
          details: errText,
        }),
        {
          status: res.status,
          headers: { 'Content-Type': 'application/json' },
        },
      );
    }

    const data = await res.json();
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err: unknown) {
    console.error('DEPARTMENTS FETCH ERROR:', err);
    const message = err instanceof Error ? err.message : 'Unknown error';
    return new Response(
      JSON.stringify({ error: 'Internal Server Error', message }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      },
    );
  }
}
