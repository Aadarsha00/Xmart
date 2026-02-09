import { useEffect, useRef } from 'react';
import { Linkedin, Twitter, Mail } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const teamMembers = [
  {
    name: 'Jennifer Walsh',
    role: 'Chief Executive Officer',
    image: '/team-1.jpg',
    bio: 'Former VP at TechGiant with 15+ years in enterprise IT solutions.',
    social: {
      linkedin: '#',
      twitter: '#',
      email: 'jennifer@xsmart.io',
    },
  },
  {
    name: 'Alex Martinez',
    role: 'Chief Technology Officer',
    image: '/team-2.jpg',
    bio: 'Cloud architecture expert and open-source contributor.',
    social: {
      linkedin: '#',
      twitter: '#',
      email: 'alex@xsmart.io',
    },
  },
  {
    name: 'Robert Chen',
    role: 'Head of Security',
    image: '/team-3.jpg',
    bio: 'Cybersecurity veteran with experience at Fortune 500 companies.',
    social: {
      linkedin: '#',
      twitter: '#',
      email: 'robert@xsmart.io',
    },
  },
  {
    name: 'Sarah Johnson',
    role: 'VP of Operations',
    image: '/team-4.jpg',
    bio: 'Operations expert focused on delivering exceptional client experiences.',
    social: {
      linkedin: '#',
      twitter: '#',
      email: 'sarah@xsmart.io',
    },
  },
];

export function Team() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(
        '.team-header',
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

      // Cards animation with 3D effect
      const cards = cardsRef.current?.querySelectorAll('.team-card');
      if (cards) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 80, rotateX: 15 },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
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
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/10 to-background" />
      
      {/* Decorative elements */}
      <div className="absolute top-1/3 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/3 right-0 w-64 h-64 bg-blue-400/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="team-header text-center mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4 border border-primary/20">
            Our Team
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 font-['Oswald']">
            Meet the <span className="text-gradient">Experts</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our leadership team brings decades of combined experience in IT, 
            cybersecurity, and business transformation.
          </p>
        </div>

        {/* Team Grid */}
        <div ref={cardsRef} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="team-card group relative bg-card border border-border rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-3"
              style={{ perspective: '1000px' }}
            >
              {/* Image Container */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
                
                {/* Social Links - Appear on Hover */}
                <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                  <a
                    href={member.social.linkedin}
                    className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-foreground hover:bg-primary hover:text-white transition-colors duration-300 shadow-lg"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                  <a
                    href={member.social.twitter}
                    className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-foreground hover:bg-primary hover:text-white transition-colors duration-300 shadow-lg"
                  >
                    <Twitter className="w-4 h-4" />
                  </a>
                  <a
                    href={`mailto:${member.social.email}`}
                    className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-foreground hover:bg-primary hover:text-white transition-colors duration-300 shadow-lg"
                  >
                    <Mail className="w-4 h-4" />
                  </a>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-lg font-bold font-['Oswald'] group-hover:text-primary transition-colors duration-300">
                  {member.name}
                </h3>
                <p className="text-sm text-primary font-medium mb-2">{member.role}</p>
                <p className="text-sm text-muted-foreground">{member.bio}</p>
              </div>

              {/* Hover Border Effect */}
              <div className="absolute inset-0 rounded-2xl border-2 border-primary/0 group-hover:border-primary/30 transition-colors duration-500 pointer-events-none" />
            </div>
          ))}
        </div>

        {/* Join Team CTA */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-4 px-8 py-4 bg-primary/5 border border-primary/20 rounded-2xl">
            <div>
              <p className="font-medium">Want to join our team?</p>
              <p className="text-sm text-muted-foreground">We&apos;re always looking for talented individuals.</p>
            </div>
            <a
              href="#contact"
              className="px-6 py-2 bg-primary text-white rounded-full text-sm font-medium hover:bg-primary/90 transition-colors duration-300"
            >
              View Careers
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
