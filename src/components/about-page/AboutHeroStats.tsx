export function AboutHeroStats() {
  return (
    <div className="relative flex justify-center">
      {/* Source-site audit: no team photography is published, so the photo layer
          is intentionally disabled until approved brand photography is available. */}
      <div className="relative flex w-full max-w-md aspect-[4/3] items-center justify-center overflow-hidden rounded-2xl border border-primary/25 bg-[radial-gradient(circle_at_25%_20%,hsl(var(--primary)/0.35),transparent_32%),linear-gradient(135deg,hsl(var(--primary)/0.14),hsl(var(--background)/0.9))] p-10 text-center">
        <div className="absolute right-8 top-8 h-28 w-28 rounded-full border border-primary/25" />
        <div className="absolute bottom-8 left-8 h-20 w-20 rounded-full border border-primary/20" />
        <div className="relative rounded-2xl border border-primary/35 bg-background/55 px-8 py-7 shadow-[0_0_45px_hsl(var(--primary)/0.16)] backdrop-blur-sm">
          <p className="font-['Space_Grotesk'] text-sm font-semibold uppercase tracking-[0.14em] text-primary">
            XmartPoint
          </p>
          <p className="mt-2 text-xs uppercase tracking-[0.14em] text-muted-foreground">
            digital solutions
          </p>
        </div>
      </div>
      <div
        className="absolute -bottom-7 -left-7 bg-white dark:bg-black rounded-2xl px-7 py-5 flex flex-col items-center shadow-xl"
        style={
          {
            //   background: "rgba(20,20,20,0.85)",
            //   borderColor: "hsl(var(--primary), 0.3)",
          }
        }
      >
        <div
          className="text-4xl font-bold font-['Space_Grotesk']"
          style={{ color: "hsl(var(--primary))" }}
        >
          10+
        </div>
        <div
          className="text-xs uppercase tracking-wider mt-1"
          style={{ color: "hsl(var(--foreground), 0.6)" }}
        >
          Years of Excellence
        </div>
      </div>
    </div>
  );
}
