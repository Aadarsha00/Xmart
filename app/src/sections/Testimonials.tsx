import { useEffect, useRef, useState } from 'react';
import { Quote, ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    id: 1,
    name: 'Sarah Mitchell',
    role: 'CTO',
    company: 'TechVentures Inc.',
    image: '/team-1.jpg',
    content: 'XSmart transformed our entire IT infrastructure. Their cloud migration service was seamless, and we\'ve seen a 40% reduction in operational costs. The 24/7 support team is incredibly responsive.',
    rating: 5,
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'IT Director',
    company: 'Global Finance Corp',
    image: '/team-3.jpg',
    content: 'The cybersecurity solutions provided by XSmart have given us peace of mind. Their proactive threat monitoring and rapid incident response have protected us from multiple attacks.',
    rating: 5,
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    role: 'CEO',
    company: 'StartupXYZ',
    image: '/team-4.jpg',
    content: 'As a growing startup, we needed scalable IT solutions. XSmart delivered beyond our expectations. Their team understood our needs and provided cost-effective solutions that scale with us.',
    rating: 5,
  },
  {
    id: 4,
    name: 'David Thompson',
    role: 'Operations Manager',
    company: 'Manufacturing Pro',
    image: '/team-2.jpg',
    content: 'The network solutions implemented by XSmart have revolutionized our operations. Downtime is virtually eliminated, and our team can focus on what matters most - growing the business.',
    rating: 5,
  },
];

export function Testimonials() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.testimonial-header',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(
        '.testimonial-container',
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.testimonial-container',
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const navigate = (direction: 'prev' | 'next') => {
    if (isAnimating) return;
    setIsAnimating(true);

    const newIndex = direction === 'next' 
      ? (currentIndex + 1) % testimonials.length
      : (currentIndex - 1 + testimonials.length) % testimonials.length;

    // Animate out
    gsap.to(cardRef.current, {
      opacity: 0,
      x: direction === 'next' ? -50 : 50,
      duration: 0.3,
      ease: 'power2.in',
      onComplete: () => {
        setCurrentIndex(newIndex);
        // Animate in
        gsap.fromTo(
          cardRef.current,
          { opacity: 0, x: direction === 'next' ? 50 : -50 },
          {
            opacity: 1,
            x: 0,
            duration: 0.4,
            ease: 'power2.out',
            onComplete: () => setIsAnimating(false),
          }
        );
      },
    });
  };

  // Auto-advance carousel
  useEffect(() => {
    const interval = setInterval(() => {
      navigate('next');
    }, 6000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section ref={sectionRef} className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-muted/30 via-background to-muted/30" />
      
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 text-primary/5">
        <Quote className="w-40 h-40" />
      </div>
      <div className="absolute bottom-20 right-10 text-primary/5 rotate-180">
        <Quote className="w-40 h-40" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="testimonial-header text-center mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4 border border-primary/20">
            Testimonials
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 font-['Oswald']">
            What Our <span className="text-gradient">Clients Say</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Don&apos;t just take our word for it. Here&apos;s what industry leaders have to say about 
            working with XSmart.
          </p>
        </div>

        {/* Testimonial Card */}
        <div className="testimonial-container relative">
          <div
            ref={cardRef}
            className="relative bg-card/90 backdrop-blur-xl border border-border rounded-3xl p-8 md:p-12 shadow-2xl"
          >
            {/* Quote Icon */}
            <div className="absolute -top-6 left-8 w-12 h-12 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/30">
              <Quote className="w-6 h-6 text-white" />
            </div>

            <div className="grid md:grid-cols-[200px,1fr] gap-8 items-center">
              {/* Author Image & Info */}
              <div className="text-center md:text-left">
                <div className="relative inline-block mb-4">
                  <div className="w-24 h-24 md:w-32 md:h-32 rounded-2xl overflow-hidden border-4 border-primary/20 shadow-xl">
                    <img
                      src={currentTestimonial.image}
                      alt={currentTestimonial.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {/* Rating Badge */}
                  <div className="absolute -bottom-2 -right-2 bg-card border border-border rounded-full px-3 py-1 flex items-center gap-1 shadow-lg">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{currentTestimonial.rating}.0</span>
                  </div>
                </div>
                <h4 className="text-lg font-bold font-['Oswald']">{currentTestimonial.name}</h4>
                <p className="text-sm text-primary font-medium">{currentTestimonial.role}</p>
                <p className="text-sm text-muted-foreground">{currentTestimonial.company}</p>
              </div>

              {/* Quote Content */}
              <div>
                <blockquote className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-6">
                  &ldquo;{currentTestimonial.content}&rdquo;
                </blockquote>
                
                {/* Rating Stars */}
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < currentTestimonial.rating
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-muted'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <Button
              variant="outline"
              size="icon"
              onClick={() => navigate('prev')}
              disabled={isAnimating}
              className="rounded-full w-12 h-12 border-2 hover:bg-primary hover:text-white hover:border-primary transition-all duration-300"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>

            {/* Dots Indicator */}
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    if (!isAnimating && index !== currentIndex) {
                      setIsAnimating(true);
                      gsap.to(cardRef.current, {
                        opacity: 0,
                        scale: 0.95,
                        duration: 0.2,
                        onComplete: () => {
                          setCurrentIndex(index);
                          gsap.to(cardRef.current, {
                            opacity: 1,
                            scale: 1,
                            duration: 0.3,
                            onComplete: () => setIsAnimating(false),
                          });
                        },
                      });
                    }
                  }}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? 'bg-primary w-8'
                      : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                  }`}
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={() => navigate('next')}
              disabled={isAnimating}
              className="rounded-full w-12 h-12 border-2 hover:bg-primary hover:text-white hover:border-primary transition-all duration-300"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
