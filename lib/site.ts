export type NavLink = { href: string; label: string };

export const siteConfig = {
  name: process.env.NEXT_PUBLIC_SITE_NAME ?? 'SaltLight',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',
  tagline: process.env.NEXT_PUBLIC_SITE_TAGLINE ?? 'I make websites.',
  description:
    process.env.NEXT_PUBLIC_SITE_DESCRIPTION ??
    'Clear, reliable websites. Built carefully. No agency theater.',
  ownerName: process.env.NEXT_PUBLIC_OWNER_NAME ?? 'Thomas Ellsworth',
  ownerEmail: process.env.NEXT_PUBLIC_OWNER_EMAIL ?? 'taellsworth@gmail.com',
  seoPosture: (process.env.NEXT_PUBLIC_SEO_POSTURE ?? 'baseline') as
    | 'private'
    | 'baseline'
    | 'growth',
  nav: [
    { href: '/work', label: 'Work' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ] satisfies NavLink[],
};
