import Image from 'next/image';
import { Ornament } from '@/components/ornament';
import { TransitionLink } from '@/components/transition-link';

export default function HomePage() {
  return (
    <main className="relative flex min-h-full flex-1 flex-col [container-type:size]">
      <Image
        src="/saltlight-icon.png"
        alt=""
        width={378}
        height={677}
        priority
        unoptimized
        className="emblem-animate pointer-events-none absolute bottom-[11%] left-0 z-[1] aspect-[378/677] h-[min(64cqh,calc(52cqw*677/378))] w-auto max-w-full object-contain object-left-bottom mix-blend-multiply opacity-40"
      />
      <div className="radiance radiance-crown" aria-hidden />
      <div className="radiance" aria-hidden />
      <section className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 py-16 text-center sm:px-8 sm:py-24">
        <div className="hero-copy relative flex w-full max-w-xl flex-col items-center sm:max-w-lg lg:max-w-xl xl:max-w-2xl">
          <h1 className="plate font-display text-[clamp(2.85rem,8vw,5.65rem)] leading-[0.95] text-ink reveal">
            I make websites.
          </h1>
          <Ornament className="mt-10 reveal reveal-d1" />
          <p className="plate mt-8 max-w-md text-lg leading-relaxed text-muted-foreground reveal reveal-d2 sm:text-xl">
            Clear, reliable websites. Built carefully - without the agency markup.
          </p>

          <div className="mt-14 flex flex-col items-center gap-3 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-x-5 sm:gap-y-3 reveal reveal-d3">
            <TransitionLink href="/work" className="nav-link-lg plate plate-tight">
              Work
            </TransitionLink>
            <TransitionLink href="/about" className="nav-link-lg plate plate-tight">
              About
            </TransitionLink>
            <TransitionLink href="/contact" className="nav-link-lg nav-link-lg-accent plate plate-tight">
              Start a project
            </TransitionLink>
          </div>
        </div>
      </section>
    </main>
  );
}
