// Editorial highlights for About section
const highlights = [
  {
    title: "Practical Solutions",
    text: "We focus on building digital systems that work in the real world, not just on paper.",
  },
  {
    title: "Long-Term Partnership",
    text: "Our team is dedicated to supporting your growth and adapting as your needs evolve.",
  },
  {
    title: "Secure & Scalable",
    text: "Security and scalability are built in from day one, so you can grow with confidence.",
  },
];
import { useId, useRef } from "react";
import { Link } from "react-router-dom";

export function About() {
  const clipId = useId().replace(/[:]/g, "");
  const sectionRef = useRef<HTMLElement>(null);
  const shellRef = useRef<HTMLDivElement>(null);
  const highlightsRef = useRef<HTMLDivElement>(null);
  // SVG paths
  const framePath =
    "M52 0 H948 Q1000 0 1000 52 V458 H734 Q700 458 700 492 V560 H52 Q0 560 0 508 V52 Q0 0 52 0 Z";
  const clipNormPath =
    "M0.052 0 H0.948 Q1 0 1 0.093 V0.8179 H0.734 Q0.7 0.8179 0.7 0.8786 V1 H0.052 Q0 1 0 0.907 V0.093 Q0 0 0.052 0 Z";
  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative overflow-hidden py-20 sm:py-24"
    >
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          ref={shellRef}
          className="relative px-0 pb-6 pt-4 sm:pb-8 sm:pt-6 lg:pb-10 lg:pt-8"
        >
          <div className="about-intro grid gap-6 border-b border-white/10 pb-8 sm:gap-8 sm:pb-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
            <div>
              <span
                className="inline-flex items-center pl-3 font-['Space_Grotesk'] text-[0.68rem] tracking-[0.14em] uppercase"
                style={{
                  color: "var(--primary-hex)",
                  borderLeft: "3px solid var(--primary-hex)",
                }}
              >
                Who we are
              </span>
              <h2
                className="mt-4 font-['Space_Grotesk'] text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl"
                style={{ color: "hsl(var(--foreground))" }}
              >
                A focused technology partner built for long-term growth.
              </h2>
            </div>
            <p
              className="text-sm leading-relaxed sm:text-base lg:max-w-md lg:justify-self-end lg:text-right"
              style={{ color: "hsl(var(--foreground) / 0.64)" }}
            >
              We design and deliver secure digital systems that stay practical
              in production, adapt to your operations, and scale with your
              business over time.
            </p>
          </div>
          <div className="about-panel relative" style={{ display: "block" }}>
            <div style={{ paddingBottom: "56%" }}>
              {/* Hidden SVG defs for clip path */}
              <svg
                className="pointer-events-none absolute inset-0 h-0 w-0"
                aria-hidden="true"
                focusable="false"
              >
                <defs>
                  <clipPath
                    id={`about-clip-${clipId}`}
                    clipPathUnits="objectBoundingBox"
                  >
                    <path d={clipNormPath} />
                  </clipPath>
                </defs>
              </svg>
              {/* Clipped image layer */}
              <div
                className="absolute inset-0"
                style={{
                  clipPath: `url(#about-clip-${clipId})`,
                  WebkitClipPath: `url(#about-clip-${clipId})`,
                }}
              >
                <img
                  src="/TeamPicture.jpeg"
                  alt="Xmart Team"
                  className="h-full w-full object-cover saturate-0 hover:saturate-100 transition duration-300"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/28 via-transparent to-transparent" />
                <span
                  className="glass-effect absolute left-5 top-5 rounded-3xl px-4 py-2 text-[0.68rem] tracking-[0.12em] uppercase sm:left-6 sm:top-6 sm:px-5 sm:py-2.5 sm:text-[0.72rem]"
                  style={{
                    background: "hsl(var(--background) / 0.5)",
                    color: "hsl(var(--primary-hex))",
                    borderColor: "hsl(var(--border) / 0.22)",
                  }}
                >
                  About us
                </span>
                <span
                  className="glass-effect absolute right-5 top-5 rounded-3xl px-4 py-2 text-[0.68rem] tracking-[0.12em] uppercase sm:right-6 sm:top-6 sm:px-5 sm:py-2.5 sm:text-[0.72rem]"
                  style={{
                    background: "hsl(var(--background) / 0.5)",
                    color: "hsl(var(--primary-hex))",
                    borderColor: "hsl(var(--border) / 0.22)",
                  }}
                >
                  10+ years
                </span>
                <span
                  className="glass-effect absolute bottom-[8.8%] left-5 rounded-3xl px-4 py-2 text-[0.68rem] tracking-[0.12em] uppercase sm:left-6 sm:px-5 sm:py-2.5 sm:text-[0.72rem]"
                  style={{
                    background: "hsl(var(--background) / 0.5)",
                    color: "hsl(var(--primary-hex))",
                    borderColor: "hsl(var(--border) / 0.22)",
                  }}
                >
                  500+ clients
                </span>
                <span
                  className="glass-effect absolute right-5 top-5 rounded-3xl px-4 py-2 text-[0.68rem] tracking-[0.12em] uppercase sm:right-6 sm:top-6 sm:px-5 sm:py-2.5 sm:text-[0.72rem]"
                  style={{
                    background: "hsl(var(--background) / 0.5)",
                    color: "hsl(var(--primary-hex))",
                    borderColor: "hsl(var(--border) / 0.22)",
                  }}
                >
                  10+ years
                </span>
                <span
                  className="glass-effect absolute bottom-[8.8%] left-5 rounded-3xl px-4 py-2 text-[0.68rem] tracking-[0.12em] uppercase sm:left-6 sm:px-5 sm:py-2.5 sm:text-[0.72rem]"
                  style={{
                    background: "hsl(var(--background) / 0.5)",
                    color: "hsl(var(--primary-hex))",
                    borderColor: "hsl(var(--border) / 0.22)",
                  }}
                >
                  500+ clients
                </span>
              </div>
              {/* Stroke border — same path as clip, layered on top */}
              <svg
                className="pointer-events-none absolute inset-0 h-full w-full"
                viewBox="0 0 1000 560"
                preserveAspectRatio="none"
                aria-hidden="true"
                focusable="false"
              >
                <path
                  d={framePath}
                  fill="none"
                  stroke="rgba(255,255,255,0.18)"
                  strokeWidth="1.15"
                />
              </svg>
              {/* Notch CTA button */}
              <Link
                to="/about"
                className="glass-effect absolute z-20 flex items-center justify-center font-['Space_Grotesk'] text-xs font-medium tracking-[0.08em] uppercase border transition-colors duration-300"
                style={{
                  background: "hsl(var(--primary) / 0.92)",
                  color: "hsl(var(--primary-foreground))",
                  borderColor: "hsl(var(--border) / 0.20)",
                  right: 0,
                  bottom: 0,
                  width: "calc(30% - 0.6%)",
                  height: "calc(18.2% - 1.1%)",
                  borderTopLeftRadius: "1.5rem",
                  borderTopRightRadius: 0,
                  borderBottomRightRadius: "1.5rem",
                  borderBottomLeftRadius: 0,
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.background =
                    "hsl(var(--primary) / 0.72)")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.background =
                    "hsl(var(--primary) / 0.92)")
                }
              >
                Learn more
              </Link>
            </div>
          </div>
          <div
            ref={highlightsRef}
            className="mx-auto mt-8 grid max-w-5xl grid-cols-1 divide-y border-y pb-2 sm:mt-10 sm:grid-cols-3 sm:divide-x sm:divide-y-0"
            style={{ borderColor: "hsl(var(--border) / 0.10)" }}
          >
            {highlights.map((item) => (
              <article
                key={item.title}
                className="about-chip px-4 py-4 sm:px-6"
              >
                <h3
                  className="font-['Space_Grotesk'] text-[0.72rem] font-medium tracking-[0.12em] uppercase"
                  style={{ color: "hsl(var(--primary))" }}
                >
                  {item.title}
                </h3>
                <p className="mt-1 text-xs leading-relaxed text-white/62 sm:text-[0.84rem]">
                  <span style={{ color: "hsl(var(--foreground) / 0.62)" }}>
                    {item.text}
                  </span>
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
