import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    id: 1,
    name: "Sarah Mitchell",
    role: "CTO",
    company: "TechVentures Inc.",
    image: "/team-1.jpg",
    content:
      "Xmart transformed our entire IT infrastructure. Their cloud migration service was seamless, and we have seen a 40% reduction in operational costs. The 24/7 support team is incredibly responsive.",
    rating: 5,
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "IT Director",
    company: "Global Finance Corp",
    image: "/team-3.jpg",
    content:
      "The cybersecurity solutions provided by Xmart have given us peace of mind. Their proactive threat monitoring and rapid incident response have protected us from multiple attacks.",
    rating: 5,
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "CEO",
    company: "StartupXYZ",
    image: "/team-4.jpg",
    content:
      "As a growing startup, we needed scalable IT solutions. Xmart delivered beyond our expectations. Their team understood our needs and provided cost-effective solutions that scale with us.",
    rating: 5,
  },
  {
    id: 4,
    name: "David Thompson",
    role: "Operations Manager",
    company: "Manufacturing Pro",
    image: "/team-2.jpg",
    content:
      "The network solutions implemented by Xmart have revolutionized our operations. Downtime is virtually eliminated, and our team can focus on what matters most - growing the business.",
    rating: 5,
  },
];

export function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".testimonial-intro > *",
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.72,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 82%",
            toggleActions: "play none none reverse",
          },
        },
      );

      gsap.fromTo(
        ".testimonial-shell",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.72,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const transitionTo = (nextIndex: number, direction: "prev" | "next") => {
    if (isAnimating || nextIndex === currentIndex || !cardRef.current) {
      return;
    }

    setIsAnimating(true);

    gsap.to(cardRef.current, {
      opacity: 0,
      x: direction === "next" ? -24 : 24,
      y: 8,
      duration: 0.22,
      ease: "power2.in",
      onComplete: () => {
        setCurrentIndex(nextIndex);
        gsap.fromTo(
          cardRef.current,
          { opacity: 0, x: direction === "next" ? 24 : -24, y: 8 },
          {
            opacity: 1,
            x: 0,
            y: 0,
            duration: 0.34,
            ease: "power3.out",
            onComplete: () => setIsAnimating(false),
          },
        );
      },
    });
  };

  const navigate = (direction: "prev" | "next") => {
    const nextIndex =
      direction === "next"
        ? (currentIndex + 1) % testimonials.length
        : (currentIndex - 1 + testimonials.length) % testimonials.length;

    transitionTo(nextIndex, direction);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isAnimating) {
        const nextIndex = (currentIndex + 1) % testimonials.length;
        transitionTo(nextIndex, "next");
      }
    }, 7000);

    return () => clearInterval(interval);
  }, [currentIndex, isAnimating]);

  const current = testimonials[currentIndex];

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden py-20 sm:py-24"
    >
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-14">
          <div className="testimonial-intro">
            <p
              className="font-['Space_Grotesk'] text-xs font-medium tracking-[0.16em] uppercase"
              style={{ color: "hsl(var(--primary))" }}
            >
              Testimonials
            </p>
            <h2
              className="mt-3 font-['Space_Grotesk'] text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl"
              style={{ color: "hsl(var(--foreground))" }}
            >
              What Clients Say
            </h2>
            <p
              className="mt-5 max-w-md text-sm leading-relaxed sm:text-base"
              style={{ color: "hsl(var(--foreground) / 0.62)" }}
            >
              Feedback from teams we have partnered with across cloud,
              cybersecurity, and product engineering projects.
            </p>

            <div className="mt-8 flex items-center gap-3">
              <button
                onClick={() => navigate("prev")}
                disabled={isAnimating}
                aria-label="Previous testimonial"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border transition-colors duration-300 disabled:cursor-not-allowed disabled:opacity-45"
                style={{
                  borderColor: "hsl(var(--border) / 0.22)",
                  color: "hsl(var(--foreground) / 0.75)",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.borderColor = "hsl(var(--primary))";
                  e.currentTarget.style.color = "hsl(var(--primary))";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.borderColor =
                    "hsl(var(--border) / 0.22)";
                  e.currentTarget.style.color = "hsl(var(--foreground) / 0.75)";
                }}
              >
                <ChevronLeft className="h-4 w-4" />
              </button>

              <div className="flex items-center gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      if (index > currentIndex) {
                        transitionTo(index, "next");
                      } else if (index < currentIndex) {
                        transitionTo(index, "prev");
                      }
                    }}
                    disabled={isAnimating}
                    aria-label={`Go to testimonial ${index + 1}`}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      index === currentIndex ? "w-8" : "w-3"
                    }`}
                    style={{
                      background:
                        index === currentIndex
                          ? "hsl(var(--primary))"
                          : "hsl(var(--border) / 0.22)",
                    }}
                  />
                ))}
              </div>

              <button
                onClick={() => navigate("next")}
                disabled={isAnimating}
                aria-label="Next testimonial"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border transition-colors duration-300 disabled:cursor-not-allowed disabled:opacity-45"
                style={{
                  borderColor: "hsl(var(--border) / 0.22)",
                  color: "hsl(var(--foreground) / 0.75)",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.borderColor = "hsl(var(--primary))";
                  e.currentTarget.style.color = "hsl(var(--primary))";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.borderColor =
                    "hsl(var(--border) / 0.22)";
                  e.currentTarget.style.color = "hsl(var(--foreground) / 0.75)";
                }}
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div
            ref={cardRef}
            className="testimonial-shell rounded-3xl border p-6 sm:p-8"
            style={{
              borderColor: "hsl(var(--border) / 0.12)",
              background: "hsl(var(--background) / 0.96)",
            }}
          >
            <Quote
              className="h-8 w-8"
              style={{ color: "hsl(var(--primary) / 0.35)" }}
            />

            <blockquote
              className="mt-5 font-['Space_Grotesk'] text-[1.22rem] leading-relaxed sm:text-[1.42rem] sm:leading-relaxed"
              style={{ color: "hsl(var(--foreground) / 0.88)" }}
            >
              &ldquo;{current.content}&rdquo;
            </blockquote>

            <div
              className="mt-8 flex items-center gap-4 border-t pt-5 sm:pt-6"
              style={{ borderColor: "hsl(var(--border) / 0.12)" }}
            >
              <img
                src={current.image}
                alt={current.name}
                className="h-14 w-14 rounded-xl object-cover"
              />

              <div className="min-w-0">
                <p
                  className="font-['Space_Grotesk'] text-[1.05rem] font-medium"
                  style={{ color: "hsl(var(--foreground))" }}
                >
                  {current.name}
                </p>
                <p
                  className="text-sm"
                  style={{ color: "hsl(var(--foreground) / 0.62)" }}
                >
                  {current.role} • {current.company}
                </p>
              </div>

              <div
                className="ml-auto rounded-full border px-3 py-1 text-xs tracking-[0.08em] uppercase"
                style={{
                  borderColor: "hsl(var(--primary) / 0.22)",
                  color: "hsl(var(--primary) / 0.65)",
                }}
              >
                {current.rating}.0 / 5
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
