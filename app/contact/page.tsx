import type { Metadata } from 'next';
import { ContactForm } from './contact-form';
import { siteConfig } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Contact',
  description: `Contact ${siteConfig.name}.`,
};

export default function ContactPage() {
  return (
    <main className="mx-auto max-w-xl px-4 py-12 space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Contact</h1>
      <p className="text-muted-foreground">
        Share a little about the site you need. I usually reply within a few business days.
      </p>
      {siteConfig.ownerEmail ? (
        <p className="text-sm text-muted-foreground">
          Prefer email?{' '}
          <a className="text-primary underline" href={`mailto:${siteConfig.ownerEmail}`}>
            {siteConfig.ownerEmail}
          </a>
        </p>
      ) : null}
      <ContactForm />
    </main>
  );
}
