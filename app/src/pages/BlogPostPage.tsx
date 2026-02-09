import { useEffect, useRef } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, Share2, Twitter, Linkedin, Facebook } from 'lucide-react';
import { getBlogPostById, getRelatedPosts } from '@/data/blog';
import gsap from 'gsap';

export function BlogPostPage() {
  const { postId } = useParams<{ postId: string }>();
  const post = getBlogPostById(postId || '');
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!post) return;
    
    window.scrollTo(0, 0);
    
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.post-content',
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
      );
    }, pageRef);

    return () => ctx.revert();
  }, [post]);

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  const relatedPosts = getRelatedPosts(post.id);

  // Convert markdown-like content to HTML
  const formatContent = (content: string) => {
    return content
      .split('\n\n')
      .map((paragraph) => {
        if (paragraph.startsWith('# ')) {
          return `<h1 class="text-4xl font-bold mb-6 font-['Oswald']">${paragraph.replace('# ', '')}</h1>`;
        }
        if (paragraph.startsWith('## ')) {
          return `<h2 class="text-2xl font-bold mt-10 mb-4 font-['Oswald']">${paragraph.replace('## ', '')}</h2>`;
        }
        if (paragraph.startsWith('### ')) {
          return `<h3 class="text-xl font-bold mt-8 mb-3 font-['Oswald']">${paragraph.replace('### ', '')}</h3>`;
        }
        if (paragraph.startsWith('- ')) {
          const items = paragraph.split('\n').map(line => line.replace('- ', ''));
          return `<ul class="list-disc list-inside space-y-2 mb-6 text-muted-foreground">${items.map(item => `<li>${item}</li>`).join('')}</ul>`;
        }
        if (paragraph.startsWith('1. ')) {
          const items = paragraph.split('\n').map(line => line.replace(/^\d+\. /, ''));
          return `<ol class="list-decimal list-inside space-y-2 mb-6 text-muted-foreground">${items.map(item => `<li>${item}</li>`).join('')}</ol>`;
        }
        if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
          return `<p class="font-bold mb-4">${paragraph.replace(/\*\*/g, '')}</p>`;
        }
        return `<p class="text-muted-foreground leading-relaxed mb-6">${paragraph}</p>`;
      })
      .join('');
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
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
      </div>

      {/* Content */}
      <div className="post-content max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-32 relative z-10">
        {/* Back Link */}
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors duration-300 mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Blog
        </Link>

        {/* Article Card */}
        <article className="bg-card border border-border rounded-3xl p-8 md:p-12 shadow-xl">
          {/* Category */}
          <span className="inline-block px-4 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full mb-6">
            {post.category}
          </span>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-bold mb-6 font-['Oswald']">
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
                <p className="font-medium">{post.author.name}</p>
                <p className="text-sm text-muted-foreground">{post.author.role}</p>
              </div>
            </div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {new Date(post.date).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
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
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: formatContent(post.content) }}
          />

          {/* Tags */}
          <div className="mt-12 pt-8 border-t border-border">
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag, i) => (
                <span
                  key={i}
                  className="px-3 py-1 bg-muted rounded-full text-sm"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Share */}
          <div className="mt-8 flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Share this article</span>
            <div className="flex gap-3">
              <button className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-white transition-colors duration-300">
                <Twitter className="w-4 h-4" />
              </button>
              <button className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-white transition-colors duration-300">
                <Linkedin className="w-4 h-4" />
              </button>
              <button className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-white transition-colors duration-300">
                <Facebook className="w-4 h-4" />
              </button>
              <button className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-white transition-colors duration-300">
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </article>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-8 font-['Oswald']">Related Articles</h2>
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
                    <span className="text-xs text-primary font-medium">{related.category}</span>
                    <h3 className="font-bold mt-1 group-hover:text-primary transition-colors duration-300 line-clamp-2">
                      {related.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                      {related.excerpt}
                    </p>
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
