import Image from 'next/image';
import { MoteField } from '@/components/mote-field';
import { Ornament } from '@/components/ornament';
import { TransitionLink } from '@/components/transition-link';

export default function HomePage() {
  return (
    <main className="relative flex min-h-full flex-1 flex-col overflow-hidden">
      <MoteField />
      <section className="relative z-10 flex flex-1 flex-col justify-center px-6 py-24 sm:px-8 sm:py-32">
        <div className="relative mx-auto w-full max-w-3xl">
          <Image
            src="/saltlight-icon.png"
            alt=""
            width={378}
            height={677}
            priority
            unoptimized
            className="emblem-animate h-24 w-auto sm:h-[6.75rem]"
          />
          <h1 className="plate font-display mt-8 text-[clamp(2.85rem,8vw,5.65rem)] leading-[0.95] text-ink reveal">
            I make websites.
          </h1>
          <Ornament className="mt-10 reveal reveal-d1" />
          <p className="plate mt-8 max-w-md text-lg leading-relaxed text-muted-foreground reveal reveal-d2 sm:text-xl">
            Clear, reliable websites. Built carefully - without the agency markup.
          </p>

          <div className="mt-14 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-5 sm:gap-y-3 reveal reveal-d3">
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
