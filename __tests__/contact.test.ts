import { describe, expect, it, vi, beforeEach } from 'vitest';

vi.mock('@aws-sdk/client-ses', () => {
  return {
    SESClient: class {
      send = vi.fn(async () => ({}));
    },
    SendEmailCommand: class {
      input: unknown;
      constructor(input: unknown) {
        this.input = input;
      }
    },
  };
});

describe('sendContactEmail', () => {
  beforeEach(() => {
    process.env.CONTACT_TO_EMAIL = 'ops@example.com';
    process.env.CONTACT_FROM_EMAIL = 'noreply@example.com';
    vi.resetModules();
  });

  it('rejects empty fields', async () => {
    const { sendContactEmail } = await import('@/lib/contact');
    const r = await sendContactEmail({ name: '', email: 'a@b.com', message: 'hi' });
    expect(r.ok).toBe(false);
  });

  it('honeypot short-circuits success', async () => {
    const { sendContactEmail } = await import('@/lib/contact');
    const r = await sendContactEmail({
      name: 'Bot',
      email: 'bot@b.com',
      message: 'spam',
      hp: 'filled',
    });
    expect(r).toEqual({ ok: true });
  });

  it('sends when valid', async () => {
    const { sendContactEmail } = await import('@/lib/contact');
    const r = await sendContactEmail({
      name: 'Pat',
      email: 'pat@example.com',
      message: 'Hello there',
    });
    expect(r).toEqual({ ok: true });
  });
});
