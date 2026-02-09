import { useEffect, useRef, useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle, Loader2, Clock, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { API_ENDPOINTS } from '@/config/api';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const contactInfo = [
  { icon: Mail, label: 'Email', value: 'hello@xsmart.io' },
  { icon: Phone, label: 'Phone', value: '+1 (555) 123-4567' },
  { icon: MapPin, label: 'Location', value: 'San Francisco, CA' },
];

export function ContactPage() {
  const pageRef = useRef<HTMLDivElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.contact-content',
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');

    try {
      const response = await fetch(API_ENDPOINTS.contact, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setIsSubmitted(true);
        setFormData({ name: '', email: '', subject: '', message: '' });
        setTimeout(() => setIsSubmitted(false), 5000);
      } else {
        setSubmitError(data.error || 'Failed to send message. Please try again.');
      }
    } catch (error) {
      setSubmitError('Network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div ref={pageRef} className="pt-24 pb-24">
      {/* Header */}
      <div className="contact-content max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="text-center">
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4 border border-primary/20">
            Contact Us
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 font-['Oswald']">
            Let&apos;s Start a <span className="text-gradient">Conversation</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Have a project in mind or want to learn more about our services? 
            We&apos;d love to hear from you. Reach out and we&apos;ll get back to you within 24 hours.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="contact-content max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Contact Form */}
          <div className="lg:col-span-3">
            <form 
              onSubmit={handleSubmit}
              className="bg-card border border-border rounded-2xl p-8 shadow-xl"
            >
              {submitError && (
                <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-sm">
                  {submitError}
                </div>
              )}

              <div className="grid sm:grid-cols-2 gap-6 mb-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-medium">
                    Your Name *
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    required
                    className={`h-12 rounded-xl border-2 transition-all duration-300 ${
                      focusedField === 'name' 
                        ? 'border-primary shadow-lg shadow-primary/10' 
                        : 'border-border hover:border-primary/50'
                    }`}
                    onFocus={() => setFocusedField('name')}
                    onBlur={() => setFocusedField(null)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium">
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
                    className={`h-12 rounded-xl border-2 transition-all duration-300 ${
                      focusedField === 'email' 
                        ? 'border-primary shadow-lg shadow-primary/10' 
                        : 'border-border hover:border-primary/50'
                    }`}
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField(null)}
                  />
                </div>
              </div>

              <div className="space-y-2 mb-6">
                <Label htmlFor="subject" className="text-sm font-medium">
                  Subject *
                </Label>
                <Input
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="How can we help?"
                  required
                  className={`h-12 rounded-xl border-2 transition-all duration-300 ${
                    focusedField === 'subject' 
                      ? 'border-primary shadow-lg shadow-primary/10' 
                      : 'border-border hover:border-primary/50'
                  }`}
                  onFocus={() => setFocusedField('subject')}
                  onBlur={() => setFocusedField(null)}
                />
              </div>

              <div className="space-y-2 mb-8">
                <Label htmlFor="message" className="text-sm font-medium">
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
                  className={`rounded-xl border-2 transition-all duration-300 resize-none ${
                    focusedField === 'message' 
                      ? 'border-primary shadow-lg shadow-primary/10' 
                      : 'border-border hover:border-primary/50'
                  }`}
                  onFocus={() => setFocusedField('message')}
                  onBlur={() => setFocusedField(null)}
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting || isSubmitted}
                className={`w-full h-14 rounded-xl text-lg font-medium transition-all duration-500 ${
                  isSubmitted 
                    ? 'bg-green-500 hover:bg-green-500' 
                    : 'bg-primary hover:bg-primary/90'
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
          <div className="lg:col-span-2 space-y-6">
            {contactInfo.map((info, index) => (
              <div
                key={index}
                className="flex items-start gap-4 p-6 bg-card border border-border rounded-2xl hover:border-primary/30 transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors duration-300">
                  <info.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground mb-1">{info.label}</div>
                  <div className="font-medium">{info.value}</div>
                </div>
              </div>
            ))}

            {/* Working Hours */}
            <div className="p-6 bg-gradient-to-br from-primary/10 to-blue-400/10 border border-primary/20 rounded-2xl">
              <div className="flex items-center gap-3 mb-4">
                <Clock className="w-5 h-5 text-primary" />
                <h3 className="font-bold font-['Oswald']">Working Hours</h3>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Monday - Friday</span>
                  <span>9:00 AM - 6:00 PM (PST)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Saturday</span>
                  <span>10:00 AM - 4:00 PM (PST)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Sunday</span>
                  <span>Closed</span>
                </div>
              </div>
            </div>

            {/* Global Offices */}
            <div className="p-6 bg-card border border-border rounded-2xl">
              <div className="flex items-center gap-3 mb-4">
                <Globe className="w-5 h-5 text-primary" />
                <h3 className="font-bold font-['Oswald']">Global Offices</h3>
              </div>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="font-medium">San Francisco (HQ)</p>
                  <p className="text-muted-foreground">123 Tech Street, CA 94105</p>
                </div>
                <div>
                  <p className="font-medium">New York</p>
                  <p className="text-muted-foreground">456 Innovation Ave, NY 10001</p>
                </div>
                <div>
                  <p className="font-medium">London</p>
                  <p className="text-muted-foreground">789 Digital Lane, EC2A 4DP</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
