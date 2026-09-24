import { AppWindow, Brush, Code2, Megaphone, ShieldCheck } from "lucide-react";

export interface Service {
  id: string;
  icon: React.ElementType;
  title: string;
  shortDescription: string;
  fullDescription: string;
  image: string;
  features: string[];
  benefits: string[];
  technologies: string[];
  useCases: { title: string; description: string }[];
  pricing: { starter: string; professional: string; enterprise: string };
}

const contactPricing = { starter: "Contact us", professional: "Contact us", enterprise: "Contact us" };
const serviceImages: Record<string, string> = {
  "web-design": "/service-software.jpg",
  "web-development": "/service-cloud.jpg",
  "ui-ux-design": "/service-consulting.jpg",
  "app-development": "/service-mobile.jpg",
  "web-security": "/service-security.jpg",
  "digital-marketing": "/service-data.jpg",
};
const makeService = (id: string, icon: React.ElementType, title: string, shortDescription: string, fullDescription: string, features: string[], benefits: string[], technologies: string[]): Service => ({
  id, icon, title, shortDescription, fullDescription, image: serviceImages[id] ?? "", features, benefits, technologies,
  useCases: [{ title, description: shortDescription }], pricing: contactPricing,
});

export const services: Service[] = [
  makeService("web-design", Brush, "Web Design", "Professional website design focused on clear communication, strong visual direction, and memorable digital experiences.", "We design polished websites that communicate your brand clearly and give visitors a simple, engaging path through your business.", ["Responsive layouts", "Visual direction", "Brand-aligned interfaces"], ["Clearer communication", "Stronger first impressions", "Better user experience"], ["Responsive design", "Modern UI patterns", "Accessibility"]),
  makeService("web-development", Code2, "Web Development Service", "Secure, scalable, high-performance web applications and websites built around your business requirements.", "We engineer scalable web applications and digital solutions designed for performance, security, and measurable business growth.", ["Custom websites", "Web applications", "Performance optimization", "Secure architecture"], ["Scalable foundations", "Fast user experiences", "Reliable delivery"], ["Modern web stack", "APIs", "Cloud deployment"]),
  makeService("ui-ux-design", AppWindow, "UI/UX Design", "Intuitive interfaces and user journeys that make digital products easier and more enjoyable to use.", "We create intuitive user interfaces and user experiences that connect business goals with the needs of real users.", ["User flows", "Wireframes and prototypes", "Interface systems"], ["Simpler journeys", "More consistent products", "Improved usability"], ["Prototyping", "Design systems", "Responsive UI"]),
  makeService("app-development", AppWindow, "App Development", "Mobile and platform applications designed for smooth performance across the devices your customers use.", "We build mobile platforms and application experiences with a focus on quality, usability, and dependable performance.", ["Mobile applications", "Cross-platform experiences", "App integrations"], ["Reach users on mobile", "Consistent performance", "Flexible product foundations"], ["iOS", "Android", "Cross-platform development"]),
  makeService("web-security", ShieldCheck, "Web Security", "Security-focused engineering and ongoing protection for websites, applications, and digital operations.", "We help keep digital products secure, resilient, and available through security-minded development and maintenance.", ["Security hardening", "Vulnerability review", "Secure maintenance"], ["Reduced exposure", "More resilient systems", "Greater customer confidence"], ["Security reviews", "Monitoring", "Secure deployment"]),
  makeService("digital-marketing", Megaphone, "Digital Marketing", "Digital growth services that connect your business with the right audience and measurable opportunities.", "We support digital growth through search visibility, social media, and practical marketing programs built around your goals.", ["SEO services", "Social media marketing", "Growth strategy"], ["Greater discoverability", "Qualified traffic", "Measurable growth"], ["SEO", "Social media", "Analytics"]),
];

export const getServiceById = (id: string): Service | undefined => services.find((service) => service.id === id);
