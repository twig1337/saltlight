import { describe, expect, it } from 'vitest';
import { moteAlpha, spawn } from '@/lib/motes';

const origin = { x: 0, y: 0, w: 400, h: 800 };

describe('motes', () => {
  it('spawns around the crystal glow', () => {
    for (let i = 0; i < 40; i++) {
      const m = spawn(1440, 800, origin);
      expect(m.x).toBeGreaterThan(origin.x + origin.w * 0.2);
      expect(m.x).toBeLessThan(origin.x + origin.w * 0.95);
      expect(m.y).toBeGreaterThan(origin.y + origin.h * 0.4);
      expect(m.y).toBeLessThan(origin.y + origin.h * 0.95);
    }
  });

  it('is bright enough at mid-life to read as an ember', () => {
    const { halo, core } = moteAlpha(0.4, 0.7);
    expect(halo).toBeGreaterThanOrEqual(0.35);
    expect(core).toBeGreaterThanOrEqual(0.5);
  });

  it('has a visible ember radius', () => {
    for (let i = 0; i < 30; i++) {
      expect(spawn(1440, 800, origin).r).toBeGreaterThanOrEqual(0.85);
    }
  });
});
