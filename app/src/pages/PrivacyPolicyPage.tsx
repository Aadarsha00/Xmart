import { useEffect } from "react";
import { Link } from "react-router-dom";

export function PrivacyPolicyPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-24 pb-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4 border border-primary/20">
            Legal
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold mb-6 font-['Space_Grotesk']">
            Privacy Policy
          </h1>
          <p className="text-muted-foreground">
            Last updated: February 1, 2026
          </p>
        </div>

        {/* Content */}
        <div className="prose prose-lg max-w-none">
          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4 font-['Space_Grotesk']">
              1. Introduction
            </h2>
            <p className="text-muted-foreground mb-4">
              Xmart (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is
              committed to protecting your privacy. This Privacy Policy explains
              how we collect, use, disclose, and safeguard your information when
              you visit our website or use our services.
            </p>
            <p className="text-muted-foreground">
              By accessing or using our services, you agree to the collection
              and use of information in accordance with this Privacy Policy.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4 font-['Space_Grotesk']">
              2. Information We Collect
            </h2>
            <h3 className="text-lg font-semibold mb-3">
              2.1 Personal Information
            </h3>
            <p className="text-muted-foreground mb-4">
              We may collect personal information that you voluntarily provide
              to us, including:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-6">
              <li>
                Name and contact information (email address, phone number)
              </li>
              <li>Company name and job title</li>
              <li>Billing and payment information</li>
              <li>Communication preferences</li>
            </ul>

            <h3 className="text-lg font-semibold mb-3">
              2.2 Automatically Collected Information
            </h3>
            <p className="text-muted-foreground mb-4">
              When you visit our website, we automatically collect certain
              information, including:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>IP address and browser type</li>
              <li>Device information and operating system</li>
              <li>Pages visited and time spent on our website</li>
              <li>Referring website or source</li>
              <li>Cookies and similar tracking technologies</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4 font-['Space_Grotesk']">
              3. How We Use Your Information
            </h2>
            <p className="text-muted-foreground mb-4">
              We use the information we collect for various purposes, including:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>Providing and maintaining our services</li>
              <li>Processing transactions and sending related information</li>
              <li>Responding to your inquiries and support requests</li>
              <li>Sending marketing communications (with your consent)</li>
              <li>Improving our website and services</li>
              <li>Complying with legal obligations</li>
              <li>Detecting and preventing fraud or abuse</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4 font-['Space_Grotesk']">
              4. Information Sharing
            </h2>
            <p className="text-muted-foreground mb-4">
              We do not sell or rent your personal information to third parties.
              We may share your information in the following circumstances:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>With service providers who perform services on our behalf</li>
              <li>With business partners (with your consent)</li>
              <li>
                In connection with a merger, acquisition, or sale of assets
              </li>
              <li>To comply with legal obligations or protect our rights</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4 font-['Space_Grotesk']">
              5. Data Security
            </h2>
            <p className="text-muted-foreground">
              We implement appropriate technical and organizational measures to
              protect your personal information against unauthorized access,
              alteration, disclosure, or destruction. However, no method of
              transmission over the Internet or electronic storage is 100%
              secure.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4 font-['Space_Grotesk']">
              6. Your Rights
            </h2>
            <p className="text-muted-foreground mb-4">
              Depending on your location, you may have certain rights regarding
              your personal information:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>Right to access your personal information</li>
              <li>Right to correct inaccurate information</li>
              <li>Right to request deletion of your information</li>
              <li>Right to object to processing</li>
              <li>Right to data portability</li>
              <li>Right to withdraw consent</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4 font-['Space_Grotesk']">
              7. Cookies
            </h2>
            <p className="text-muted-foreground">
              We use cookies and similar tracking technologies to enhance your
              experience on our website. You can control cookies through your
              browser settings. For more information, please see our Cookie
              Policy.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4 font-['Space_Grotesk']">
              8. Third-Party Links
            </h2>
            <p className="text-muted-foreground">
              Our website may contain links to third-party websites. We are not
              responsible for the privacy practices or content of these
              third-party sites.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4 font-['Space_Grotesk']">
              9. Children&apos;s Privacy
            </h2>
            <p className="text-muted-foreground">
              Our services are not intended for children under 13 years of age.
              We do not knowingly collect personal information from children
              under 13.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4 font-['Space_Grotesk']">
              10. Changes to This Policy
            </h2>
            <p className="text-muted-foreground">
              We may update this Privacy Policy from time to time. We will
              notify you of any changes by posting the new Privacy Policy on
              this page and updating the &quot;Last updated&quot; date.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4 font-['Space_Grotesk']">
              11. Contact Us
            </h2>
            <p className="text-muted-foreground mb-4">
              If you have any questions about this Privacy Policy, please
              contact us:
            </p>
            <ul className="list-none space-y-2 text-muted-foreground">
              <li>
                Email:{" "}
                <a
                  href="mailto:privacy@Xmart.io"
                  className="text-primary hover:underline"
                >
                  privacy@Xmart.io
                </a>
              </li>
              <li>Address: 123 Tech Street, San Francisco, CA 94105</li>
              <li>Phone: +1 (555) 123-4567</li>
            </ul>
          </section>
        </div>

        {/* Back Link */}
        <div className="mt-12 pt-8 border-t border-border">
          <Link to="/" className="text-primary hover:underline">
            &larr; Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
