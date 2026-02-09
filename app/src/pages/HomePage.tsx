import { Hero } from '@/sections/Hero';
import { LogoStream } from '@/sections/LogoStream';
import { Features } from '@/sections/Features';
import { Statistics } from '@/sections/Statistics';
import { About } from '@/sections/About';
import { Services } from '@/sections/Services';
import { Testimonials } from '@/sections/Testimonials';
import { Pricing } from '@/sections/Pricing';
import { Team } from '@/sections/Team';
import { Blog } from '@/sections/Blog';
import { FAQ } from '@/sections/FAQ';
import { Contact } from '@/sections/Contact';

export function HomePage() {
  return (
    <>
      <Hero />
      <LogoStream />
      <Features />
      <Statistics />
      <About />
      <Services />
      <Testimonials />
      <Pricing />
      <Team />
      <Blog />
      <FAQ />
      <Contact />
    </>
  );
}
