import { cookies } from 'next/headers';

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const res = await fetch('https://localhost:7268/api/Auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    const setCookieHeader = res.headers.get('set-cookie');
    const data = await res.json().catch(() => ({}));

    const response = Response.json(data, { status: res.status });

    if (res.ok) {
      if (data.token) {
        const cookieStore = await cookies();
        cookieStore.set('jwtToken', data.token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
          path: '/',
        });
      } else if (setCookieHeader) {
        response.headers.set('Set-Cookie', setCookieHeader);
      }
    }

    return response;
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Internal Server Error';
    return Response.json(
      { message },
      { status: 500 }
    );
  }
}
