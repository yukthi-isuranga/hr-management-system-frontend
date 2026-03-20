import { cookies } from 'next/headers';

// Allow self-signed certs for local development
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

interface Params {
  depId: string;
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<Params> },
) {
  try {
    const { depId } = await params;

    if (!depId) {
      return new Response(
        JSON.stringify({ error: 'depId is required in URL' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } },
      );
    }

    // Parse updated employee data from request body
    const body = await request.json();

    // Get JWT token from cookies
    const cookieStore = await cookies();
    const token = cookieStore.get('jwtToken')?.value;

    if (!token) {
      return new Response(JSON.stringify({ error: 'No token' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const cleanToken = token.replace(/^"(.*)"$/, '$1');
    const headersList = await import('next/headers').then((m) => m.headers());
    const fullCookieStr = headersList.get('cookie') || '';

    // Send PUT request to your ASP.NET API
    const res = await fetch(`https://localhost:7268/api/Departments/${depId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${cleanToken}`,
        Cookie: fullCookieStr,
        Accept: 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const errText = await res.text().catch(() => '');
      return new Response(
        JSON.stringify({
          error: 'Failed upstream',
          status: res.status,
          details: errText,
        }),
        { status: res.status, headers: { 'Content-Type': 'application/json' } },
      );
    }

    const data = await res.json();
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err: unknown) {
    console.error('Department UPDATE ERROR:', err);
    const message = err instanceof Error ? err.message : 'Unknown error';
    return new Response(
      JSON.stringify({ error: 'Internal Server Error', message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } },
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<Params> },
) {
  try {
    const { depId } = await params;

    if (!depId) {
      return new Response(
        JSON.stringify({ error: 'depId is required in URL' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } },
      );
    }

    // Parse updated Department data from request body
    // const body = await request.json();

    // Get JWT token from cookies
    const cookieStore = await cookies();
    const token = cookieStore.get('jwtToken')?.value;

    if (!token) {
      return new Response(JSON.stringify({ error: 'No token' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const cleanToken = token.replace(/^"(.*)"$/, '$1');
    const headersList = await import('next/headers').then((m) => m.headers());
    const fullCookieStr = headersList.get('cookie') || '';

    // Send DELETE request to your ASP.NET API
    const res = await fetch(
      `https://localhost:7268/api/Departments/${depId}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${cleanToken}`,
          Cookie: fullCookieStr,
          Accept: 'application/json',
        },
        // body: JSON.stringify(body),
      },
    );

    if (!res.ok) {
      const errText = await res.text().catch(() => '');
      return new Response(
        JSON.stringify({
          error: 'Failed upstream',
          status: res.status,
          details: errText,
        }),
        { status: res.status, headers: { 'Content-Type': 'application/json' } },
      );
    }

    const data = await res.json();
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err: unknown) {
    console.error('EMPLOYEE UPDATE ERROR:', err);
    const message = err instanceof Error ? err.message : 'Unknown error';
    return new Response(
      JSON.stringify({ error: 'Internal Server Error', message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } },
    );
  }
}
