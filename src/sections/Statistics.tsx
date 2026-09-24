import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  {
    value: 10,
    suffix: "+",
    label: "Years of Excellence",
  },
  {
    value: 50,
    suffix: "+",
    label: "Clients Worldwide",
  },
  {
    value: 25,
    suffix: "+",
    label: "Team Members",
  },
  {
    value: 50,
    suffix: "+",
    label: "Countries Served",
  },
];

function AnimatedCounter({
  value,
  suffix,
  isVisible,
}: {
  value: number;
  suffix: string;
  isVisible: boolean;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) {
      return;
    }

    const duration = 1.8;
    const start = performance.now();

    const tick = (time: number) => {
      const progress = Math.min((time - start) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      setCount(eased * value);

      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        setCount(value);
      }
    };

    requestAnimationFrame(tick);
  }, [isVisible, value]);

  const displayValue = Number.isInteger(value)
    ? Math.floor(count).toString()
    : count.toFixed(1);

  return (
    <span>
      {displayValue}
      {suffix}
    </span>
  );
}

export function Statistics() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 72%",
        once: true,
        onEnter: () => setIsVisible(true),
      });

      const cards = cardsRef.current?.querySelectorAll(".stat-card");
      if (cards) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.72,
            stagger: 0.08,
            ease: "power3.out",
            scrollTrigger: {
              trigger: cardsRef.current,
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
      className="relative overflow-hidden py-20 sm:py-24"
    >
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 grid gap-6 lg:mb-12 lg:grid-cols-[1.1fr_1fr] lg:items-end">
          <div>
            <p
              className="font-['Space_Grotesk'] text-xs font-medium tracking-[0.16em] uppercase"
              style={{ color: "hsl(var(--foreground) / 0.55)" }}
            >
              Our Impact
            </p>
            <h2
              className="mt-3 font-['Space_Grotesk'] text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl"
              style={{ color: "hsl(var(--foreground))" }}
            >
              Numbers That Speak
            </h2>
          </div>

          <p
            className="max-w-xl text-sm leading-relaxed sm:text-base lg:justify-self-end"
            style={{ color: "hsl(var(--foreground) / 0.62)" }}
          >
            We focus on predictable delivery, measurable outcomes, and long-term
            partnerships.
          </p>
        </div>

        <div
          ref={cardsRef}
          className="grid grid-cols-2 gap-x-8 gap-y-10 sm:gap-x-10 sm:gap-y-12 lg:grid-cols-4 lg:gap-x-12"
        >
          {stats.map((stat) => (
            <article key={stat.label} className="stat-card ">
              <p
                className="font-['Space_Grotesk'] tabular-nums text-6xl font-semibold leading-none tracking-tight sm:text-7xl lg:text-8xl"
                style={{ color: "hsl(var(--foreground))" }}
              >
                <AnimatedCounter
                  value={stat.value}
                  suffix={stat.suffix}
                  isVisible={isVisible}
                />
              </p>

              <h3
                className="mt-3 font-['Space_Grotesk'] text-sm font-medium leading-snug sm:text-base"
                style={{ color: "hsl(var(--foreground) / 0.70)" }}
              >
                {stat.label}
              </h3>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
