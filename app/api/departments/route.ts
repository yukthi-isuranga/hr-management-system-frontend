import { cookies } from 'next/headers';

// Allow self-signed certs for local C# ASP.NET development
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

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

    const res = await fetch('https://localhost:7268/api/Departments', {
      headers: { Authorization: `Bearer ${token}` },
      cache: 'no-store',
    });

    if (!res.ok) {
      const errText = await res.text().catch(() => '');
      return new Response(JSON.stringify({ error: 'Failed upstream', status: res.status, details: errText }), {
        status: res.status,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const data = await res.json();
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err: unknown) {
    console.error('DEPARTMENTS FETCH ERROR:', err);
    const message = err instanceof Error ? err.message : 'Unknown error';
    return new Response(JSON.stringify({ error: 'Internal Server Error', message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const cookieStore = await cookies();
    const token = cookieStore.get('jwtToken')?.value;

    if (!token) {
      return new Response(JSON.stringify({ error: 'No token' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const cleanToken = token.replace(/^"(.*)"$/, '$1');
    const headersList = await import('next/headers').then(m => m.headers());
    const fullCookieStr = headersList.get('cookie') || '';

    const res = await fetch('https://localhost:7268/api/Departments', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        Authorization: `Bearer ${cleanToken}`,
        Cookie: fullCookieStr,
        Accept: 'application/json'
      },
      body: JSON.stringify(body),
      cache: 'no-store',
    });

    if (!res.ok) {
      const errText = await res.text().catch(() => '');
      return new Response(JSON.stringify({ error: 'Failed upstream', status: res.status, details: errText }), {
        status: res.status,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const data = await res.json().catch(() => ({}));
    return new Response(JSON.stringify(data), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err: unknown) {
    console.error('DEPARTMENTS CREATION ERROR:', err);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
