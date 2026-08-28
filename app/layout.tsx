import type { Metadata } from 'next';
import { Cormorant_Garamond, Source_Serif_4 } from 'next/font/google';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { UmamiScript } from '@/components/umami';
import { siteConfig } from '@/lib/site';
import './globals.css';

const display = Cormorant_Garamond({
  variable: '--font-display',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

const body = Source_Serif_4({
  variable: '--font-body',
  subsets: ['latin'],
  axes: ['opsz'],
});

export const metadata: Metadata = {
  title: {
    default: 'SaltLight',
    template: '%s · SaltLight',
  },
  description: 'Clear, reliable websites. Built carefully - without the agency markup.',
  metadataBase: new URL(siteConfig.url),
  openGraph: {
    title: 'SaltLight',
    description: 'Clear, reliable websites. Built carefully - without the agency markup.',
    url: siteConfig.url,
    siteName: 'SaltLight',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} h-full antialiased`}>
      <body className="min-h-dvh font-sans">
        <UmamiScript />
        <div className="site-shell grid min-h-dvh grid-rows-[auto_minmax(0,1fr)_auto]">
          <SiteHeader />
          <div className="flex min-h-0 flex-col">{children}</div>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
