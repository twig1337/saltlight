import Script from 'next/script';

/** Privacy-friendly analytics. No-op when env not set. */
export function UmamiScript() {
  const src = process.env.NEXT_PUBLIC_UMAMI_URL;
  const id = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID;
  if (!src || !id) return null;
  const scriptSrc = src.replace(/\/$/, '') + '/script.js';
  return (
    <Script
      async
      defer
      src={scriptSrc}
      data-website-id={id}
      strategy="afterInteractive"
    />
  );
}
