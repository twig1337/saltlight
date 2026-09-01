export function SiteFooter() {
  return (
    <footer className="relative z-20 shrink-0 border-t border-gold/20 bg-background/90">
      <div className="mx-auto flex max-w-3xl items-center justify-center px-6 py-4 sm:px-8">
        <p className="flex h-9 items-center text-center text-xs tracking-wide text-muted-foreground sm:h-10">
          © {new Date().getFullYear()} SaltLight
        </p>
      </div>
    </footer>
  );
}
