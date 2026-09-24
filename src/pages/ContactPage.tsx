import React, { useEffect, useRef, useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle,
  Loader2,
  Clock,
  Globe,
} from "lucide-react";
import { FAQ } from "@/sections/FAQ";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { API_ENDPOINTS } from "@/config/api";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const contactInfo = [
  { icon: Mail, label: "Email", value: "info@xmart-point.com" },
  { icon: Phone, label: "Phone", value: "+1 6827166824" },
  { icon: MapPin, label: "Location", value: "Arlington, Texas" },
];

export function ContactPage() {
  const pageRef = useRef<HTMLDivElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".contact-content",
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: pageRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        },
      );
    }, pageRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError("");

    try {
      const response = await fetch(API_ENDPOINTS.contact, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setIsSubmitted(true);
        setFormData({ name: "", email: "", subject: "", message: "" });
        setTimeout(() => setIsSubmitted(false), 5000);
      } else {
        setSubmitError(
          data.error || "Failed to send message. Please try again.",
        );
      }
    } catch (error) {
      setSubmitError(
        "Network error. Please check your connection and try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData((prev: typeof formData) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div ref={pageRef} className="pt-24 pb-24">
      {/* Hero Section */}
      <section className="contact-content max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="mb-10">
          <span
            className="inline-flex items-center border-l-4 pl-4 font-['Space_Grotesk'] text-[0.68rem] tracking-[0.14em] uppercase mb-4"
            style={{
              color: "hsl(var(--primary))",
              borderLeft: "4px solid hsl(var(--primary) / 0.8)",
            }}
          >
            Contact Us
          </span>
          <h1
            className="font-['Space_Grotesk'] text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-7"
            style={{ color: "hsl(var(--foreground))" }}
          >
            Let&apos;s Start a{" "}
            <span style={{ color: "hsl(var(--primary))" }}>Conversation</span>
          </h1>
          <p
            className="text-base mb-5 leading-relaxed max-w-2xl"
            style={{ color: "hsl(var(--foreground) / 0.7)" }}
          >
            Have a project in mind or want to learn more about our services?
            We&apos;d love to hear from you. Reach out and we&apos;ll get back
            to you within 24 hours.
          </p>
        </div>
      </section>

      {/* Content - Editorial, Minimal */}
      <section className="contact-content max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-5 gap-16">
          {/* Contact Form */}
          <div className="lg:col-span-3">
            <form
              onSubmit={handleSubmit}
              className="border-b border-border p-0 bg-card/80 glass-effect shadow-none rounded-none"
            >
              {submitError && (
                <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-sm">
                  {submitError}
                </div>
              )}

              <div className="grid sm:grid-cols-2 gap-8 mb-6">
                <div className="space-y-2">
                  <Label
                    htmlFor="name"
                    className="text-sm font-medium text-foreground"
                  >
                    Your Name *
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    required
                    className={`h-12 rounded-xl border-2 bg-transparent text-foreground transition-all duration-300 focus:outline-none ${
                      focusedField === "name"
                        ? "border-primary shadow-lg shadow-primary/10"
                        : "border-border hover:border-primary/60"
                    }`}
                    onFocus={() => setFocusedField("name")}
                    onBlur={() => setFocusedField(null)}
                  />
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="email"
                    className="text-sm font-medium text-foreground"
                  >
                    Email Address *
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    required
                    className={`h-12 rounded-xl border-2 bg-transparent text-foreground transition-all duration-300 focus:outline-none ${
                      focusedField === "email"
                        ? "border-primary shadow-lg shadow-primary/10"
                        : "border-border hover:border-primary/60"
                    }`}
                    onFocus={() => setFocusedField("email")}
                    onBlur={() => setFocusedField(null)}
                  />
                </div>
              </div>

              <div className="space-y-2 mb-6">
                <Label
                  htmlFor="subject"
                  className="text-sm font-medium text-foreground"
                >
                  Subject *
                </Label>
                <Input
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="How can we help?"
                  required
                  className={`h-12 rounded-xl border-2 bg-transparent text-foreground transition-all duration-300 focus:outline-none ${
                    focusedField === "subject"
                      ? "border-primary shadow-lg shadow-primary/10"
                      : "border-border hover:border-primary/60"
                  }`}
                  onFocus={() => setFocusedField("subject")}
                  onBlur={() => setFocusedField(null)}
                />
              </div>

              <div className="space-y-2 mb-8">
                <Label
                  htmlFor="message"
                  className="text-sm font-medium text-foreground"
                >
                  Message *
                </Label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us about your project..."
                  required
                  rows={6}
                  className={`rounded-xl border-2 bg-transparent text-foreground transition-all duration-300 resize-none focus:outline-none ${
                    focusedField === "message"
                      ? "border-primary shadow-lg shadow-primary/10"
                      : "border-border hover:border-primary/60"
                  }`}
                  onFocus={() => setFocusedField("message")}
                  onBlur={() => setFocusedField(null)}
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting || isSubmitted}
                className={`w-full h-14 text-lg font-medium uppercase tracking-wider transition-all duration-500 focus:outline-none border-b-2 border-primary rounded-none bg-transparent text-primary hover:bg-primary/10 ${
                  isSubmitted
                    ? "bg-green-500 hover:bg-green-500 text-white border-green-500"
                    : ""
                }`}
              >
                {isSubmitting ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : isSubmitted ? (
                  <>
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Message Sent Successfully!
                  </>
                ) : (
                  <>
                    Send Message
                    <Send className="w-5 h-5 ml-2" />
                  </>
                )}
              </Button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-2 space-y-8">
            {contactInfo.map((info, index) => (
              <div
                key={index}
                className="flex items-start gap-4 py-3 border-b border-border group bg-card/80 glass-effect"
              >
                <div className="w-10 h-10 flex items-center justify-center flex-shrink-0">
                  <info.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="text-xs text-muted-foreground mb-1">
                    {info.label}
                  </div>
                  <div
                    className="font-medium text-foreground"
                    style={{ color: "hsl(var(--foreground) / 0.9)" }}
                  >
                    {info.value}
                  </div>
                </div>
              </div>
            ))}

            {/* Working Hours */}
            <div className="py-4 border-b border-primary/30 bg-card/80 glass-effect">
              <div className="flex items-center gap-3 mb-4">
                <Clock className="w-5 h-5 text-primary" />
                <h3 className="font-bold font-['Space_Grotesk'] text-foreground">
                  Working Hours
                </h3>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Monday - Friday</span>
                  <span className="text-foreground">
                    9:00 AM - 6:00 PM (PST)
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Saturday</span>
                  <span className="text-foreground">
                    10:00 AM - 4:00 PM (PST)
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Sunday</span>
                  <span className="text-foreground">Closed</span>
                </div>
              </div>
            </div>

            {/* Global Offices */}
            <div className="py-4 border-b border-border bg-card/80 glass-effect">
              <div className="flex items-center gap-3 mb-4">
                <Globe className="w-5 h-5 text-primary" />
                <h3 className="font-bold font-['Space_Grotesk'] text-foreground">
                  Global Offices
                </h3>
              </div>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="font-medium text-foreground">
                    San Francisco (HQ)
                  </p>
                  <p className="text-muted-foreground">
                    123 Tech Street, CA 94105
                  </p>
                </div>
                <div>
                  <p className="font-medium text-foreground">New York</p>
                  <p className="text-muted-foreground">
                    456 Innovation Ave, NY 10001
                  </p>
                </div>
                <div>
                  <p className="font-medium text-foreground">London</p>
                  <p className="text-muted-foreground">
                    789 Digital Lane, EC2A 4DP
                  </p>
                </div>
              </div>
            </div>
          </div>
          <style>{`
                .glass-effect {
                  background: linear-gradient(120deg, hsl(var(--background) / 0.82) 80%, hsl(var(--primary) / 0.04));
                  backdrop-filter: blur(8px);
                }
              `}</style>
        </div>
      </section>
      {/* FAQ Section moved from HomePage */}
      <div className="mt-24">
        <FAQ />
      </div>
    </div>
  );
}
