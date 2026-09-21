import { Target, Lightbulb, Users, Award } from "lucide-react";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const values = [
  {
    icon: Target,
    title: "Excellence",
    description:
      "We strive for excellence in every project, delivering solutions that exceed expectations.",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description:
      "We embrace cutting-edge technologies and innovative approaches to solve complex challenges.",
  },
  {
    icon: Users,
    title: "Collaboration",
    description:
      "We work closely with our clients as true partners, understanding their unique needs.",
  },
  {
    icon: Award,
    title: "Integrity",
    description:
      "We operate with transparency and honesty, building trust through every interaction.",
  },
];

export function AboutValuesBlock() {
  const gridRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = gridRef.current?.querySelectorAll(".value-pillar");
      if (items) {
        gsap.fromTo(
          items,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.72,
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
    }, gridRef);
    return () => ctx.revert();
  }, []);
  return (
    <section
      className="about-section relative overflow-hidden py-20 sm:py-24 mb-24 border-y border-gray-300 dark:"
      style={{
        background: "hsl(var(--background), 0.95)",
        // borderColor: "hsl(var(--border), 0.01)",
      }}
    >
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 grid gap-6 lg:mb-12 lg:grid-cols-[1.1fr_1fr] lg:items-end">
          <div>
            <p
              className="font-['Space_Grotesk'] text-xs font-medium tracking-[0.16em] uppercase"
              style={{ color: "hsl(var(--foreground), 0.55)" }}
            >
              Our Values
            </p>
            <h2
              className="mt-3 font-['Space_Grotesk'] text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl"
              style={{ color: "hsl(var(--foreground))" }}
            >
              What We{" "}
              <span style={{ color: "hsl(var(--primary))" }}>Stand For</span>
            </h2>
          </div>
          <p
            className="max-w-xl text-sm leading-relaxed sm:text-base lg:justify-self-end"
            style={{ color: "hsl(var(--foreground), 0.62)" }}
          >
            Our core values shape every project and partnership. They define our
            culture and drive our commitment to excellence, innovation,
            collaboration, and integrity.
          </p>
        </div>
        <div
          ref={gridRef}
          className="flex flex-col md:flex-row items-stretch justify-center divide-y md:divide-y-0 md:divide-x"
          style={{ borderColor: "hsl(var(--border), 0.1)" }}
        >
          {values.map((value, i) => (
            <div
              key={i}
              className="value-pillar flex-1 flex flex-col items-center justify-center px-4 py-10 md:py-0 text-center"
            >
              <value.icon
                className="w-10 h-10 mb-6"
                style={{ color: "hsl(var(--primary))" }}
              />
              <h3
                className="font-['Space_Grotesk'] text-2xl sm:text-3xl font-bold mb-3 tracking-tight"
                style={{ color: "hsl(var(--foreground))" }}
              >
                {value.title}
              </h3>
              <p
                className="text-base max-w-xs mx-auto leading-relaxed"
                style={{ color: "hsl(var(--foreground), 0.6)" }}
              >
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
