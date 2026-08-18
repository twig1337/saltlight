export type NavLink = { href: string; label: string };

export const siteConfig = {
  name: process.env.NEXT_PUBLIC_SITE_NAME ?? 'SaltLight',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',
  tagline:
    process.env.NEXT_PUBLIC_SITE_TAGLINE ??
    'Practical websites for churches, civic groups, and small businesses.',
  description:
    process.env.NEXT_PUBLIC_SITE_DESCRIPTION ??
    'SaltLight builds and cares for clear, reliable websites — without the agency markup.',
  ownerName: process.env.NEXT_PUBLIC_OWNER_NAME ?? '',
  ownerEmail: process.env.NEXT_PUBLIC_OWNER_EMAIL ?? '',
  location: process.env.NEXT_PUBLIC_LOCATION ?? '',
  seoPosture: (process.env.NEXT_PUBLIC_SEO_POSTURE ?? 'baseline') as
    | 'private'
    | 'baseline'
    | 'growth',
  nav: [
    { href: '/', label: 'Home' },
    { href: '/work', label: 'Work' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ] satisfies NavLink[],
};
