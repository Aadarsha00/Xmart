import { ArrowRight } from "lucide-react";
// CTA Section matching Home/About design
function CTASection() {
  return (
    <section className="w-full flex justify-center items-center mt-24">
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
            NEED A CUSTOM
            <br />
            SOLUTION?
          </h2>
          <p
            className="text-left text-sm sm:text-base tracking-wide uppercase max-w-xl"
            style={{ color: "hsl(var(--foreground) / 0.6)" }}
          >
            OUR TEAM CAN TAILOR ANY OF OUR SERVICES TO MEET YOUR SPECIFIC
            REQUIREMENTS. LET'S DISCUSS HOW WE CAN HELP YOU ACHIEVE YOUR GOALS.
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
            {/* Down arrow themed for contrast */}
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
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Check } from "lucide-react";
import { services } from "@/data/services";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function ServicesPage() {
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".service-section",
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: pageRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        },
      );
    }, pageRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={pageRef} className="pt-24 pb-24">
      {/* Hero Section */}
      <section className="service-section max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="mb-10">
          <span
            className="inline-flex items-center border-l-4 pl-4 font-['Space_Grotesk'] text-[0.68rem] tracking-[0.14em] uppercase mb-4"
            style={{
              color: "hsl(var(--primary))",
              borderLeft: "4px solid hsl(var(--primary) / 0.8)",
            }}
          >
            Our Services
          </span>
          <h1
            className="font-['Space_Grotesk'] text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-7"
            style={{ color: "hsl(var(--foreground))" }}
          >
            Comprehensive{" "}
            <span style={{ color: "hsl(var(--primary))" }}>Digital Services</span>
          </h1>
          <p
            className="text-base mb-5 leading-relaxed max-w-2xl"
            style={{ color: "hsl(var(--foreground) / 0.7)" }}
          >
            From strategy and design through development, security, marketing,
            and ongoing support, we help businesses build and grow online.
          </p>
        </div>
      </section>

      {/* Services Grid - Editorial, Minimal, Glass Effect */}
      <section className="service-section max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16">
          {services.map((service) => (
            <div key={service.id} className="group flex flex-col h-full">
              <div className="relative mb-6 rounded-2xl overflow-hidden aspect-[4/3] border border-border bg-card/80 glass-effect">
                <div className="relative h-full w-full">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="absolute bottom-4 left-4">
                  <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center shadow-md">
                    <service.icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                </div>
              </div>
              <h3
                className="font-['Space_Grotesk'] text-2xl font-bold mb-2 group-hover:text-primary transition-colors duration-300"
                style={{ color: "hsl(var(--foreground))" }}
              >
                {service.title}
              </h3>
              <p
                className="text-muted-foreground text-base mb-4 line-clamp-2"
                style={{ color: "hsl(var(--foreground) / 0.6)" }}
              >
                {service.shortDescription}
              </p>
              <ul className="space-y-2 mb-6">
                {service.features.slice(0, 3).map((feature, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4 text-primary flex-shrink-0" />
                    <span
                      className="text-muted-foreground"
                      style={{ color: "hsl(var(--foreground) / 0.7)" }}
                    >
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="mt-auto">
                <Link
                  to={`/services/${service.id}`}
                  className="inline-flex items-center gap-2 text-primary font-medium group/link hover:underline"
                >
                  Learn More
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/link:translate-x-1" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section - Editorial, Minimal, Modern */}
      <CTASection />
      <style>{`
        .glass-effect {
          background: linear-gradient(120deg, hsl(var(--background) / 0.82) 80%, hsl(var(--primary) / 0.04));
          backdrop-filter: blur(8px);
        }
      `}</style>
    </div>
  );
}
