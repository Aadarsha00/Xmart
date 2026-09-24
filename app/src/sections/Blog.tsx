import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { blogPosts } from "@/data/blog";

gsap.registerPlugin(ScrollTrigger);

export function Blog() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  const homepagePosts = blogPosts.slice(0, 3);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current?.children || [],
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.75,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 82%",
            toggleActions: "play none none reverse",
          },
        },
      );

      const cards = cardsRef.current?.querySelectorAll(".insight-card");
      if (cards) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 38 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: cardsRef.current,
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
      id="blog"
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
                borderLeft: "3px solid hsl(var(--primary))",
              }}
            >
              Blog
            </span>
            <h2
              className="mt-4 font-['Space_Grotesk'] text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl"
              style={{ color: "hsl(var(--foreground))" }}
            >
              Latest insights from our team.
            </h2>
          </div>

          <div className="flex flex-col items-start gap-4 lg:items-end">
            <p
              className="max-w-md text-sm leading-relaxed sm:text-base lg:text-right"
              style={{ color: "hsl(var(--foreground) / 0.62)" }}
            >
              Ideas, implementation notes, and practical field learnings from
              modern infrastructure and security projects.
            </p>
            <Link
              to="/blog"
              className="inline-flex h-11 items-center justify-center rounded-full px-6 font-['Space_Grotesk'] text-sm font-medium tracking-[0.08em] uppercase transition-colors duration-300 border"
              style={{
                background: "hsl(var(--primary) / 0.92)",
                color: "hsl(var(--primary-foreground))",
                borderColor: "hsl(var(--border) / 0.20)",
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
              View more
            </Link>
          </div>
        </div>

        <div
          ref={cardsRef}
          className="mt-8 grid gap-x-6 gap-y-8 md:grid-cols-2 lg:mt-0 lg:grid-cols-3 lg:gap-x-7 lg:gap-y-10"
        >
          {homepagePosts.map((post, index) => {
            const formattedDate = new Date(post.date).toLocaleDateString(
              "en-US",
              {
                month: "short",
                day: "2-digit",
                year: "numeric",
              },
            );

            return (
              <article key={post.id} className="insight-card group">
                <Link to={`/blog/${post.id}`} className="block">
                  <div
                    className="mb-3 flex items-center justify-between border-b pb-3"
                    style={{ borderColor: "hsl(var(--border) / 0.12)" }}
                  >
                    <p
                      className="font-['Space_Grotesk'] text-[0.72rem] tracking-[0.12em] uppercase"
                      style={{ color: "hsl(var(--primary))" }}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </p>
                    <p
                      className="text-[0.68rem] tracking-[0.14em] uppercase"
                      style={{ color: "hsl(var(--foreground) / 0.50)" }}
                    >
                      {formattedDate}
                    </p>
                  </div>

                  <div
                    className="relative overflow-hidden rounded-[1.1rem] border"
                    style={{
                      borderColor: "hsl(var(--border) / 0.10)",
                      background: "hsl(var(--background) / 0.92)",
                    }}
                  >
                    <img
                      src={post.image}
                      alt={post.title}
                      className="h-52 w-full object-cover transition-transform duration-700 group-hover:scale-[1.02] sm:h-60 lg:h-56"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/22 via-transparent to-transparent" />
                  </div>

                  <p
                    className="mt-3 text-[0.7rem] tracking-[0.12em] uppercase"
                    style={{ color: "hsl(var(--foreground) / 0.52)" }}
                  >
                    {post.category} • {post.readTime}
                  </p>

                  <h3
                    className="mt-2 line-clamp-2 font-['Space_Grotesk'] text-[1.3rem] font-semibold leading-[1.25] tracking-tight transition-colors duration-300 group-hover:opacity-80 sm:text-[1.45rem]"
                    style={{ color: "hsl(var(--foreground))" }}
                  >
                    {post.title}
                  </h3>

                  <p
                    className="mt-2 line-clamp-2 text-sm leading-relaxed sm:text-[0.92rem]"
                    style={{ color: "hsl(var(--foreground) / 0.58)" }}
                  >
                    {post.excerpt}
                  </p>

                  <p
                    className="mt-4 font-['Space_Grotesk'] text-[0.72rem] tracking-[0.14em] uppercase"
                    style={{ color: "hsl(var(--primary))" }}
                  >
                    Read article
                  </p>
                </Link>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
