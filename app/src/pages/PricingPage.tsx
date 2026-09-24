import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  Check,
  X,
  Sparkles,
  Zap,
  Building2,
  ArrowRight,
  HelpCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const plans = [
  {
    name: "Starter",
    description: "Perfect for small businesses and startups",
    monthlyPrice: 99,
    yearlyPrice: 79,
    icon: Zap,
    features: [
      { text: "Up to 10 users", included: true },
      { text: "Basic cloud storage (100GB)", included: true },
      { text: "Email support", included: true },
      { text: "Basic security features", included: true },
      { text: "API access", included: false },
      { text: "Custom integrations", included: false },
      { text: "Dedicated account manager", included: false },
      { text: "24/7 phone support", included: false },
    ],
    cta: "Get Started",
    popular: false,
  },
  {
    name: "Professional",
    description: "For growing businesses with advanced needs",
    monthlyPrice: 299,
    yearlyPrice: 249,
    icon: Sparkles,
    features: [
      { text: "Up to 50 users", included: true },
      { text: "Advanced cloud storage (1TB)", included: true },
      { text: "Priority email & chat support", included: true },
      { text: "Advanced security suite", included: true },
      { text: "Full API access", included: true },
      { text: "Custom integrations", included: true },
      { text: "Dedicated account manager", included: false },
      { text: "24/7 phone support", included: false },
    ],
    cta: "Start Free Trial",
    popular: true,
  },
  {
    name: "Enterprise",
    description: "Tailored solutions for large organizations",
    monthlyPrice: null,
    yearlyPrice: null,
    icon: Building2,
    features: [
      { text: "Unlimited users", included: true },
      { text: "Unlimited cloud storage", included: true },
      { text: "24/7 premium support", included: true },
      { text: "Enterprise security & compliance", included: true },
      { text: "Full API & webhook access", included: true },
      { text: "Custom development", included: true },
      { text: "Dedicated account manager", included: true },
      { text: "SLA guarantee", included: true },
    ],
    cta: "Contact Sales",
    popular: false,
  },
];

const faqs = [
  {
    question: "Can I change my plan later?",
    answer:
      "Yes, you can upgrade or downgrade your plan at any time. Upgrades take effect immediately, while downgrades apply at the start of your next billing cycle.",
  },
  {
    question: "Is there a free trial?",
    answer:
      "Yes! All plans come with a 14-day free trial. No credit card required to start.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and bank transfers for Enterprise plans.",
  },
  {
    question: "Do you offer refunds?",
    answer:
      "We offer a 30-day money-back guarantee for all plans. If you're not satisfied, contact us for a full refund.",
  },
];

export function PricingPage() {
  const pageRef = useRef<HTMLDivElement>(null);
  const [isYearly, setIsYearly] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".pricing-content",
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

  return (
    <div ref={pageRef} className="pt-24 pb-24">
      {/* Header */}
      <div className="pricing-content max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="text-center">
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4 border border-primary/20">
            Pricing Plans
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 font-['Space_Grotesk']">
            Simple, Transparent <span className="text-gradient">Pricing</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
            Choose the perfect plan for your business. All plans include a
            14-day free trial with no credit card required.
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-4">
            <span
              className={`text-sm font-medium ${!isYearly ? "text-foreground" : "text-muted-foreground"}`}
            >
              Monthly
            </span>
            <Switch
              checked={isYearly}
              onCheckedChange={setIsYearly}
              className="data-[state=checked]:bg-primary"
            />
            <span
              className={`text-sm font-medium ${isYearly ? "text-foreground" : "text-muted-foreground"}`}
            >
              Yearly
            </span>
            {isYearly && (
              <span className="px-2 py-1 bg-green-500/10 text-green-500 text-xs font-medium rounded-full">
                Save 20%
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="pricing-content max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-card border rounded-2xl p-8 transition-all duration-500 hover:shadow-2xl ${
                plan.popular
                  ? "border-primary shadow-xl shadow-primary/10 scale-105 z-10"
                  : "border-border hover:border-primary/30 hover:-translate-y-2"
              }`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary text-white text-sm font-medium rounded-full">
                  Most Popular
                </div>
              )}

              {/* Plan Header */}
              <div className="mb-6">
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
                    plan.popular ? "bg-primary" : "bg-primary/10"
                  }`}
                >
                  <plan.icon
                    className={`w-6 h-6 ${plan.popular ? "text-white" : "text-primary"}`}
                  />
                </div>
                <h3 className="text-xl font-bold font-['Space_Grotesk']">
                  {plan.name}
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {plan.description}
                </p>
              </div>

              {/* Price */}
              <div className="mb-6">
                {plan.monthlyPrice ? (
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold font-['Space_Grotesk']">
                      ${isYearly ? plan.yearlyPrice : plan.monthlyPrice}
                    </span>
                    <span className="text-muted-foreground">/month</span>
                  </div>
                ) : (
                  <div className="text-2xl font-bold font-['Space_Grotesk']">
                    Custom
                  </div>
                )}
                {plan.monthlyPrice && isYearly && (
                  <p className="text-sm text-green-500 mt-1">
                    Save ${(plan.monthlyPrice - (plan.yearlyPrice || 0)) * 12}
                    /year
                  </p>
                )}
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    {feature.included ? (
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    ) : (
                      <X className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                    )}
                    <span
                      className={
                        feature.included
                          ? "text-sm"
                          : "text-sm text-muted-foreground"
                      }
                    >
                      {feature.text}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <Link to="/contact">
                <Button
                  className={`w-full rounded-xl py-6 font-medium transition-all duration-300 ${
                    plan.popular
                      ? "bg-primary hover:bg-primary/90 text-white hover:shadow-lg hover:shadow-primary/30"
                      : "bg-muted hover:bg-primary hover:text-white"
                  }`}
                >
                  {plan.cta}
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ Section */}
      <div className="pricing-content max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold font-['Space_Grotesk']">
            Frequently Asked Questions
          </h2>
        </div>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="bg-card border border-border rounded-xl p-6"
            >
              <div className="flex items-start gap-3">
                <HelpCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-medium mb-2">{faq.question}</h3>
                  <p className="text-sm text-muted-foreground">{faq.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="pricing-content max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative bg-gradient-to-r from-primary/10 via-primary/5 to-blue-400/10 border border-primary/20 rounded-3xl p-12 text-center overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-400/10 rounded-full blur-3xl" />
          <div className="relative z-10">
            <h2 className="text-3xl font-bold mb-4 font-['Space_Grotesk']">
              Need a Custom Solution?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Contact our sales team for a tailored enterprise solution that
              meets your specific requirements.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white rounded-full font-medium hover:bg-primary/90 transition-all duration-300 hover:shadow-lg hover:shadow-primary/30"
            >
              Contact Sales
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Trust Badges */}
      <div className="pricing-content max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 text-center">
        <p className="text-sm text-muted-foreground mb-4">
          Trusted by industry leaders worldwide
        </p>
        <div className="flex flex-wrap justify-center gap-8 opacity-50">
          {[
            "SOC 2 Certified",
            "GDPR Compliant",
            "ISO 27001",
            "HIPAA Ready",
          ].map((badge, i) => (
            <span key={i} className="text-sm font-medium">
              {badge}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
