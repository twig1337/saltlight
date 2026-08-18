import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';

const region = process.env.SES_REGION ?? process.env.AWS_REGION ?? 'us-west-2';

export async function sendContactEmail(input: {
  name: string;
  email: string;
  message: string;
  hp?: string; // honeypot
}): Promise<{ ok: true } | { ok: false; error: string }> {
  if (input.hp) {
    // bot filled honeypot — pretend success
    return { ok: true };
  }
  const name = input.name.trim();
  const email = input.email.trim();
  const message = input.message.trim();
  if (!name || !email || !message) {
    return { ok: false, error: 'All fields are required.' };
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { ok: false, error: 'Invalid email address.' };
  }
  if (message.length > 5000) {
    return { ok: false, error: 'Message too long.' };
  }

  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;
  if (!to || !from) {
    return { ok: false, error: 'Contact email is not configured.' };
  }

  const client = new SESClient({ region });
  await client.send(
    new SendEmailCommand({
      Source: from,
      Destination: { ToAddresses: [to] },
      ReplyToAddresses: [email],
      Message: {
        Subject: { Data: `Website contact: ${name}` },
        Body: {
          Text: {
            Data: `From: ${name} <${email}>\n\n${message}`,
          },
        },
      },
    }),
  );
  return { ok: true };
}
