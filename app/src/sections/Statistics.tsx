import { useEffect, useRef, useState } from 'react';
import { TrendingUp, Users, Globe, Award, Zap, Clock } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { 
    icon: Users, 
    value: 500, 
    suffix: '+', 
    label: 'Happy Clients',
    description: 'Trusted by businesses worldwide'
  },
  { 
    icon: TrendingUp, 
    value: 98, 
    suffix: '%', 
    label: 'Success Rate',
    description: 'Project completion rate'
  },
  { 
    icon: Globe, 
    value: 50, 
    suffix: '+', 
    label: 'Countries Served',
    description: 'Global reach and support'
  },
  { 
    icon: Award, 
    value: 25, 
    suffix: '+', 
    label: 'Industry Awards',
    description: 'Recognition for excellence'
  },
  { 
    icon: Zap, 
    value: 99.9, 
    suffix: '%', 
    label: 'Uptime Guarantee',
    description: 'Reliable infrastructure'
  },
  { 
    icon: Clock, 
    value: 24, 
    suffix: '/7', 
    label: 'Expert Support',
    description: 'Round-the-clock assistance'
  },
];

function AnimatedCounter({ value, suffix, isVisible }: { value: number; suffix: string; isVisible: boolean }) {
  const [count, setCount] = useState(0);
  const countRef = useRef({ value: 0 });

  useEffect(() => {
    if (!isVisible) return;

    const duration = 2;
    const startTime = Date.now();
    const endValue = value;

    const animate = () => {
      const elapsed = (Date.now() - startTime) / 1000;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentValue = easeOutQuart * endValue;
      
      countRef.current.value = currentValue;
      setCount(currentValue);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(endValue);
      }
    };

    requestAnimationFrame(animate);
  }, [value, isVisible]);

  const displayValue = value % 1 !== 0 
    ? count.toFixed(1) 
    : Math.floor(count).toString();

  return (
    <span>
      {displayValue}{suffix}
    </span>
  );
}

export function Statistics() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section reveal animation
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 70%',
        onEnter: () => setIsVisible(true),
      });

      // Cards staggered animation
      const cards = cardsRef.current?.querySelectorAll('.stat-card');
      if (cards) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 60, scale: 0.9 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: cardsRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 relative overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img 
          src="/stats-bg.jpg" 
          alt="" 
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
      </div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-blue-400/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4 border border-primary/20">
            Our Impact
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 font-['Oswald']">
            Numbers That <span className="text-gradient">Speak</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our track record of success demonstrates our commitment to delivering 
            exceptional results for every client.
          </p>
        </div>

        {/* Stats Grid */}
        <div ref={cardsRef} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="stat-card group relative bg-card/80 backdrop-blur-sm border border-border rounded-2xl p-8 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-2 hover:border-primary/30"
            >
              {/* Spotlight effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Icon */}
              <div className="relative w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-blue-500 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg shadow-primary/20">
                <stat.icon className="w-7 h-7 text-white" />
              </div>

              {/* Value */}
              <div className="relative text-4xl sm:text-5xl font-bold text-gradient mb-2 font-['Oswald'] group-hover:scale-105 transition-transform duration-300 origin-left">
                <AnimatedCounter 
                  value={stat.value} 
                  suffix={stat.suffix} 
                  isVisible={isVisible} 
                />
              </div>

              {/* Label */}
              <div className="relative text-lg font-semibold mb-1 group-hover:text-primary transition-colors duration-300">
                {stat.label}
              </div>

              {/* Description */}
              <div className="relative text-sm text-muted-foreground">
                {stat.description}
              </div>

              {/* Decorative corner */}
              <div className="absolute top-0 right-0 w-20 h-20 overflow-hidden rounded-tr-2xl">
                <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
