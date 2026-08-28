export type NavLink = { href: string; label: string };

export const siteConfig = {
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',
  ownerEmail: process.env.NEXT_PUBLIC_OWNER_EMAIL ?? 'taellsworth@gmail.com',
  nav: [
    { href: '/work', label: 'Work' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ] satisfies NavLink[],
};
