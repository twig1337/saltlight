export type Mote = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  life: number;
  maxLife: number;
  glow: number;
  drift: number;
  wobble: number;
  wobbleSpeed: number;
};

export type Origin = { x: number; y: number; w: number; h: number };

export function moteAlpha(lifeT: number, glow: number): { halo: number; core: number } {
  let envelope: number;
  if (lifeT < 0.08) envelope = lifeT / 0.08;
  else if (lifeT < 0.65) envelope = 1;
  else if (lifeT < 0.82) envelope = 1 + ((lifeT - 0.65) / 0.17) * 0.7;
  else envelope = Math.max(0, 1 - (lifeT - 0.82) / 0.18);

  const alpha = envelope * 0.72 * glow;
  return {
    halo: Math.min(0.7, alpha * 0.85),
    core: Math.min(0.95, alpha * 1.35),
  };
}

export function spawn(w: number, h: number, origin: Origin): Mote {
  const maxLife = 4.2 + Math.random() * 5.2;
  const ow = origin.w > 1 ? origin.w : w * 0.3;
  const oh = origin.h > 1 ? origin.h : h * 0.92;
  const ox = origin.w > 1 ? origin.x : 0;
  const oy = origin.h > 1 ? origin.y : h * 0.08;
  // Warm belly of the crystal, then drift up and into the page
  const gx = ox + ow * 0.52;
  const gy = oy + oh * 0.68;
  return {
    x: gx + (Math.random() - 0.2) * ow * 0.4,
    y: gy + (Math.random() - 0.4) * oh * 0.22,
    vx: 16 + Math.random() * 34,
    vy: -(18 + Math.random() * 38),
    r: 0.85 + Math.random() * 1.6,
    life: 0,
    maxLife,
    glow: 0.5 + Math.random() * 0.5,
    drift: 10 + Math.random() * 18,
    wobble: Math.random() * Math.PI * 2,
    wobbleSpeed: 0.8 + Math.random() * 1.8,
  };
}
