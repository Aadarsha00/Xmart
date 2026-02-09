import { useEffect, useRef, useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const faqs = [
  {
    question: 'What services does XSmart offer?',
    answer: 'XSmart provides comprehensive IT solutions including cloud services, cybersecurity, IT consulting, and network solutions. We help businesses of all sizes transform their technology infrastructure and achieve their digital goals.',
  },
  {
    question: 'How long does a typical project take?',
    answer: 'Project timelines vary based on scope and complexity. A simple cloud migration might take 2-4 weeks, while enterprise-wide transformations can take 3-6 months. We provide detailed timelines during our initial consultation.',
  },
  {
    question: 'Do you offer 24/7 support?',
    answer: 'Yes! All our clients have access to 24/7 technical support. Our Professional and Enterprise plans include priority support with faster response times and dedicated account managers.',
  },
  {
    question: 'Is my data secure with XSmart?',
    answer: 'Absolutely. Security is our top priority. We implement enterprise-grade encryption, regular security audits, and comply with industry standards including SOC 2, GDPR, and ISO 27001. Our cybersecurity team monitors threats 24/7.',
  },
  {
    question: 'Can I upgrade or downgrade my plan?',
    answer: 'Yes, you can change your plan at any time. Upgrades take effect immediately, while downgrades apply at the start of your next billing cycle. We prorate any differences to ensure fair billing.',
  },
  {
    question: 'Do you offer custom solutions?',
    answer: 'Yes! Our Enterprise plan includes custom development and integrations. We work closely with your team to understand your unique requirements and build tailored solutions that fit your business perfectly.',
  },
  {
    question: 'What is your SLA guarantee?',
    answer: 'We offer a 99.9% uptime SLA for all our services. Enterprise clients receive enhanced SLAs with guaranteed response times and service credits for any downtime beyond our commitments.',
  },
  {
    question: 'How do I get started?',
    answer: 'Getting started is easy! Simply contact us through our website or call our sales team. We offer a free consultation to understand your needs and recommend the best solutions for your business.',
  },
];

export function FAQ() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(
        '.faq-header',
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

      // FAQ items animation
      gsap.fromTo(
        '.faq-item',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.faq-container',
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const toggleFAQ = (index: number) => {
    const content = contentRefs.current[index];
    if (!content) return;

    if (openIndex === index) {
      // Close
      gsap.to(content, {
        height: 0,
        opacity: 0,
        duration: 0.3,
        ease: 'power2.inOut',
        onComplete: () => setOpenIndex(null),
      });
    } else {
      // Close previous
      if (openIndex !== null && contentRefs.current[openIndex]) {
        gsap.to(contentRefs.current[openIndex], {
          height: 0,
          opacity: 0,
          duration: 0.3,
          ease: 'power2.inOut',
        });
      }
      
      // Open new
      setOpenIndex(index);
      gsap.set(content, { height: 'auto', opacity: 1 });
      const height = content.offsetHeight;
      gsap.fromTo(
        content,
        { height: 0, opacity: 0 },
        { height, opacity: 1, duration: 0.3, ease: 'power2.out' }
      );
    }
  };

  return (
    <section ref={sectionRef} className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-muted/20 via-background to-muted/20" />
      
      {/* Decorative elements */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="faq-header text-center mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4 border border-primary/20">
            FAQ
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 font-['Oswald']">
            Frequently Asked <span className="text-gradient">Questions</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Got questions? We&apos;ve got answers. If you don&apos;t find what you&apos;re looking for, 
            feel free to contact us.
          </p>
        </div>

        {/* FAQ List */}
        <div className="faq-container space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="faq-item bg-card border border-border rounded-xl overflow-hidden transition-all duration-300 hover:border-primary/30 hover:shadow-lg"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between p-6 text-left group"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors duration-300 ${
                    openIndex === index ? 'bg-primary text-white' : 'bg-primary/10 text-primary group-hover:bg-primary/20'
                  }`}>
                    <HelpCircle className="w-5 h-5" />
                  </div>
                  <span className={`font-medium transition-colors duration-300 ${
                    openIndex === index ? 'text-primary' : ''
                  }`}>
                    {faq.question}
                  </span>
                </div>
                <ChevronDown
                  className={`w-5 h-5 text-muted-foreground transition-transform duration-300 ${
                    openIndex === index ? 'rotate-180 text-primary' : ''
                  }`}
                />
              </button>
              
              <div
                ref={(el) => { contentRefs.current[index] = el; }}
                className="overflow-hidden"
                style={{ height: index === 0 ? 'auto' : 0, opacity: index === 0 ? 1 : 0 }}
              >
                <div className="px-6 pb-6 pl-20">
                  <p className="text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="mt-12 text-center">
          <p className="text-muted-foreground mb-4">Still have questions?</p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-full font-medium hover:bg-primary/90 transition-colors duration-300 hover:shadow-lg hover:shadow-primary/30"
          >
            Contact Our Team
          </a>
        </div>
      </div>
    </section>
  );
}
