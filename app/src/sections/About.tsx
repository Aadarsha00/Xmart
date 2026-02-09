import { useEffect, useRef } from 'react';
import { Users, Target, Lightbulb, Award } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const values = [
  { icon: Users, label: 'Expertise', description: 'Years of industry experience' },
  { icon: Target, label: 'Customization', description: 'Tailored solutions for you' },
  { icon: Award, label: 'Reliability', description: '99.9% uptime guarantee' },
  { icon: Lightbulb, label: 'Innovation', description: 'Cutting-edge technologies' },
];

export function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const valuesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Image mask reveal animation
      gsap.fromTo(
        imageRef.current,
        { clipPath: 'circle(0% at 50% 50%)' },
        {
          clipPath: 'circle(100% at 50% 50%)',
          duration: 1.5,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: imageRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Content animation
      gsap.fromTo(
        contentRef.current?.children || [],
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: contentRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Values animation with highlight
      const valueItems = valuesRef.current?.querySelectorAll('.value-item');
      if (valueItems) {
        valueItems.forEach((item, i) => {
          gsap.fromTo(
            item,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              delay: i * 0.1,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: item,
                start: 'top 85%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="py-24 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-to-tl from-primary/5 to-transparent rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left - Image */}
          <div ref={imageRef} className="relative">
            <div className="relative rounded-2xl overflow-hidden">
              {/* Main Image */}
              <img
                src="/about-team.jpg"
                alt="XSmart Team"
                className="w-full h-auto object-cover"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
            </div>

            {/* Experience Badge */}
            <div className="absolute -bottom-6 -right-6 bg-card border border-border rounded-2xl p-6 shadow-xl">
              <div className="text-4xl font-bold text-primary font-['Oswald']">10+</div>
              <div className="text-sm text-muted-foreground">Years of Excellence</div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-4 -left-4 w-24 h-24 border-2 border-primary/20 rounded-xl -z-10" />
            <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-primary/10 rounded-lg -z-10" />
          </div>

          {/* Right - Content */}
          <div ref={contentRef}>
            <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              About Us
            </span>
            
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 font-['Oswald']">
              Who We <span className="text-gradient">Are</span>
            </h2>
            
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              We are a team of passionate IT experts dedicated to transforming businesses 
              through innovative technology solutions. With over a decade of experience, 
              we&apos;ve helped hundreds of companies achieve their digital goals.
            </p>
            
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Our mission is to make enterprise-level IT accessible to businesses of all sizes. 
              We believe that the right technology, implemented the right way, can be a 
              game-changer for any organization.
            </p>

            {/* Values Grid */}
            <div ref={valuesRef} className="grid grid-cols-2 gap-4">
              {values.map((value, index) => (
                <div
                  key={index}
                  className="value-item flex items-start gap-3 p-4 rounded-xl bg-muted/50 hover:bg-primary/5 transition-colors duration-300 group"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors duration-300">
                    <value.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold text-sm">{value.label}</div>
                    <div className="text-xs text-muted-foreground">{value.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
