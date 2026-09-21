import { AboutHeroStats } from "./AboutHeroStats";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export function AboutHeroBlock() {
  return (
    <section className="about-section max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <span
            className="inline-flex items-center border-l-4 pl-4 font-['Space_Grotesk'] text-[0.68rem] tracking-[0.14em] uppercase mb-4"
            style={{
              color: "hsl(var(--primary))",
              borderLeftColor: "hsl(var(--primary))",
            }}
          >
            About Us
          </span>
          <h1
            className="font-['Space_Grotesk'] text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-7"
            style={{ color: "hsl(var(--foreground))" }}
          >
            Building the{" "}
            <span style={{ color: "hsl(var(--primary))" }}>Future</span> of IT
          </h1>
          <p
            className="text-base mb-5 leading-relaxed max-w-2xl"
            style={{ color: "hsl(var(--foreground), 0.7)" }}
          >
            Xmart is a leading technology solutions provider dedicated to
            helping businesses navigate the digital landscape. With over a
            decade of experience, we&apos;ve helped hundreds of organizations
            transform their IT infrastructure and achieve their goals.
          </p>
          <p
            className="text-base mb-8 leading-relaxed max-w-2xl"
            style={{ color: "hsl(var(--foreground), 0.6)" }}
          >
            Our team of experts brings together deep technical knowledge with
            business acumen to deliver solutions that drive real results. From
            startups to Fortune 500 companies, we partner with organizations of
            all sizes to solve their most complex technology challenges.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/contact"
              className="about-glow-btn relative inline-flex items-center justify-center gap-2 px-8 py-4 font-['Space_Grotesk'] text-xs font-medium tracking-[0.08em] uppercase border transition-colors duration-300 focus:outline-none rounded-full"
              style={{
                color: "hsl(var(--primary-foreground))",
                background: "hsl(var(--primary))",
                borderColor: "hsl(var(--border))",
              }}
            >
              <span className="relative z-10 flex items-center gap-2">
                Work With Us
                <ArrowRight className="w-5 h-5" />
              </span>
              <span className="about-glow-anim" aria-hidden="true" />
            </Link>
            <Link
              to="/services"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 font-['Space_Grotesk'] text-xs font-medium tracking-[0.08em] uppercase border bg-transparent rounded-full transition-colors duration-300"
              style={{
                color: "hsl(var(--foreground))",
                borderColor: "hsl(var(--border))",
              }}
            >
              Our Services
            </Link>
          </div>
        </div>
        <AboutHeroStats />
      </div>
    </section>
  );
}
