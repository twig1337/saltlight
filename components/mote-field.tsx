'use client';

import { useEffect, useRef } from 'react';

type Mote = {
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

function spawn(w: number, h: number): Mote {
  const maxLife = 2.8 + Math.random() * 3.8;
  return {
    // Embers lift from a wide bottom-left bed of coals
    x: -12 + Math.random() * w * 0.55,
    y: h * (0.72 + Math.random() * 0.38),
    vx: 6 + Math.random() * 22,
    vy: -(28 + Math.random() * 55),
    r: 0.28 + Math.random() * 0.7,
    life: 0,
    maxLife,
    glow: 0.4 + Math.random() * 0.6,
    drift: (Math.random() - 0.5) * 18,
    wobble: Math.random() * Math.PI * 2,
    wobbleSpeed: 1.2 + Math.random() * 2.4,
  };
}

export function MoteField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let raf = 0;
    let running = true;
    let last = performance.now();
    let w = 0;
    let h = 0;
    let dpr = 1;
    const motes: Mote[] = [];
    let spawnAcc = 0;

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = Math.max(1, Math.floor(rect.width));
      h = Math.max(1, Math.floor(rect.height));
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const ro = new ResizeObserver(resize);
    if (canvas.parentElement) ro.observe(canvas.parentElement);
    resize();
    requestAnimationFrame(resize);

    for (let i = 0; i < 40; i++) {
      const m = spawn(w, h);
      m.life = Math.random() * m.maxLife * 0.85;
      m.x += m.vx * m.life * 0.35;
      m.y += m.vy * m.life * 0.35;
      motes.push(m);
    }

    const tick = (now: number) => {
      if (!running) return;
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;

      // Dense ember bed
      const target = Math.round(Math.min(140, Math.max(55, (w * h) / 11000)));
      spawnAcc += dt;
      while (motes.length < target && spawnAcc > 0.02) {
        motes.push(spawn(w, h));
        spawnAcc -= 0.02 + Math.random() * 0.03;
      }
      if (motes.length >= target) spawnAcc = Math.min(spawnAcc, 0.2);

      ctx.clearRect(0, 0, w, h);

      for (let i = motes.length - 1; i >= 0; i--) {
        const m = motes[i];
        m.life += dt;
        if (m.life >= m.maxLife) {
          motes.splice(i, 1);
          continue;
        }

        const t = m.life / m.maxLife;
        // Quick birth, long glow, short hot burn-out
        let alpha: number;
        if (t < 0.08) alpha = t / 0.08;
        else if (t < 0.65) alpha = 1;
        else if (t < 0.82) alpha = 1 + ((t - 0.65) / 0.17) * 0.7;
        else alpha = Math.max(0, 1 - (t - 0.82) / 0.18);
        alpha *= 0.42 * m.glow;

        m.wobble += m.wobbleSpeed * dt;
        m.vx += (m.drift + Math.sin(m.wobble) * 14) * dt * 0.2;
        m.x += m.vx * dt;
        m.y += m.vy * dt;
        // Buoyancy then settle like cooling ash
        m.vy += (-6 + t * 14) * dt;

        if (m.x > w + 30 || m.y < -30 || m.y > h + 40) {
          motes.splice(i, 1);
          continue;
        }

        const burn = t > 0.65 && t < 0.86 ? 1 + (t - 0.65) * 1.4 : 1;
        const radius = m.r * burn;

        ctx.save();
        ctx.globalCompositeOperation = 'lighter';

        // Soft halo — small, ember-like
        ctx.globalAlpha = Math.min(0.55, alpha * 0.85);
        const halo = ctx.createRadialGradient(m.x, m.y, 0, m.x, m.y, radius * 4.5);
        halo.addColorStop(0, 'rgba(255, 228, 150, 0.9)');
        halo.addColorStop(0.35, 'rgba(201, 162, 39, 0.45)');
        halo.addColorStop(1, 'rgba(201, 162, 39, 0)');
        ctx.fillStyle = halo;
        ctx.beginPath();
        ctx.arc(m.x, m.y, radius * 4.5, 0, Math.PI * 2);
        ctx.fill();

        // Hot pin core
        ctx.globalAlpha = Math.min(0.9, alpha * 1.35);
        ctx.fillStyle =
          t > 0.68 && t < 0.84 ? 'rgba(255, 248, 220, 1)' : 'rgba(232, 196, 90, 0.95)';
        ctx.beginPath();
        ctx.arc(m.x, m.y, Math.max(0.35, radius * 0.7), 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      raf = requestAnimationFrame(tick);
    };

    const onVisibility = () => {
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(raf);
      } else if (!running) {
        running = true;
        last = performance.now();
        raf = requestAnimationFrame(tick);
      }
    };

    window.addEventListener('resize', resize);
    document.addEventListener('visibilitychange', onVisibility);
    raf = requestAnimationFrame(tick);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 z-0 h-full w-full"
      aria-hidden
    />
  );
}
