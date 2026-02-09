import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { services } from '@/data/services';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function Services() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(
        titleRef.current?.children || [],
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Cards shuffle animation
      const cards = cardsRef.current?.querySelectorAll('.service-card');
      if (cards) {
        gsap.fromTo(
          cards,
          { opacity: 0, x: 100 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: cardsRef.current,
              start: 'top 75%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Show first 6 services on homepage
  const homepageServices = services.slice(0, 6);

  return (
    <section id="services" ref={sectionRef} className="py-24 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-blue-400/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div ref={titleRef} className="text-center mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4 border border-primary/20">
            Our Services
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 font-['Oswald']">
            Solutions We <span className="text-gradient">Provide</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From cloud infrastructure to AI-powered applications, we offer a comprehensive suite of 
            IT services tailored to your business needs.
          </p>
        </div>

        {/* Service Cards - Accordion Deck Style */}
        <div 
          ref={cardsRef} 
          className="flex flex-col lg:flex-row gap-4 lg:gap-2 lg:h-[500px]"
        >
          {homepageServices.map((service) => (
            <div
              key={service.id}
              className={`service-card relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 ease-out ${
                hoveredId === service.id 
                  ? 'lg:flex-[2] flex-auto' 
                  : hoveredId !== null 
                    ? 'lg:flex-[0.8] flex-auto' 
                    : 'lg:flex-1 flex-auto'
              }`}
              onMouseEnter={() => setHoveredId(service.id)}
              onMouseLeave={() => setHoveredId(null)}
              style={{ minHeight: '200px' }}
            >
              {/* Background Image */}
              <div className="absolute inset-0">
                <img
                  src={service.image}
                  alt={service.title}
                  className={`w-full h-full object-cover transition-transform duration-700 ${
                    hoveredId === service.id ? 'scale-110' : 'scale-100'
                  }`}
                />
                {/* Gradient Overlay */}
                <div className={`absolute inset-0 transition-opacity duration-500 ${
                  hoveredId === service.id 
                    ? 'bg-gradient-to-t from-black/90 via-black/60 to-black/30' 
                    : 'bg-gradient-to-t from-black/80 via-black/50 to-black/40'
                }`} />
              </div>

              {/* Content */}
              <div className="relative h-full p-6 lg:p-8 flex flex-col justify-end text-white">
                {/* Icon */}
                <div className={`w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-4 transition-all duration-500 ${
                  hoveredId === service.id ? 'bg-primary/80' : ''
                }`}>
                  <service.icon className="w-6 h-6" />
                </div>

                {/* Title - Always visible */}
                <h3 className="text-xl lg:text-2xl font-bold mb-2 font-['Oswald']">
                  {service.title}
                </h3>

                {/* Description - Visible on hover */}
                <div className={`overflow-hidden transition-all duration-500 ${
                  hoveredId === service.id ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}>
                  <p className="text-white/80 text-sm mb-4 leading-relaxed">
                    {service.shortDescription}
                  </p>

                  {/* Features */}
                  <ul className="space-y-2 mb-6">
                    {service.features.slice(0, 4).map((feature, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-white/70">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <Link
                    to={`/services/${service.id}`}
                    className="inline-flex items-center gap-2 text-primary font-medium group"
                  >
                    Learn More
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </div>

                {/* Collapsed indicator */}
                <div className={`flex items-center gap-2 mt-2 transition-opacity duration-300 ${
                  hoveredId === service.id ? 'opacity-0' : 'opacity-100'
                }`}>
                  <div className="w-8 h-0.5 bg-white/40" />
                  <span className="text-xs text-white/60">Hover to explore</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Services CTA */}
        <div className="mt-12 text-center">
          <Link
            to="/services"
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white rounded-full font-medium hover:bg-primary/90 transition-all duration-300 hover:shadow-lg hover:shadow-primary/30"
          >
            View All Services
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
