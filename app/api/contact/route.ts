import { sendContactEmail } from '@/lib/contact';

export async function POST(req: Request) {
  let body: { name?: string; email?: string; message?: string; hp?: string };
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  try {
    const result = await sendContactEmail({
      name: String(body.name ?? ''),
      email: String(body.email ?? ''),
      message: String(body.message ?? ''),
      hp: body.hp ? String(body.hp) : '',
    });
    if (!result.ok) {
      return Response.json({ error: result.error }, { status: 400 });
    }
    return Response.json({ ok: true });
  } catch (e) {
    console.error('contact form SES error', e);
    return Response.json({ error: 'Failed to send message.' }, { status: 502 });
  }
}
