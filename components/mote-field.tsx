'use client';

import { useEffect, useRef } from 'react';
import { type Mote, type Origin, moteAlpha, spawn } from '@/lib/motes';

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
    const origin: Origin = { x: 0, y: 0, w: 0, h: 0 };

    const readOrigin = () => {
      const parent = canvas.parentElement;
      const lamp = parent?.querySelector('[data-mote-origin]');
      if (!parent || !(lamp instanceof HTMLElement)) return;
      const pr = parent.getBoundingClientRect();
      const lr = lamp.getBoundingClientRect();
      origin.x = lr.left - pr.left;
      origin.y = lr.top - pr.top;
      origin.w = lr.width;
      origin.h = lr.height;
    };

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
      readOrigin();
    };

    const seed = () => {
      if (motes.length > 0) return;
      for (let i = 0; i < 18; i++) {
        const m = spawn(w, h, origin);
        m.life = Math.random() * m.maxLife * 0.4;
        m.x += m.vx * m.life * 0.35;
        m.y += m.vy * m.life * 0.35;
        motes.push(m);
      }
    };

    const ro = new ResizeObserver(resize);
    if (canvas.parentElement) ro.observe(canvas.parentElement);
    const lamp = canvas.parentElement?.querySelector('[data-mote-origin]');
    if (lamp) ro.observe(lamp);
    resize();
    requestAnimationFrame(() => {
      resize();
      seed();
    });

    const tick = (now: number) => {
      if (!running) return;
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;

      // Sparse gold dust
      const target = Math.round(Math.min(55, Math.max(18, (w * h) / 28000)));
      spawnAcc += dt;
      while (motes.length < target && spawnAcc > 0.04) {
        motes.push(spawn(w, h, origin));
        spawnAcc -= 0.04 + Math.random() * 0.05;
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
        const { halo: haloAlpha, core: coreAlpha } = moteAlpha(t, m.glow);

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
        ctx.globalAlpha = haloAlpha;
        const halo = ctx.createRadialGradient(m.x, m.y, 0, m.x, m.y, radius * 5.5);
        halo.addColorStop(0, 'rgba(255, 228, 150, 0.95)');
        halo.addColorStop(0.35, 'rgba(201, 162, 39, 0.55)');
        halo.addColorStop(1, 'rgba(201, 162, 39, 0)');
        ctx.fillStyle = halo;
        ctx.beginPath();
        ctx.arc(m.x, m.y, radius * 5.5, 0, Math.PI * 2);
        ctx.fill();

        // Hot pin core
        ctx.globalAlpha = coreAlpha;
        ctx.fillStyle =
          t > 0.68 && t < 0.84 ? 'rgba(255, 248, 220, 1)' : 'rgba(232, 196, 90, 0.95)';
        ctx.beginPath();
        ctx.arc(m.x, m.y, Math.max(0.8, radius * 0.75), 0, Math.PI * 2);
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
      className="pointer-events-none absolute inset-0 z-[2] h-full w-full"
      aria-hidden
    />
  );
}
