import { useEffect, useRef, useState } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const contactInfo = [
  { icon: Mail, label: "Email", value: "info@xmart-point.com" },
  { icon: Phone, label: "Phone", value: "+1 6827166824" },
  { icon: MapPin, label: "Location", value: "Arlington, Texas" },
];

export function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

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
          ease: "power3.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        },
      );

      // Form animation
      gsap.fromTo(
        formRef.current,
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: formRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        },
      );

      // Info animation
      gsap.fromTo(
        infoRef.current?.children || [],
        { opacity: 0, x: 50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: infoRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setIsSubmitted(true);

    // Reset after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
    }, 3000);
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative overflow-hidden py-24  sm:py-28"
    >
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          ref={titleRef}
          className="grid gap-6 border-b border-white/10 pb-10 sm:pb-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-end"
        >
          <div>
            <span className="inline-flex items-center border-l border-[#FAAF3E]/70 pl-3 font-['Space_Grotesk'] text-[0.68rem] tracking-[0.14em] text-[#FAAF3E] uppercase">
              Contact
            </span>
            <h2 className="mt-4 font-['Space_Grotesk'] text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
              Let&apos;s talk about what your business needs next.
            </h2>
          </div>
          <p className="text-sm leading-relaxed text-white/62 sm:text-base lg:max-w-md lg:justify-self-end lg:text-right">
            Share your goals, current bottlenecks, or project scope and
            we&apos;ll come back with a practical path forward.
          </p>
        </div>

        <div className="mt-12 grid gap-9 lg:grid-cols-5 lg:gap-14">
          <div className="mb-8 sm:mb-10 lg:col-span-3 lg:mb-0">
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="space-y-7 lg:pr-4"
            >
              <div className="grid gap-7 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label
                    htmlFor="name"
                    className="text-[0.72rem] tracking-[0.12em] text-white/62 uppercase"
                  >
                    Your Name
                  </Label>
                  <Input
                    id="name"
                    placeholder="John Doe"
                    required
                    className="h-12 rounded-none border-0 border-b-2 border-white/20 bg-transparent px-1 pb-2 text-white placeholder:text-white/35 outline-none transition-colors duration-300 hover:border-white/38 focus:border-[#FAAF3E] focus-visible:border-[#FAAF3E] focus:outline-none focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="email"
                    className="text-[0.72rem] tracking-[0.12em] text-white/62 uppercase"
                  >
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    required
                    className="h-12 rounded-none border-0 border-b-2 border-white/20 bg-transparent px-1 pb-2 text-white placeholder:text-white/35 outline-none transition-colors duration-300 hover:border-white/38 focus:border-[#FAAF3E] focus-visible:border-[#FAAF3E] focus:outline-none focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="subject"
                  className="text-[0.72rem] tracking-[0.12em] text-white/62 uppercase"
                >
                  Subject
                </Label>
                <Input
                  id="subject"
                  placeholder="How can we help?"
                  required
                  className="h-12 rounded-none border-0 border-b-2 border-white/20 bg-transparent px-1 pb-2 text-white placeholder:text-white/35 outline-none transition-colors duration-300 hover:border-white/38 focus:border-[#FAAF3E] focus-visible:border-[#FAAF3E] focus:outline-none focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="message"
                  className="text-[0.72rem] tracking-[0.12em] text-white/62 uppercase"
                >
                  Message
                </Label>
                <Textarea
                  id="message"
                  placeholder="Tell us about your project..."
                  required
                  rows={5}
                  className="resize-none rounded-none border-0 border-b-2 border-white/20 bg-transparent px-1 pt-2 pb-2 text-white placeholder:text-white/35 outline-none transition-colors duration-300 hover:border-white/38 focus:border-[#FAAF3E] focus-visible:border-[#FAAF3E] focus:outline-none focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting || isSubmitted}
                className={`h-12 min-w-44 rounded-full px-6 font-['Space_Grotesk'] text-sm tracking-[0.08em] uppercase transition-colors duration-300 ${
                  isSubmitted
                    ? "bg-green-500 text-black hover:bg-green-500"
                    : "bg-[#FAAF3E] text-black hover:bg-[#ffbf62]"
                } focus:outline-none focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0`}
              >
                {isSubmitting ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : isSubmitted ? (
                  <>
                    <CheckCircle className="mr-2 h-5 w-5" />
                    Message Sent
                  </>
                ) : (
                  <>
                    Send Message
                    <Send className="ml-2 h-5 w-5" />
                  </>
                )}
              </Button>
            </form>
          </div>

          <div
            ref={infoRef}
            className="space-y-7 lg:col-span-2 lg:border-l lg:border-white/10 lg:pl-10"
          >
            <div className="space-y-0 border-y border-white/10">
              {contactInfo.map((info) => (
                <div
                  key={info.label}
                  className="flex items-start gap-4 border-b border-white/10 py-6 last:border-b-0"
                >
                  <div className="mt-0.5 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border border-white/20 text-[#FAAF3E]">
                    <info.icon className="h-4.5 w-4.5" />
                  </div>
                  <div>
                    <p className="text-[0.68rem] tracking-[0.14em] text-white/55 uppercase">
                      {info.label}
                    </p>
                    <p className="mt-1 text-sm text-white/86 sm:text-base">
                      {info.value}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-white/10 pt-5">
              <h4 className="font-['Space_Grotesk'] text-xs tracking-[0.14em] text-[#FAAF3E] uppercase">
                Working Hours
              </h4>
              <div className="mt-3 space-y-2 text-sm">
                <div className="flex items-center justify-between border-b border-white/10 pb-2">
                  <span className="text-white/58">Monday - Friday</span>
                  <span className="text-white/86">9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex items-center justify-between border-b border-white/10 pb-2">
                  <span className="text-white/58">Saturday</span>
                  <span className="text-white/86">10:00 AM - 4:00 PM</span>
                </div>
                <div className="flex items-center justify-between pb-1">
                  <span className="text-white/58">Sunday</span>
                  <span className="text-white/86">Closed</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
