import type { Metadata } from 'next';
import { ContactForm } from './contact-form';
import { siteConfig } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Contact',
  description: `Contact ${siteConfig.name}.`,
};

export default function ContactPage() {
  return (
    <main className="mx-auto w-full max-w-xl flex-1 px-6 py-20 sm:px-8 sm:py-28">
      <h1 className="font-display text-4xl tracking-tight text-ink sm:text-5xl reveal">Contact</h1>
      <p className="mt-6 text-lg leading-relaxed text-muted-foreground reveal reveal-d1">
        Tell me what you need. I usually reply within a few business days.
      </p>
      {siteConfig.ownerEmail ? (
        <p className="mt-3 text-sm text-muted-foreground reveal reveal-d2">
          Prefer email?{' '}
          <a
            className="text-foreground underline decoration-gold/50 underline-offset-4 transition-colors hover:decoration-gold"
            href={`mailto:${siteConfig.ownerEmail}`}
          >
            {siteConfig.ownerEmail}
          </a>
        </p>
      ) : null}
      <div className="mt-12 reveal reveal-d3">
        <ContactForm />
      </div>
    </main>
  );
}
