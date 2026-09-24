import { Hero } from "@/sections/Hero";
import { LogoStream } from "@/sections/LogoStream";
import { QuoteStatement } from "@/sections/QuoteStatement";
import { Statistics } from "@/sections/Statistics";

import { Services } from "@/sections/Services";
import { Testimonials } from "@/sections/Testimonials";


import { About } from "@/sections/About";
import { Blog } from "@/sections/Blog";

// Inline CTASection from AboutPage
import { ArrowRight } from "lucide-react";
// import SmartPointHero from "@/sections/Hero1";
function CTASection() {
  return (
    <section className="w-full flex justify-center items-center mb-24">
      <div
        className="w-full max-w-7xl rounded-3xl px-6 sm:px-12 py-12 flex flex-col sm:flex-row items-center justify-between gap-8 shadow-lg relative overflow-hidden"
        style={{
          minHeight: "200px",
          background: "hsl(var(--background) / 0.98)",
          border: "1.5px solid hsl(var(--border) / 0.13)",
        }}
      >
        {/* Themed radial glow in top-right using primary color */}
        <div
          className="pointer-events-none absolute right-0 top-0 w-72 h-72"
          style={{
            background:
              "radial-gradient(ellipse at top right, hsl(var(--primary) / 0.18) 0%, transparent 70%)",
          }}
        />
        <div className="flex-1 min-w-0">
          <h2
            className="font-['Space_Grotesk'] text-left text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight uppercase mb-7"
            style={{ color: "hsl(var(--foreground))" }}
          >
            READY TO WORK
            <br />
            WITH US?
          </h2>
          <p
            className="text-left text-sm sm:text-base tracking-wide uppercase max-w-xl"
            style={{ color: "hsl(var(--foreground) / 0.6)" }}
          >
            PARTNER WITH OUR DESIGN AGENCY FOR YOUR BUSINESS WITH AMAZING
            RESULTS.
          </p>
        </div>
        <div className="flex-shrink-0 flex items-center justify-center mt-8 sm:mt-0">
          <button
            type="button"
            className="relative group focus:outline-none"
            aria-label="Scroll Down"
            style={{ width: 88, height: 88 }}
          >
            {/* Outer dashed border using primary color */}
            <span
              className="absolute inset-0 rounded-full border-2 border-dashed"
              style={{
                boxSizing: "border-box",
                borderColor: "hsl(var(--primary))",
              }}
            />
            {/* Primary background and glow */}
            <span
              className="absolute inset-2 rounded-full"
              style={{
                background: "hsl(var(--primary))",
                boxShadow: "0 0 0 8px hsl(var(--primary) / 0.10)",
              }}
            />
            {/* Arrow icon themed for contrast */}
            <span className="relative z-10 flex items-center justify-center w-full h-full">
              <ArrowRight
                className="w-8 h-8"
                style={{ color: "hsl(var(--primary-foreground))" }}
              />
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}

export function HomePage() {
  return (
    <>
     <Hero/>
      <LogoStream />
      <QuoteStatement />
      <Statistics />
      <About />
      <Services />
      <Testimonials />
      <Blog />
      <CTASection />
    </>
  );
}
