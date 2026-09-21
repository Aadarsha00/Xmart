import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { services } from "@/data/services";

gsap.registerPlugin(ScrollTrigger);

export function Services() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const homepageServices = services.slice(0, 3);
  const [activeServiceId, setActiveServiceId] = useState<string | null>(
    homepageServices[1]?.id ?? homepageServices[0]?.id ?? null,
  );

  const activeService =
    homepageServices.find((service) => service.id === activeServiceId) ??
    homepageServices[0];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current?.children || [],
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.78,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 82%",
            toggleActions: "play none none reverse",
          },
        },
      );

      gsap.fromTo(
        imageRef.current,
        { opacity: 0, y: 34 },
        {
          opacity: 1,
          y: 0,
          duration: 0.82,
          ease: "power3.out",
          scrollTrigger: {
            trigger: imageRef.current,
            start: "top 84%",
            toggleActions: "play none none reverse",
          },
        },
      );

      const rows = listRef.current?.querySelectorAll(".service-row");
      if (rows) {
        gsap.fromTo(
          rows,
          { opacity: 0, x: 36 },
          {
            opacity: 1,
            x: 0,
            duration: 0.72,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: listRef.current,
              start: "top 82%",
              toggleActions: "play none none reverse",
            },
          },
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  if (!activeService) {
    return null;
  }

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative overflow-hidden py-20 sm:py-24"
    >
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          ref={titleRef}
          className="mb-8 flex flex-col gap-5 sm:mb-10 lg:mb-12 lg:flex-row lg:items-start lg:justify-between"
        >
          <div className="max-w-2xl">
            <h2
              className="font-['Space_Grotesk'] text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl"
              style={{ color: "hsl(var(--foreground))" }}
            >
              OUR SERVICES
            </h2>
            <p
              className="mt-3 text-sm leading-relaxed sm:text-base"
              style={{ color: "hsl(var(--foreground) / 0.64)" }}
            >
              This is part of our service that can give you satisfaction.
            </p>
          </div>

          <Link
            to="/services"
            className="inline-flex h-12 px-7 uppercase items-center justify-center rounded-full font-['Space_Grotesk'] text-base font-semibold transition-colors duration-300 border"
            style={{
              background: "hsl(var(--primary) / 0.92)",
              color: "hsl(var(--primary-foreground))",
              borderColor: "hsl(var(--border) / 0.20)",
            }}
            onMouseOver={(e) =>
              (e.currentTarget.style.background = "hsl(var(--primary) / 0.72)")
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.background = "hsl(var(--primary) / 0.92)")
            }
          >
            View more
          </Link>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.04fr_1fr] lg:gap-10">
          <div
            ref={imageRef}
            className="relative min-h-[280px] overflow-hidden rounded-[2rem] border border-white/12 bg-black/25 sm:min-h-[380px] lg:min-h-[500px]"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.img
                key={activeService.id}
                src={activeService.image}
                alt={activeService.title}
                initial={{ opacity: 0, scale: 1.05, filter: "blur(4px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 1.03, filter: "blur(3px)" }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0 h-full w-full object-cover"
              />
            </AnimatePresence>
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-black/12 to-transparent" />
          </div>

          <div ref={listRef} className="flex flex-col">
            {homepageServices.map((service, index) => {
              const isActive = service.id === activeService.id;
              const number = String(index + 1).padStart(2, "0");

              return (
                <div
                  key={service.id}
                  className={`service-row relative transition-all duration-300 ${isActive ? "py-2" : ""}`}
                >
                  <div
                    className={
                      isActive
                        ? "cursor-pointer rounded-[2rem] border bg-white/[0.035] px-4 py-5 transition-all duration-500 sm:px-6 sm:py-6"
                        : `cursor-pointer rounded-2xl px-2 py-5 transition-all duration-500 hover:bg-white/[0.02] sm:py-6 ${index !== homepageServices.length - 1 ? "border-b" : ""}`
                    }
                    style={{
                      borderColor: isActive
                        ? "hsl(var(--border) / 0.22)"
                        : "hsl(var(--border) / 0.10)",
                      background: isActive
                        ? "hsl(var(--background) / 0.7)"
                        : "transparent",
                    }}
                    role="button"
                    tabIndex={0}
                    aria-pressed={isActive}
                    onClick={() => setActiveServiceId(service.id)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        setActiveServiceId(service.id);
                      }
                    }}
                  >
                    <div className="flex items-start gap-4 sm:gap-5">
                      <span
                        className={`pt-0.5 font-['Space_Grotesk'] text-xl font-semibold sm:text-2xl`}
                        style={{
                          color: isActive
                            ? "hsl(var(--primary))"
                            : "hsl(var(--foreground) / 0.62)",
                        }}
                      >
                        {number}
                      </span>

                      <div className="min-w-0 flex-1">
                        <h3
                          className="font-['Space_Grotesk'] text-2xl font-semibold tracking-tight sm:text-[1.7rem] lg:text-[1.85rem]"
                          style={{ color: "hsl(var(--primary))" }}
                        >
                          {service.title}
                        </h3>
                        <p
                          className="mt-2.5 max-w-xl text-sm leading-relaxed sm:mt-3 sm:text-[0.98rem] lg:text-base"
                          style={{ color: "hsl(var(--foreground) / 0.62)" }}
                        >
                          {service.shortDescription}
                        </p>
                      </div>

                      <Link
                        to={`/services/${service.id}`}
                        className={`mt-0.5 inline-flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border transition-colors duration-300 sm:h-10 sm:w-10`}
                        style={{
                          borderColor: isActive
                            ? "hsl(var(--primary))"
                            : "hsl(var(--border) / 0.22)",
                          background: isActive
                            ? "hsl(var(--primary) / 0.12)"
                            : "transparent",
                          color: isActive
                            ? "hsl(var(--primary))"
                            : "hsl(var(--foreground) / 0.62)",
                        }}
                        aria-label={`Open ${service.title}`}
                      >
                        <ArrowUpRight className="h-4 w-4 sm:h-5 sm:w-5" />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
