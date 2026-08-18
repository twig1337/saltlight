import { describe, expect, it } from 'vitest';
import { siteConfig } from '@/lib/site';

describe('siteConfig', () => {
  it('exposes name and nav', () => {
    expect(siteConfig.name.length).toBeGreaterThan(0);
    expect(siteConfig.nav.some((l) => l.href === '/contact')).toBe(true);
  });
});
