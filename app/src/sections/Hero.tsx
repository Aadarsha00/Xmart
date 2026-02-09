import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Play, Sparkles, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import gsap from 'gsap';

export function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation - character decode effect with enhanced timing
      const titleChars = titleRef.current?.querySelectorAll('.char');
      if (titleChars) {
        gsap.fromTo(
          titleChars,
          { opacity: 0, y: 80, rotateX: -90, filter: 'blur(10px)' },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            filter: 'blur(0px)',
            duration: 1,
            stagger: 0.04,
            ease: 'power4.out',
            delay: 0.3,
          }
        );
      }

      // Subtitle animation with blur reveal
      gsap.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 40, filter: 'blur(8px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1, ease: 'power3.out', delay: 0.9 }
      );

      // CTA buttons animation with elastic effect
      gsap.fromTo(
        ctaRef.current?.children || [],
        { opacity: 0, y: 30, scale: 0.8 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'elastic.out(1, 0.5)',
          delay: 1.2,
        }
      );

      // Image animation - 3D perspective unfold with enhanced timing
      gsap.fromTo(
        imageRef.current,
        { opacity: 0, rotateY: 60, x: 150, scale: 0.7, filter: 'blur(20px)' },
        {
          opacity: 1,
          rotateY: 0,
          x: 0,
          scale: 1,
          filter: 'blur(0px)',
          duration: 1.8,
          ease: 'power4.out',
          delay: 0.5,
        }
      );

      // Floating animation for image
      gsap.to(imageRef.current, {
        y: -15,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      // Stats counter animation
      const statItems = statsRef.current?.querySelectorAll('.stat-item');
      if (statItems) {
        gsap.fromTo(
          statItems,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power3.out',
            delay: 1.5,
          }
        );
      }

      // Particles animation with varied movement
      const particles = particlesRef.current?.querySelectorAll('.particle');
      if (particles) {
        particles.forEach((particle, i) => {
          const duration = 15 + Math.random() * 10;
          const delay = i * 0.3;
          
          gsap.to(particle, {
            y: `random(-150, 150)`,
            x: `random(-150, 150)`,
            rotation: `random(-180, 180)`,
            duration: duration,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            delay: delay,
          });
          
          // Opacity pulse
          gsap.to(particle, {
            opacity: `random(0.3, 0.8)`,
            duration: 2 + Math.random() * 2,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            delay: delay,
          });
        });
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  // Enhanced mouse move effect for 3D tilt
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!imageRef.current) return;
      const rect = imageRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const rotateX = (e.clientY - centerY) / 30;
      const rotateY = (e.clientX - centerX) / 30;
      
      setMousePos({ x: e.clientX, y: e.clientY });
      
      gsap.to(imageRef.current, {
        rotateX: -rotateX,
        rotateY: rotateY,
        duration: 0.4,
        ease: 'power2.out',
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const titleText = 'IT solutions for your business.';

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative min-h-screen flex items-center overflow-hidden pt-20"
    >
      {/* Animated Background with Mouse-following Gradient */}
      <div 
        className="absolute inset-0 transition-all duration-700"
        style={{
          background: `radial-gradient(circle at ${mousePos.x}px ${mousePos.y}px, rgba(0, 117, 235, 0.08) 0%, transparent 50%),
                       linear-gradient(135deg, hsl(var(--background)) 0%, hsl(var(--background)) 50%, rgba(0, 117, 235, 0.03) 100%)`
        }}
      />
      
      {/* Animated mesh gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-blue-400/10 rounded-full blur-[80px] animate-pulse" style={{ animationDelay: '1.5s' }} />
        <div className="absolute top-1/2 left-1/2 w-[300px] h-[300px] bg-cyan-400/5 rounded-full blur-[60px] animate-pulse" style={{ animationDelay: '3s' }} />
      </div>

      {/* Grid Pattern Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05]"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 117, 235, 0.5) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(0, 117, 235, 0.5) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }}
      />

      {/* Floating Particles with varied sizes */}
      <div ref={particlesRef} className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="particle absolute rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${4 + Math.random() * 8}px`,
              height: `${4 + Math.random() * 8}px`,
              background: i % 3 === 0 
                ? 'linear-gradient(135deg, #0075eb, #00a8ff)' 
                : i % 3 === 1 
                  ? 'rgba(0, 117, 235, 0.4)' 
                  : 'rgba(0, 168, 255, 0.3)',
              boxShadow: i % 2 === 0 ? '0 0 10px rgba(0, 117, 235, 0.5)' : 'none',
            }}
          />
        ))}
      </div>

      {/* Animated Lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-10">
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0075eb" stopOpacity="0" />
            <stop offset="50%" stopColor="#0075eb" stopOpacity="1" />
            <stop offset="100%" stopColor="#0075eb" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[...Array(5)].map((_, i) => (
          <line
            key={i}
            x1="0"
            y1={`${20 + i * 15}%`}
            x2="100%"
            y2={`${20 + i * 15}%`}
            stroke="url(#lineGradient)"
            strokeWidth="1"
            className="animate-pulse"
            style={{ animationDelay: `${i * 0.5}s` }}
          />
        ))}
      </svg>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            {/* Badge with sparkle animation */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6 border border-primary/20 animate-pulse-glow">
              <Sparkles className="w-4 h-4 animate-bounce-subtle" />
              Next-Gen IT Solutions
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            </div>

            <h1
              ref={titleRef}
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-6 font-['Oswald']"
              style={{ perspective: '1000px' }}
            >
              {titleText.split('').map((char, i) => (
                <span
                  key={i}
                  className="char inline-block"
                  style={{ display: char === ' ' ? 'inline' : 'inline-block' }}
                >
                  {char === ' ' ? '\u00A0' : char}
                </span>
              ))}
            </h1>

            <p
              ref={subtitleRef}
              className="text-lg sm:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed"
            >
              We provide cutting-edge IT solutions that transform businesses. 
              From cloud infrastructure to cybersecurity, we&apos;ve got you covered with 
              <span className="text-primary font-medium"> 24/7 expert support</span>.
            </p>

            <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-white rounded-full px-8 py-6 text-lg font-medium transition-all duration-300 hover:shadow-2xl hover:shadow-primary/40 hover:-translate-y-1 group relative overflow-hidden"
                onClick={() => scrollToSection('#contact')}
              >
                <span className="relative z-10 flex items-center">
                  Get Started
                  <ArrowRight className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-primary to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-full px-8 py-6 text-lg font-medium border-2 transition-all duration-300 hover:bg-primary/5 group relative overflow-hidden"
                onClick={() => scrollToSection('#services')}
              >
                <Play className="mr-2 w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
                Explore Services
              </Button>
            </div>

            {/* Enhanced Stats */}
            <div ref={statsRef} className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-border/50">
              {[
                { value: '500+', label: 'Happy Clients', suffix: '' },
                { value: '99.9', label: 'Uptime SLA', suffix: '%' },
                { value: '24/7', label: 'Expert Support', suffix: '' },
              ].map((stat, i) => (
                <div key={i} className="stat-item text-center lg:text-left group">
                  <div className="text-2xl sm:text-3xl font-bold text-gradient font-['Oswald'] group-hover:scale-110 transition-transform duration-300 inline-block">
                    {stat.value}<span className="text-lg">{stat.suffix}</span>
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content - Dashboard Image with enhanced effects */}
          <div
            ref={imageRef}
            className="relative lg:pl-8"
            style={{ perspective: '1500px', transformStyle: 'preserve-3d' }}
          >
            <div className="relative">
              {/* Multi-layer glow effect */}
              <div className="absolute -inset-8 bg-gradient-to-r from-primary/20 via-blue-400/20 to-cyan-400/20 rounded-3xl blur-3xl opacity-60 animate-pulse" />
              <div className="absolute -inset-4 bg-gradient-to-br from-primary/30 to-blue-500/30 rounded-2xl blur-2xl opacity-40" />
              
              {/* Main Image Container */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-border/50 group">
                <img
                  src="/hero-dashboard.jpg"
                  alt="XSmart Dashboard"
                  className="w-full h-auto transition-transform duration-700 group-hover:scale-105"
                />
                
                {/* Shimmer overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/30 to-transparent pointer-events-none" />
              </div>

              {/* Floating Status Badge */}
              <div className="absolute -bottom-6 -left-6 bg-card/90 backdrop-blur-xl border border-border rounded-2xl p-4 shadow-2xl animate-float">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center">
                    <div className="w-4 h-4 rounded-full bg-green-500 animate-pulse" />
                  </div>
                  <div>
                    <div className="text-sm font-medium">System Status</div>
                    <div className="text-xs text-green-500 font-medium">All Systems Operational</div>
                  </div>
                </div>
              </div>

              {/* Floating Stats Card */}
              <div className="absolute -top-4 -right-4 bg-card/90 backdrop-blur-xl border border-border rounded-2xl p-4 shadow-2xl animate-float" style={{ animationDelay: '1.5s' }}>
                <div className="text-3xl font-bold text-gradient font-['Oswald']">+127%</div>
                <div className="text-xs text-muted-foreground">Efficiency Boost</div>
              </div>

              {/* Additional floating element */}
              <div className="absolute top-1/2 -right-8 bg-primary text-white rounded-xl p-3 shadow-xl animate-float" style={{ animationDelay: '0.8s' }}>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
                  <span className="text-xs font-medium">Live Monitoring</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-2 text-muted-foreground">
          <span className="text-xs uppercase tracking-widest">Scroll to explore</span>
          <ChevronDown className="w-5 h-5 animate-bounce" />
        </div>
      </div>
    </section>
  );
}
