import { useEffect, useRef } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Check, DollarSign } from 'lucide-react';
import { getServiceById, services } from '@/data/services';
import { Button } from '@/components/ui/button';
import gsap from 'gsap';

export function ServiceDetailPage() {
  const { serviceId } = useParams<{ serviceId: string }>();
  const service = getServiceById(serviceId || '');
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!service) return;
    
    window.scrollTo(0, 0);
    
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.service-detail-content',
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
      );
    }, pageRef);

    return () => ctx.revert();
  }, [service]);

  if (!service) {
    return <Navigate to="/services" replace />;
  }

  // Get related services (excluding current)
  const relatedServices = services
    .filter(s => s.id !== service.id)
    .slice(0, 3);

  return (
    <div ref={pageRef} className="pt-24 pb-24">
      {/* Hero Section */}
      <div className="relative h-[400px] overflow-hidden">
        <img
          src={service.image}
          alt={service.title}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
        
        <div className="absolute bottom-0 left-0 right-0">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors duration-300 mb-4"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Services
            </Link>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center shadow-lg">
                <service.icon className="w-8 h-8 text-white" />
              </div>
              <span className="px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full">
                {service.id.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold font-['Space_Grotesk']">
              {service.title}
            </h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="service-detail-content max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            {/* Description */}
            <section>
              <h2 className="text-2xl font-bold mb-4 font-['Space_Grotesk']">Overview</h2>
              <p className="text-muted-foreground leading-relaxed text-lg">
                {service.fullDescription}
              </p>
            </section>

            {/* Features */}
            <section>
              <h2 className="text-2xl font-bold mb-6 font-['Space_Grotesk']">Key Features</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {service.features.map((feature, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 p-4 bg-muted/50 rounded-xl"
                  >
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Benefits */}
            <section>
              <h2 className="text-2xl font-bold mb-6 font-['Space_Grotesk']">Benefits</h2>
              <ul className="space-y-4">
                {service.benefits.map((benefit, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Check className="w-4 h-4 text-primary" />
                    </div>
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Technologies */}
            <section>
              <h2 className="text-2xl font-bold mb-6 font-['Space_Grotesk']">Technologies We Use</h2>
              <div className="flex flex-wrap gap-3">
                {service.technologies.map((tech, i) => (
                  <span
                    key={i}
                    className="px-4 py-2 bg-muted rounded-full text-sm font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </section>

            {/* Use Cases */}
            <section>
              <h2 className="text-2xl font-bold mb-6 font-['Space_Grotesk']">Success Stories</h2>
              <div className="grid sm:grid-cols-3 gap-6">
                {service.useCases.map((useCase, i) => (
                  <div
                    key={i}
                    className="p-6 bg-card border border-border rounded-xl hover:border-primary/30 transition-colors duration-300"
                  >
                    <h3 className="font-bold mb-2">{useCase.title}</h3>
                    <p className="text-sm text-muted-foreground">{useCase.description}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Pricing Card */}
              <div className="bg-card border border-border rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <DollarSign className="w-5 h-5 text-primary" />
                  <h3 className="font-bold font-['Space_Grotesk']">Pricing</h3>
                </div>
                <div className="space-y-4">
                  <div className="p-4 bg-muted/50 rounded-xl">
                    <span className="text-sm text-muted-foreground">Starter</span>
                    <p className="font-medium">{service.pricing.starter}</p>
                  </div>
                  <div className="p-4 bg-primary/10 rounded-xl border border-primary/20">
                    <span className="text-sm text-primary">Professional</span>
                    <p className="font-medium">{service.pricing.professional}</p>
                  </div>
                  <div className="p-4 bg-muted/50 rounded-xl">
                    <span className="text-sm text-muted-foreground">Enterprise</span>
                    <p className="font-medium">{service.pricing.enterprise}</p>
                  </div>
                </div>
                <Link to="/contact">
                  <Button className="w-full mt-6 bg-primary hover:bg-primary/90 text-white rounded-xl">
                    Get a Quote
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>

              {/* Related Services */}
              <div className="bg-card border border-border rounded-2xl p-6">
                <h3 className="font-bold mb-4 font-['Space_Grotesk']">Related Services</h3>
                <div className="space-y-3">
                  {relatedServices.map((related) => (
                    <Link
                      key={related.id}
                      to={`/services/${related.id}`}
                      className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted transition-colors duration-300 group"
                    >
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        <related.icon className="w-5 h-5 text-primary" />
                      </div>
                      <span className="text-sm font-medium group-hover:text-primary transition-colors">
                        {related.title}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
