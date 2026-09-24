const milestones = [
  ["2015", "Company Founded", "Xmart was established with a vision to transform IT services."],
  ["2017", "First Enterprise Client", "Partnered with Fortune 500 company for digital transformation."],
  ["2019", "Global Expansion", "Opened offices in Europe and Asia to serve international clients."],
  ["2021", "AI Division Launch", "Established dedicated AI and machine learning practice."],
  ["2023", "50+ Clients", "Reached milestone of serving 50+ clients worldwide."],
  ["2026", "Industry Leader", "Recognized as a leading IT solutions provider globally."],
];

export function AboutTimelineBlock() {
  return (
    <section className="relative overflow-hidden py-20 sm:py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <span className="inline-flex items-center border-l-[3px] border-primary pl-3 font-['Space_Grotesk'] text-[0.68rem] tracking-[0.14em] uppercase text-primary">Our Journey</span>
          <h2 className="mt-4 font-['Space_Grotesk'] text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">Milestones That Define Us</h2>
        </div>
        <div className="grid gap-6 sm:grid-cols-2">
          {milestones.map(([year, title, description]) => (
            <article key={year} className="rounded-2xl border border-border bg-card/80 p-7 text-center">
              <span className="inline-flex rounded-full bg-primary px-4 py-2 font-['Space_Grotesk'] text-sm font-bold text-white">{year}</span>
              <h3 className="mt-5 font-['Space_Grotesk'] text-lg font-semibold">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
