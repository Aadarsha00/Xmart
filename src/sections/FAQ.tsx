import { useEffect, useRef } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

gsap.registerPlugin(ScrollTrigger);

const faqs = [
  {
    question: "What services does Xmart offer?",
    answer:
      "Xmart provides comprehensive IT solutions including cloud services, cybersecurity, IT consulting, and network solutions. We help businesses of all sizes transform their technology infrastructure and achieve their digital goals.",
  },
  {
    question: "How long does a typical project take?",
    answer:
      "Project timelines vary based on scope and complexity. A simple cloud migration might take 2-4 weeks, while enterprise-wide transformations can take 3-6 months. We provide detailed timelines during our initial consultation.",
  },
  {
    question: "Do you offer 24/7 support?",
    answer:
      "Yes. All our clients have access to 24/7 technical support. Professional and Enterprise plans include priority support with faster response times and dedicated account managers.",
  },
  {
    question: "Is my data secure with Xmart?",
    answer:
      "Absolutely. Security is our top priority. We implement enterprise-grade encryption, regular security audits, and compliance practices aligned with SOC 2, GDPR, and ISO 27001.",
  },
  {
    question: "Can I upgrade or downgrade my plan?",
    answer:
      "Yes, you can change your plan at any time. Upgrades take effect immediately, while downgrades apply at the start of your next billing cycle.",
  },
  {
    question: "Do you offer custom solutions?",
    answer:
      "Yes. Our Enterprise plan includes custom development and integrations. We work with your team to create tailored solutions for your specific business needs.",
  },
  {
    question: "What is your SLA guarantee?",
    answer:
      "We offer a 99.9% uptime SLA for all core services. Enterprise clients receive enhanced SLAs with guaranteed response times and service credits.",
  },
  {
    question: "How do I get started?",
    answer:
      "Getting started is simple. Contact us through the website or book a call with our team, and we will provide a free consultation with clear next steps.",
  },
];

export function FAQ() {
  const sectionRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".faq-intro > *",
        { opacity: 0, y: 26 },
        {
          opacity: 1,
          y: 0,
          duration: 0.72,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 82%",
            toggleActions: "play none none reverse",
          },
        },
      );

      const rows = listRef.current?.querySelectorAll(".faq-row");
      if (rows) {
        gsap.fromTo(
          rows,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.62,
            stagger: 0.07,
            ease: "power3.out",
            scrollTrigger: {
              trigger: listRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          },
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden py-20 sm:py-24"
    >
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-14">
          <div className="faq-intro lg:sticky lg:top-28">
            <p className="font-['Space_Grotesk'] text-xs font-medium tracking-[0.16em] text-white/55 uppercase">
              FAQ
            </p>
            <h2 className="mt-3 font-['Space_Grotesk'] text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Frequently Asked Questions
            </h2>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-white/62 sm:text-base">
              Clear answers to common questions about our process, support,
              pricing flexibility, and delivery timelines.
            </p>
          </div>

          <div ref={listRef}>
            <Accordion
              type="single"
              collapsible
              defaultValue="item-0"
              className="border-t border-white/14"
            >
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={faq.question}
                  value={`item-${index}`}
                  className="faq-row border-white/14"
                >
                  <AccordionTrigger className="py-5 hover:no-underline sm:py-6">
                    <div className="flex items-start gap-4 pr-6 text-left">
                      <span className="mt-0.5 font-['Space_Grotesk'] text-xs tracking-[0.14em] text-white/42">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="font-['Space_Grotesk'] text-[1.05rem] font-medium leading-snug text-white/88 sm:text-[1.14rem]">
                        {faq.question}
                      </span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pb-5 pl-9 pr-8 text-sm leading-relaxed text-white/62 sm:pb-6 sm:text-[0.98rem]">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
}
