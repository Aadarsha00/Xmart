import { useEffect, useRef } from "react";
import { marked } from "marked";
import { useParams, Link, Navigate } from "react-router-dom";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Share2,
  Twitter,
  Linkedin,
  Facebook,
} from "lucide-react";
import { getBlogPostById, getRelatedPosts } from "@/data/blog";
import gsap from "gsap";

export function BlogPostPage() {
  const { postId } = useParams<{ postId: string }>();
  const post = getBlogPostById(postId || "");
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!post) return;

    window.scrollTo(0, 0);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".post-content",
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
      );
    }, pageRef);

    return () => ctx.revert();
  }, [post]);

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  const relatedPosts = getRelatedPosts(post.id);

  // Use marked to convert markdown to HTML
  const formatContent = (content: string) => {
    return marked.parse((content || "").trim());
  };

  return (
    <div ref={pageRef} className="pt-24 pb-24">
      {/* Hero Image */}
      <div className="relative h-[400px] overflow-hidden">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, hsl(var(--background)), hsl(var(--background) / 0.6), transparent)",
          }}
        />
      </div>

      {/* Content */}
      <div className="post-content max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-32 relative z-10">
        {/* Back Link */}
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors duration-300 mb-6"
          style={{ color: "hsl(var(--muted-foreground))" }}
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Blog
        </Link>

        {/* Article Card */}
        <article className="bg-card border border-border rounded-3xl p-8 md:p-12 shadow-xl">
          {/* Category */}
          <span
            className="inline-block px-4 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full mb-6"
            style={{
              background: "hsl(var(--primary) / 0.10)",
              color: "hsl(var(--primary))",
            }}
          >
            {post.category}
          </span>

          {/* Title */}
          <h1
            className="text-3xl md:text-4xl font-bold mb-6 font-['Space_Grotesk']"
            style={{ color: "hsl(var(--foreground))" }}
          >
            {post.title}
          </h1>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-6 mb-8 pb-8 border-b border-border">
            <div className="flex items-center gap-3">
              <img
                src={post.author.image}
                alt={post.author.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <p
                  className="font-medium"
                  style={{ color: "hsl(var(--foreground))" }}
                >
                  {post.author.name}
                </p>
                <p
                  className="text-sm text-muted-foreground"
                  style={{ color: "hsl(var(--muted-foreground))" }}
                >
                  {post.author.role}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {new Date(post.date).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {post.readTime}
              </span>
            </div>
          </div>

          {/* Content */}
          <div
            className="prose prose-lg prose-invert max-w-none prose-headings:font-['Space_Grotesk'] prose-headings:text-foreground prose-h1:text-4xl prose-h2:text-2xl prose-h3:text-xl prose-h1:mb-6 prose-h2:mb-4 prose-h3:mb-3 prose-h2:mt-10 prose-h3:mt-8 prose-p:text-muted-foreground prose-p:mb-6 prose-li:text-muted-foreground prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:pl-6 prose-blockquote:text-muted-foreground prose-code:bg-background prose-code:text-primary prose-code:px-2 prose-code:py-1 prose-code:rounded-md prose-img:rounded-xl prose-img:shadow-lg prose-a:text-primary prose-a:underline hover:prose-a:text-primary/80"
            style={{
              // prose-invert for dark mode, prose-headings:text-foreground, etc. handled by Tailwind, but fallback for custom themes
              color: "hsl(var(--foreground) / 0.85)",
            }}
            dangerouslySetInnerHTML={{ __html: formatContent(post.content) }}
          />

          {/* Tags */}
          <div className="mt-12 pt-8 border-t border-border">
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag, i) => (
                <span
                  key={i}
                  className="px-3 py-1 bg-muted rounded-full text-sm"
                  style={{
                    background: "hsl(var(--muted))",
                    color: "hsl(var(--foreground) / 0.8)",
                  }}
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Share */}
          <div className="mt-8 flex items-center justify-between">
            <span
              className="text-sm text-muted-foreground"
              style={{ color: "hsl(var(--muted-foreground))" }}
            >
              Share this article
            </span>
            <div className="flex gap-3">
              <button
                className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors duration-300"
                style={{
                  background: "hsl(var(--muted))",
                  color: "hsl(var(--foreground))",
                }}
              >
                <Twitter className="w-4 h-4" />
              </button>
              <button
                className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors duration-300"
                style={{
                  background: "hsl(var(--muted))",
                  color: "hsl(var(--foreground))",
                }}
              >
                <Linkedin className="w-4 h-4" />
              </button>
              <button
                className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors duration-300"
                style={{
                  background: "hsl(var(--muted))",
                  color: "hsl(var(--foreground))",
                }}
              >
                <Facebook className="w-4 h-4" />
              </button>
              <button
                className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors duration-300"
                style={{
                  background: "hsl(var(--muted))",
                  color: "hsl(var(--foreground))",
                }}
              >
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </article>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-8 font-['Space_Grotesk']">
              Related Articles
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {relatedPosts.map((related) => (
                <Link
                  key={related.id}
                  to={`/blog/${related.id}`}
                  className="group flex gap-4 p-4 bg-card border border-border rounded-xl hover:border-primary/30 transition-all duration-300"
                >
                  <img
                    src={related.image}
                    alt={related.title}
                    className="w-24 h-24 object-cover rounded-lg flex-shrink-0"
                  />
                  <div>
                    <span className="text-xs text-primary font-medium">
                      {related.category}
                    </span>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {related.tags &&
                        related.tags.map((tag: string, i: number) => (
                          <span
                            key={i}
                            className="px-3 py-1 bg-muted rounded-full text-sm"
                            style={{
                              background: "hsl(var(--muted))",
                              color: "hsl(var(--foreground) / 0.8)",
                            }}
                          >
                            #{tag}
                          </span>
                        ))}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
