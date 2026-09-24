import { useEffect, useRef } from 'react';
import { Cloud, Shield, Puzzle, ArrowUpRight, Sparkles } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    icon: Cloud,
    title: 'Scalable Infrastructure',
    description: 'Cloud-native solutions that grow with your business. Scale resources up or down instantly based on demand with our intelligent auto-scaling technology.',
    color: 'from-blue-500 to-cyan-400',
    stats: { label: 'Uptime', value: '99.9%' },
  },
  {
    icon: Puzzle,
    title: 'Seamless Integration',
    description: 'Connect your existing tools and systems effortlessly. Our solutions work with your current tech stack, ensuring zero disruption to your workflows.',
    color: 'from-purple-500 to-pink-400',
    stats: { label: 'Integrations', value: '500+' },
  },
  {
    icon: Shield,
    title: 'Advanced Security',
    description: 'Enterprise-grade security with 24/7 monitoring, threat detection, and compliance management. Your data is protected by military-grade encryption.',
    color: 'from-green-500 to-emerald-400',
    stats: { label: 'Threats Blocked', value: '10M+' },
  },
];

export function Features() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation with character reveal
      gsap.fromTo(
        titleRef.current?.querySelectorAll('.reveal-char') || [],
        { opacity: 0, y: 50, rotateX: -90 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 0.8,
          stagger: 0.02,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Subtitle and description
      gsap.fromTo(
        titleRef.current?.querySelectorAll('.reveal-text') || [],
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Cards animation with 3D tilt effect
      const cards = cardsRef.current?.querySelectorAll('.feature-card');
      if (cards) {
        cards.forEach((card, index) => {
          // Entrance animation
          gsap.fromTo(
            card,
            { opacity: 0, y: 100, rotateX: 20 },
            {
              opacity: 1,
              y: 0,
              rotateX: 0,
              duration: 1,
              delay: index * 0.15,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: cardsRef.current,
                start: 'top 75%',
                toggleActions: 'play none none reverse',
              },
            }
          );

          // Continuous floating animation
          gsap.to(card, {
            y: index % 2 === 0 ? -8 : 8,
            duration: 3 + index * 0.5,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            delay: index * 0.3,
          });
        });
      }
    }, sectionRef);

    // 3D tilt effect on mouse move
    const cards = cardsRef.current?.querySelectorAll('.feature-card');
    cards?.forEach((card) => {
      card.addEventListener('mousemove', (e: Event) => {
        const mouseEvent = e as MouseEvent;
        const rect = (card as HTMLElement).getBoundingClientRect();
        const x = mouseEvent.clientX - rect.left;
        const y = mouseEvent.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;

        gsap.to(card, {
          rotateX: rotateX,
          rotateY: rotateY,
          duration: 0.3,
          ease: 'power2.out',
        });
      });

      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          rotateX: 0,
          rotateY: 0,
          duration: 0.5,
          ease: 'power2.out',
        });
      });
    });

    return () => ctx.revert();
  }, []);

  const titleText = 'Powerful IT solutions for your business';

  return (
    <section ref={sectionRef} className="py-24 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2" />
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-blue-400/5 rounded-full blur-3xl" />
      
      {/* Grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 117, 235, 0.5) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(0, 117, 235, 0.5) 1px, transparent 1px)`,
          backgroundSize: '80px 80px'
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div ref={titleRef} className="text-center mb-16">
          <span className="reveal-text inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4 border border-primary/20">
            <Sparkles className="w-4 h-4" />
            Why Choose Us
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 font-['Space_Grotesk']" style={{ perspective: '1000px' }}>
            {titleText.split('').map((char, i) => (
              <span
                key={i}
                className="reveal-char inline-block"
                style={{ display: char === ' ' ? 'inline' : 'inline-block' }}
              >
                {char === ' ' ? '\u00A0' : char}
              </span>
            ))}
          </h2>
          <p className="reveal-text text-lg text-muted-foreground max-w-2xl mx-auto">
            We deliver comprehensive IT services designed to accelerate your digital transformation 
            and drive business growth with cutting-edge technology.
          </p>
        </div>

        {/* Feature Cards - Broken Grid Layout with 3D Effect */}
        <div 
          ref={cardsRef} 
          className="grid md:grid-cols-3 gap-6 lg:gap-8"
          style={{ perspective: '1000px' }}
        >
          {features.map((feature, index) => (
            <div
              key={index}
              className={`feature-card group relative bg-card/80 backdrop-blur-sm border border-border rounded-2xl p-8 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10 hover:border-primary/30 ${
                index === 1 ? 'md:-translate-y-8' : ''
              }`}
              style={{ 
                transformStyle: 'preserve-3d',
                transform: `translateZ(${index === 1 ? '20px' : '0px'})`,
              }}
            >
              {/* Spotlight effect */}
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
              
              {/* Glow effect */}
              <div className={`absolute -inset-1 rounded-2xl bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500 -z-10`} />
              
              {/* Icon with animation */}
              <div className={`relative w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg`}>
                <feature.icon className="w-8 h-8 text-white" />
                {/* Icon glow */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${feature.color} blur-lg opacity-50 group-hover:opacity-80 transition-opacity duration-500`} />
              </div>

              {/* Stats badge */}
              <div className="absolute top-6 right-6 px-3 py-1 bg-muted rounded-full text-xs font-medium">
                <span className="text-primary">{feature.stats.value}</span>
                <span className="text-muted-foreground ml-1">{feature.stats.label}</span>
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors duration-300 font-['Space_Grotesk']">
                {feature.title}
              </h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                {feature.description}
              </p>

              {/* Link with arrow animation */}
              <a
                href="#services"
                className="inline-flex items-center text-primary font-medium group/link"
              >
                Learn more
                <ArrowUpRight className="ml-1 w-4 h-4 transition-all duration-300 group-hover/link:translate-x-1 group-hover/link:-translate-y-1 group-hover/link:rotate-45" />
              </a>

              {/* Border glow on hover */}
              <div className="absolute inset-0 rounded-2xl border-2 border-primary/0 group-hover:border-primary/30 transition-colors duration-500 pointer-events-none" />
              
              {/* Corner decoration */}
              <div className="absolute bottom-0 right-0 w-24 h-24 overflow-hidden rounded-br-2xl pointer-events-none">
                <div className={`absolute bottom-0 right-0 w-full h-full bg-gradient-to-tl ${feature.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <p className="text-muted-foreground mb-4">
            Want to see all our features in action?
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-full font-medium hover:bg-primary/90 transition-all duration-300 hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-1"
          >
            Schedule a Demo
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
