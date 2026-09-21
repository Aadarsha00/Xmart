import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const companies = [
  "TechCorp",
  "InnovateLabs",
  "DataFlow",
  "CloudNine",
  "CyberShield",
  "NetWorks",
  "DigitalEdge",
  "SmartSystems",
];

export function LogoStream() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const marqueeCompanies = [
    ...companies,
    ...companies,
    ...companies,
    ...companies,
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      tl.fromTo(
        textRef.current,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.72, ease: "power3.out" },
      )
        .add(() => {
          // Animate SVG underline after text appears
          if (svgRef.current) {
            const [path1, path2] = svgRef.current.querySelectorAll("path");
            [path1, path2].forEach((path) => {
              if (path) {
                const length = path.getTotalLength();
                path.style.strokeDasharray = length.toString();
                path.style.strokeDashoffset = length.toString();
              }
            });
            gsap.to(path1, {
              strokeDashoffset: 0,
              duration: 0.7,
              ease: "power2.out",
              delay: 0.1,
            });
            gsap.to(path2, {
              strokeDashoffset: 0,
              duration: 0.7,
              ease: "power2.out",
              delay: 0.25,
            });
          }
        })
        .fromTo(
          marqueeRef.current,
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.75, ease: "power3.out" },
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden py-14 sm:py-16"
      style={{ background: "var(--background)" }}
    >
      <div className="relative z-10 mx-auto mb-8 max-w-5xl px-4 sm:px-6 lg:px-8">
        <p
          ref={textRef}
          className="text-center text-base sm:text-lg"
          style={{ color: "var(--foreground)" }}
        >
          Trusted by{" "}
          <span
            className="relative inline-block px-1 font-semibold"
            style={{ color: "var(--primary)" }}
          >
            100+ companies
            <svg
              ref={svgRef}
              viewBox="0 0 360 34"
              preserveAspectRatio="none"
              className="pointer-events-none absolute -bottom-1.5 left-1/2 h-2.5 w-[106%] -translate-x-1/2"
              aria-hidden="true"
            >
              <path
                d="M10 20 C 84 28, 152 10, 210 16 C 264 22, 306 14, 350 18"
                fill="none"
                stroke="var(--primary-hex,#5227ff)"
                strokeWidth="4.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity="0.8"
              />
              <path
                d="M26 26 C 110 22, 190 24, 334 20"
                fill="none"
                stroke="var(--primary-hex,#5227ff)"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity="0.38"
              />
            </svg>
          </span>{" "}
          worldwide for top-tier IT solutions.
        </p>
      </div>

      <div
        ref={marqueeRef}
        className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
      >
        <div className="relative overflow-hidden py-2 [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)] [-webkit-mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
          <div className="group flex w-max animate-marquee [animation-duration:30s] hover:[animation-play-state:paused]">
            {marqueeCompanies.map((company, i) => (
              <div
                key={`${company}-${i}`}
                className="mx-6 flex flex-shrink-0 items-center glass-effect sm:mx-8"
              >
                <span
                  className="text-sm font-semibold tracking-[0.12em] uppercase transition-colors duration-300 hover:text-[color:var(--primary)] sm:text-base font-['Space_Grotesk']"
                  style={{ color: "var(--foreground)", opacity: 0.68 }}
                >
                  {company}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
