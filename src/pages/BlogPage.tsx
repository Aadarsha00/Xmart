import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Calendar, Clock, Search } from "lucide-react";
import { blogPosts } from "@/data/blog";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// CTA Section matching Home/About/Services design
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
            WANT MORE INSIGHTS?
          </h2>
          <p
            className="text-left text-sm sm:text-base tracking-wide uppercase max-w-xl"
            style={{ color: "hsl(var(--foreground) / 0.6)" }}
          >
            SUBSCRIBE TO OUR NEWSLETTER FOR THE LATEST TRENDS, INDUSTRY NEWS,
            AND EXCLUSIVE CONTENT DELIVERED STRAIGHT TO YOUR INBOX.
          </p>
        </div>
        <div className="flex-shrink-0 flex items-center justify-center mt-8 sm:mt-0">
          <a
            href="#newsletter"
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
          </a>
        </div>
      </div>
    </section>
  );
}

const categories = [
  "All",
  "AI & Machine Learning",
  "Cybersecurity",
  "Cloud Computing",
  "DevOps",
  "Data Science",
];

export function BlogPage() {
  const pageRef = useRef<HTMLDivElement>(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = blogPosts.filter((post) => {
    const matchesCategory =
      selectedCategory === "All" || post.category === selectedCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".blog-card",
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".blog-grid",
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        },
      );
    });
    return () => ctx.revert();
  }, [filteredPosts.length]);

  return (
    <div ref={pageRef} className="pt-24 pb-24">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="mb-10 text-center">
          <span
            className="inline-flex items-center border-l-4 pl-4 font-['Space_Grotesk'] text-[0.68rem] tracking-[0.14em] uppercase mb-4"
            style={{
              color: "hsl(var(--primary))",
              borderLeft: "4px solid hsl(var(--primary) / 0.8)",
            }}
          >
            Blog & Insights
          </span>
          <h1
            className="font-['Space_Grotesk'] text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-7"
            style={{ color: "hsl(var(--foreground))" }}
          >
            Latest from{" "}
            <span style={{ color: "hsl(var(--primary))" }}>XSmart</span>
          </h1>
          <p
            className="text-base mb-5 leading-relaxed max-w-2xl mx-auto"
            style={{ color: "hsl(var(--foreground) / 0.7)" }}
          >
            Stay up to date with the latest trends, insights, and best practices
            in IT, cloud computing, cybersecurity, and digital transformation.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
          {/* Search */}
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-transparent border-b-2 border-border text-foreground rounded-none focus:outline-none focus:border-primary transition-colors duration-300"
              style={{
                color: "hsl(var(--foreground) / 0.9)",
                borderBottom: "2px solid hsl(var(--border) / 0.13)",
              }}
            />
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium border transition-all duration-300 focus:outline-none ${
                  selectedCategory === category
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-transparent text-muted-foreground border-border hover:bg-primary/10 hover:text-primary hover:border-primary/40"
                }`}
                style={
                  selectedCategory === category
                    ? {
                        background: "hsl(var(--primary))",
                        color: "hsl(var(--primary-foreground))",
                        borderColor: "hsl(var(--primary))",
                      }
                    : {
                        color: "hsl(var(--foreground) / 0.7)",
                        borderColor: "hsl(var(--border) / 0.13)",
                      }
                }
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Grid - Editorial, Minimal, Glass Effect */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        {filteredPosts.length > 0 ? (
          <div className="blog-grid grid md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16">
            {filteredPosts.map((post) => (
              <article
                key={post.id}
                className="blog-card group flex flex-col h-full border-b border-border bg-transparent transition-all duration-500 hover:border-primary"
              >
                {/* Image */}
                <div className="relative mb-6 rounded-2xl overflow-hidden aspect-[4/3] border border-border bg-card/80 glass-effect">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4">
                    <span
                      className="px-3 py-1 text-primary-foreground text-xs font-medium rounded-full"
                      style={{ background: "hsl(var(--primary))" }}
                    >
                      {post.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 flex flex-col">
                  {/* Meta */}
                  <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(post.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {post.readTime}
                    </span>
                  </div>

                  {/* Title */}
                  <h2
                    className="font-['Space_Grotesk'] text-2xl font-bold mb-2 transition-colors duration-300 line-clamp-2 group-hover:text-primary"
                    style={{ color: "hsl(var(--foreground))" }}
                  >
                    {post.title}
                  </h2>

                  {/* Excerpt */}
                  <p
                    className="text-base text-muted-foreground mb-4 line-clamp-2"
                    style={{ color: "hsl(var(--foreground) / 0.6)" }}
                  >
                    {post.excerpt}
                  </p>

                  {/* Author & Read More */}
                  <div className="flex items-center justify-between pt-4 mt-auto border-t border-border">
                    <div className="flex items-center gap-2">
                      <img
                        src={post.author.image}
                        alt={post.author.name}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <span
                        className="text-sm font-medium text-foreground"
                        style={{ color: "hsl(var(--foreground) / 0.8)" }}
                      >
                        {post.author.name}
                      </span>
                    </div>
                    <Link
                      to={`/blog/${post.id}`}
                      className="flex items-center gap-1 text-sm font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0 text-primary"
                    >
                      Read More
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-lg">
              No articles found matching your criteria.
            </p>
            <button
              onClick={() => {
                setSelectedCategory("All");
                setSearchQuery("");
              }}
              className="mt-4 hover:underline text-primary"
            >
              Clear filters
            </button>
          </div>
        )}
      </section>

      {/* Newsletter Section - Minimal, Editorial, Glass Effect */}
      <section
        id="newsletter"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24"
      >
        <div
          className="relative border-b-2 bg-card/80 glass-effect p-12 overflow-hidden"
          style={{ borderBottom: "2px solid hsl(var(--primary))" }}
        >
          <div
            className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl"
            style={{
              background:
                "radial-gradient(ellipse at top right, hsl(var(--primary) / 0.10) 0%, transparent 70%)",
            }}
          />
          <div
            className="absolute bottom-0 left-0 w-48 h-48 rounded-full blur-3xl"
            style={{
              background:
                "radial-gradient(ellipse at bottom left, hsl(var(--primary) / 0.10) 0%, transparent 70%)",
            }}
          />
          <div className="relative z-10 max-w-2xl mx-auto text-center">
            <h2
              className="font-['Space_Grotesk'] text-3xl font-bold mb-4"
              style={{ color: "hsl(var(--foreground))" }}
            >
              Subscribe to Our Newsletter
            </h2>
            <p
              className="mb-8 text-muted-foreground"
              style={{ color: "hsl(var(--foreground) / 0.7)" }}
            >
              Get the latest insights, industry news, and exclusive content
              delivered straight to your inbox.
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-4 bg-transparent border-b-2 border-border text-foreground rounded-none focus:outline-none focus:border-primary transition-colors duration-300"
                style={{
                  color: "hsl(var(--foreground) / 0.9)",
                  borderBottom: "2px solid hsl(var(--border) / 0.13)",
                }}
              />
              <button
                type="submit"
                className="px-8 py-4 font-medium rounded-full transition-all duration-300"
                style={{
                  background: "hsl(var(--primary))",
                  color: "hsl(var(--primary-foreground))",
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.background =
                    "hsl(var(--primary) / 0.85)")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.background = "hsl(var(--primary))")
                }
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Unified CTA Section */}
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
