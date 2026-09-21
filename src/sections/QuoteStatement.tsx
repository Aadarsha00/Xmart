import { useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function QuoteStatement() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLQuoteElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        quoteRef.current,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.75,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 82%",
            toggleActions: "play none none reverse",
          },
        },
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden py-16 sm:py-20"
    >
      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Card className="relative isolate overflow-visible rounded-[1.75rem] border shadow-sm px-0 py-0">
          <div
            className="pointer-events-none absolute inset-0 rounded-[inherit] z-0"
            style={{
              background:
                "linear-gradient(100deg,rgba(255,255,255,0.03)_0%,rgba(255,255,255,0)_48%,rgba(var(--primary)/0.08)_100%)",
            }}
          />
          <CardContent className="relative px-8 py-14 sm:px-12 sm:py-16">
            <div
              className="pointer-events-none absolute left-7 top-6 text-6xl leading-none sm:left-10 sm:top-8 sm:text-7xl"
              style={{ color: "hsl(var(--foreground) / 0.10)" }}
            >
              "
            </div>
            <blockquote
              ref={quoteRef}
              className="relative mx-auto max-w-5xl text-center font-['Space_Grotesk'] text-2xl font-medium leading-snug tracking-tight sm:text-3xl lg:text-4xl"
              style={{ color: "hsl(var(--foreground) / 0.90)" }}
            >
              People build websites, develop brands, and build shops selling
              stuff. A better internet, for people, one site at a time. We work
              better and more efficiently than others.
            </blockquote>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
