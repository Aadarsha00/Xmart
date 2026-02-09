import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Target, Lightbulb, Users, Award } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const values = [
  {
    icon: Target,
    title: 'Excellence',
    description: 'We strive for excellence in every project, delivering solutions that exceed expectations.',
  },
  {
    icon: Lightbulb,
    title: 'Innovation',
    description: 'We embrace cutting-edge technologies and innovative approaches to solve complex challenges.',
  },
  {
    icon: Users,
    title: 'Collaboration',
    description: 'We work closely with our clients as true partners, understanding their unique needs.',
  },
  {
    icon: Award,
    title: 'Integrity',
    description: 'We operate with transparency and honesty, building trust through every interaction.',
  },
];

const milestones = [
  { year: '2015', title: 'Company Founded', description: 'XSmart was established with a vision to transform IT services.' },
  { year: '2017', title: 'First Enterprise Client', description: 'Partnered with Fortune 500 company for digital transformation.' },
  { year: '2019', title: 'Global Expansion', description: 'Opened offices in Europe and Asia to serve international clients.' },
  { year: '2021', title: 'AI Division Launch', description: 'Established dedicated AI and machine learning practice.' },
  { year: '2023', title: '500+ Clients', description: 'Reached milestone of serving 500+ clients worldwide.' },
  { year: '2026', title: 'Industry Leader', description: 'Recognized as a leading IT solutions provider globally.' },
];

export function AboutPage() {
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.about-section',
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: pageRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={pageRef} className="pt-24 pb-24">
      {/* Hero Section */}
      <section className="about-section max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4 border border-primary/20">
              About Us
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 font-['Oswald']">
              Building the <span className="text-gradient">Future</span> of IT
            </h1>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              XSmart is a leading technology solutions provider dedicated to helping businesses 
              navigate the digital landscape. With over a decade of experience, we&apos;ve helped 
              hundreds of organizations transform their IT infrastructure and achieve their goals.
            </p>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Our team of experts brings together deep technical knowledge with business acumen 
              to deliver solutions that drive real results. From startups to Fortune 500 companies, 
              we partner with organizations of all sizes to solve their most complex technology challenges.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-white rounded-full font-medium hover:bg-primary/90 transition-all duration-300 hover:shadow-lg hover:shadow-primary/30"
              >
                Work With Us
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/services"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-card border border-border text-foreground rounded-full font-medium hover:bg-muted transition-all duration-300"
              >
                Our Services
              </Link>
            </div>
          </div>
          <div className="relative">
            <img
              src="/about-team.jpg"
              alt="XSmart Team"
              className="rounded-2xl shadow-2xl"
            />
            <div className="absolute -bottom-6 -left-6 bg-card border border-border rounded-2xl p-6 shadow-xl">
              <div className="text-4xl font-bold text-gradient font-['Oswald']">10+</div>
              <div className="text-sm text-muted-foreground">Years of Excellence</div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="about-section bg-muted/30 py-24 mb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: '500+', label: 'Clients Worldwide' },
              { value: '150+', label: 'Team Members' },
              { value: '50+', label: 'Countries Served' },
              { value: '99.9%', label: 'Client Satisfaction' },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-4xl font-bold text-gradient font-['Oswald']">{stat.value}</div>
                <div className="text-muted-foreground mt-2">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="about-section max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4 border border-primary/20">
            Our Values
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-['Oswald']">
            What We <span className="text-gradient">Stand For</span>
          </h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, i) => (
            <div
              key={i}
              className="group p-8 bg-card border border-border rounded-2xl hover:border-primary/30 transition-all duration-300 hover:shadow-xl"
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                <value.icon className="w-7 h-7 text-primary group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="text-xl font-bold mb-3 font-['Oswald']">{value.title}</h3>
              <p className="text-muted-foreground text-sm">{value.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Timeline Section */}
      <section className="about-section max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4 border border-primary/20">
            Our Journey
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-['Oswald']">
            Milestones That <span className="text-gradient">Define Us</span>
          </h2>
        </div>
        <div className="relative">
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-border" />
          <div className="space-y-12">
            {milestones.map((milestone, i) => (
              <div
                key={i}
                className={`relative flex items-center ${
                  i % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                }`}
              >
                <div className={`w-1/2 ${i % 2 === 0 ? 'pr-12 text-right' : 'pl-12'}`}>
                  <div className="bg-card border border-border rounded-2xl p-6 hover:border-primary/30 transition-colors duration-300">
                    <span className="text-primary font-bold">{milestone.year}</span>
                    <h3 className="text-lg font-bold mt-2 font-['Oswald']">{milestone.title}</h3>
                    <p className="text-muted-foreground text-sm mt-2">{milestone.description}</p>
                  </div>
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-primary rounded-full border-4 border-background" />
                <div className="w-1/2" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="about-section max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative bg-gradient-to-r from-primary/10 via-primary/5 to-blue-400/10 border border-primary/20 rounded-3xl p-12 text-center overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-400/10 rounded-full blur-3xl" />
          
          <div className="relative z-10">
            <h2 className="text-3xl font-bold mb-4 font-['Oswald']">
              Ready to Transform Your Business?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Let&apos;s discuss how XSmart can help you achieve your technology goals. 
              Our team is ready to partner with you on your digital transformation journey.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white rounded-full font-medium hover:bg-primary/90 transition-all duration-300 hover:shadow-lg hover:shadow-primary/30"
            >
              Start a Conversation
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
