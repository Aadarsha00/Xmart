import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const companies = [
  'TechCorp',
  'InnovateLabs',
  'DataFlow',
  'CloudNine',
  'CyberShield',
  'NetWorks',
  'DigitalEdge',
  'SmartSystems',
];

export function LogoStream() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        textRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-16 overflow-hidden bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <p
          ref={textRef}
          className="text-center text-muted-foreground text-lg"
        >
          Trusted by <span className="text-primary font-semibold">100+ companies</span> around the world for top-tier IT solutions.
        </p>
      </div>

      {/* Marquee Container */}
      <div className="relative">
        {/* Gradient masks */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />

        {/* Scrolling logos */}
        <div className="flex animate-marquee">
          {[...companies, ...companies, ...companies, ...companies].map((company, i) => (
            <div
              key={i}
              className="flex-shrink-0 mx-8 px-8 py-4 bg-card border border-border rounded-xl hover:border-primary/50 transition-all duration-300 hover:shadow-lg group"
            >
              <span className="text-xl font-bold text-muted-foreground group-hover:text-primary transition-colors duration-300 font-['Oswald']">
                {company}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
