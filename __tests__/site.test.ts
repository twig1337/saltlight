import { describe, expect, it } from 'vitest';
import { siteConfig } from '@/lib/site';

describe('siteConfig', () => {
  it('exposes url, owner email, and nav', () => {
    expect(siteConfig.url.length).toBeGreaterThan(0);
    expect(siteConfig.ownerEmail).toContain('@');
    expect(siteConfig.nav.some((l) => l.href === '/contact')).toBe(true);
  });
});
