import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const teamMembers = [
  {
    name: "Sabin Joshi",
    role: "Founder",
    image: "/SabinPicture.jpeg",
  },
  {
    name: "Diwas Amatya",
    role: "Chief Executive Officer",
    image: "/diwaspicture2.jpeg",
  },
  {
    name: "Aryak Shah",
    role: "Chief Technology Officer",
    image: "/AryakPicture.jpeg",
  },
  {
    name: "Dipendra Shrestha",
    role: "Company Controller",
    image: "/DipendraPicture.jpeg",
  },
  {
    name: "Inka Pradhan",
    role: "Designer",
    image: "/InkaPicture2.jpeg",
  },
  {
    name: "Bhargav Pokhrel",
    role: "Programmer",
    image: "/BhargavPicture.jpeg",
  },
  {
    name: "Prachi Sulpya",
    role: "Business Development Officer",
    image: "/PrachiPicture.jpeg",
  },
  {
    name: "Tisa Kasaju",
    role: "Cybersecurity",
    image: "/tisapicture.jpeg",
  },
];

export function Team() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current?.children || [],
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.76,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 82%",
            toggleActions: "play none none reverse",
          },
        },
      );

      const cards = gridRef.current?.querySelectorAll(".expert-card");
      if (cards) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 32 },
          {
            opacity: 1,
            y: 0,
            duration: 0.72,
            stagger: 0.07,
            ease: "power3.out",
            scrollTrigger: {
              trigger: gridRef.current,
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
      id="team"
      ref={sectionRef}
      className="relative overflow-hidden py-20 sm:py-24"
    >
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          ref={headerRef}
          className="grid gap-6 border-b border-white/10 pb-8 sm:pb-10 lg:mb-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end"
        >
          <div>
            <span
              className="inline-flex items-center border-l pl-3 font-['Space_Grotesk'] text-[0.68rem] tracking-[0.14em] uppercase"
              style={{
                color: "hsl(var(--primary))",
                borderLeft: "4px solid hsl(var(--primary) / 0.7)",
              }}
            >
              Team
            </span>
            <h2
              className="mt-4 font-['Space_Grotesk'] text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl"
              style={{ color: "hsl(var(--foreground))" }}
            >
              Meet the people building your next systems.
            </h2>
          </div>

          <div className="flex flex-col items-start gap-4 lg:items-end">
            <p
              className="max-w-md text-sm leading-relaxed sm:text-base lg:text-right"
              style={{ color: "hsl(var(--foreground) / 0.62)" }}
            >
              Cross-functional specialists in engineering, security, design, and
              delivery working as one execution team.
            </p>
            <Link
              to="/contact"
              className="inline-flex h-12 px-7 items-center justify-center rounded-full font-['Space_Grotesk'] text-sm font-medium tracking-[0.08em] uppercase transition-colors duration-300"
              style={{
                background: "hsl(var(--primary))",
                color: "hsl(var(--primary-foreground))",
                border: "1.5px solid hsl(var(--border) / 0.20)",
                boxShadow: "0 0 0 0 rgba(0,0,0,0)",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = "hsl(var(--primary) / 0.90)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = "hsl(var(--primary))";
              }}
            >
              View careers
            </Link>
          </div>
        </div>

        <div
          ref={gridRef}
          className="mt-8 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 lg:mt-0 lg:grid-cols-4 lg:gap-x-7 lg:gap-y-10"
        >
          {teamMembers.map((member, index) => (
            <article key={member.name} className="expert-card group">
              <div
                className="mb-3 flex items-center justify-between border-b pb-3"
                style={{ borderBottom: "1px solid hsl(var(--border) / 0.12)" }}
              >
                <p
                  className="font-['Space_Grotesk'] text-[0.72rem] tracking-[0.12em] uppercase"
                  style={{ color: "hsl(var(--primary))" }}
                >
                  {String(index + 1).padStart(2, "0")}
                </p>
                <p
                  className="text-[0.68rem] tracking-[0.12em] uppercase"
                  style={{ color: "hsl(var(--foreground) / 0.45)" }}
                >
                  Xmart
                </p>
              </div>

              <div
                className="relative overflow-hidden rounded-[1.1rem] border"
                style={{
                  borderColor: "hsl(var(--border) / 0.10)",
                  background: "hsl(var(--background) / 0.20)",
                }}
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="h-56 w-full object-cover object-center transition-transform duration-700 group-hover:scale-[1.02] sm:h-60"
                />
                <div
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t"
                  style={{
                    background:
                      "linear-gradient(to top, hsl(var(--background) / 0.24), transparent 80%)",
                  }}
                />
              </div>

              <div className="pt-4">
                <h3
                  className="font-['Space_Grotesk'] text-[1.22rem] font-semibold leading-tight sm:text-[1.3rem]"
                  style={{ color: "hsl(var(--foreground))" }}
                >
                  {member.name}
                </h3>
                <p
                  className="mt-1 text-sm tracking-[0.01em] sm:text-[0.92rem]"
                  style={{ color: "hsl(var(--foreground) / 0.58)" }}
                >
                  {member.role}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
