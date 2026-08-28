export function SiteFooter() {
  return (
    <footer className="relative z-20 shrink-0 border-t border-gold/20">
      <p className="px-6 py-3 text-center text-xs tracking-wide text-muted-foreground sm:px-8">
        © {new Date().getFullYear()} SaltLight
      </p>
    </footer>
  );
}
