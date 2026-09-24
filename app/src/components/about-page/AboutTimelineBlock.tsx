import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const MILESTONES = [
  {
    year: "2015",
    title: "Founded",
    description:
      "XmartPoint was founded with a vision to deliver practical, scalable digital solutions.",
  },
  {
    year: "2017",
    title: "First Major Client",
    description:
      "Secured our first enterprise client, setting the stage for long-term partnerships.",
  },
  {
    year: "2019",
    title: "Team Expansion",
    description:
      "Grew our team to 20+ experts, expanding our capabilities and service offerings.",
  },
  {
    year: "2022",
    title: "Global Reach",
    description:
      "Delivered projects for clients in over 10 countries, building a global reputation.",
  },
  {
    year: "2025",
    title: "Innovation Lab",
    description:
      "Launched our in-house innovation lab to drive R&D and next-gen solutions.",
  },
];

export function AboutTimelineBlock() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gridRef.current?.querySelectorAll(".timeline-card");
      if (cards) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 32 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: gridRef.current,
              start: "top 84%",
              toggleActions: "play none none reverse",
            },
          },
        );
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden py-20 sm:py-24 bg-transparent"
    >
      <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="mb-14 text-center">
          <span
            className="inline-flex items-center pl-3 font-['Space_Grotesk'] text-[0.68rem] tracking-[0.14em] uppercase"
            style={{
              color: "var(--primary-hex)",
              borderLeft: "3px solid var(--primary-hex)",
            }}
          >
            Our Journey
          </span>
          <h2
            className="mt-4 font-['Space_Grotesk'] text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl"
            style={{ color: "hsl(var(--foreground))" }}
          >
            A Story of Milestones
          </h2>
          <p
            className="mt-4 text-muted-foreground max-w-2xl mx-auto text-base sm:text-lg"
            style={{ color: "hsl(var(--foreground) / 0.7)" }}
          >
            Every year marks a leap in our journey. Explore the path we’ve
            charted together.
          </p>
        </div>
        <div className="relative flex justify-center">
          {/* Vertical accent line */}
          <div
            className="absolute left-1/2 top-0 h-full w-1 bg-primary/20 rounded-full -translate-x-1/2 z-0"
            style={{ minHeight: 500 }}
          />
          <div
            ref={gridRef}
            className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-16 w-full z-10"
          >
            {MILESTONES.map((milestone, i) => (
              <div
                key={i}
                className="timeline-card glass-effect relative bg-card/80 border border-border rounded-2xl shadow-sm px-8 py-10 max-w-xl mx-auto flex flex-col items-center text-center transition-all duration-500 hover:shadow-md hover:border-primary/40"
                style={{
                  marginTop: 0,
                  zIndex: 2,
                }}
              >
                {/* Year badge */}
                <span
                  className="absolute -top-7 left-1/2 -translate-x-1/2 bg-primary text-white font-['Space_Grotesk'] text-base font-bold px-5 py-2 rounded-full border-2 border-background"
                  style={{ boxShadow: "0 2px 8px 0 rgba(0,0,0,0.08)" }}
                >
                  {milestone.year}
                </span>
                <h3
                  className="font-['Space_Grotesk'] text-lg font-semibold mb-2"
                  style={{ color: "hsl(var(--foreground))" }}
                >
                  {milestone.title}
                </h3>
                <p
                  className="text-muted-foreground text-sm leading-relaxed"
                  style={{ color: "hsl(var(--foreground) / 0.7)" }}
                >
                  {milestone.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <style>{`
        .glass-effect {
          background: linear-gradient(120deg, hsl(var(--background) / 0.82) 80%, hsl(var(--primary) / 0.04));
          backdrop-filter: blur(8px);
        }
        @media (max-width: 640px) {
          .timeline-card { max-width: 98vw; padding-left: 0.5rem; padding-right: 0.5rem; }
        }
      `}</style>
    </section>
  );
}
