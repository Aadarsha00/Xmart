import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { CustomCursor } from "@/components/custom/CustomCursor";
import { Navigation } from "@/components/custom/Navigation";
import { Footer } from "@/sections/Footer";

// Pages
import { HomePage } from "@/pages/HomePage";
import { ServicesPage } from "@/pages/ServicesPage";
import { ServiceDetailPage } from "@/pages/ServiceDetailPage";
import { BlogPage } from "@/pages/BlogPage";
import { BlogPostPage } from "@/pages/BlogPostPage";
import { AboutPage } from "@/pages/AboutPage";
import { ContactPage } from "@/pages/ContactPage";
import { PricingPage } from "@/pages/PricingPage";
import { PrivacyPolicyPage } from "@/pages/PrivacyPolicyPage";
import { TermsPage } from "@/pages/TermsPage";

import "./App.css";
import { ThemeProvider } from "./components/theme-provider";

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="xmartpoint-theme">
      <Router>
        <div className="min-h-screen bg-background text-foreground transition-colors duration-300 relative">
          {/* Gradient overlay for dark mode visual interest, but not as the main bg */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-0"
            style={{
              background:
                "radial-gradient(52% 46% at 84% 2%,rgba(124,58,237,0.13)_0%,transparent_70%),radial-gradient(44% 38% at 10% 92%,rgba(124,58,237,0.08)_0%,transparent_72%),linear-gradient(180deg,#050507_0%,#07060a_100%)",
              opacity: "var(--gradient-overlay-opacity, 1)",
            }}
          />
          <div className="relative z-10">
            <CustomCursor />
            <Navigation />
            <main>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/services" element={<ServicesPage />} />
                <Route
                  path="/services/:serviceId"
                  element={<ServiceDetailPage />}
                />
                <Route path="/blog" element={<BlogPage />} />
                <Route path="/blog/:postId" element={<BlogPostPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/pricing" element={<PricingPage />} />
                <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
                <Route path="/terms" element={<TermsPage />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
