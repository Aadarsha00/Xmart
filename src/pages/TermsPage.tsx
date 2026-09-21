import { useEffect } from "react";
import { Link } from "react-router-dom";

export function TermsPage() {
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
            Terms & Conditions
          </h1>
          <p className="text-muted-foreground">
            Last updated: February 1, 2026
          </p>
        </div>

        {/* Content */}
        <div className="prose prose-lg max-w-none">
          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4 font-['Space_Grotesk']">
              1. Agreement to Terms
            </h2>
            <p className="text-muted-foreground mb-4">
              By accessing or using Xmart&apos;s website and services
              (&quot;Services&quot;), you agree to be bound by these Terms and
              Conditions (&quot;Terms&quot;). If you disagree with any part of
              these terms, you may not access the Services.
            </p>
            <p className="text-muted-foreground">
              These Terms constitute a legally binding agreement between you and
              Xmart Inc. (&quot;Xmart,&quot; &quot;we,&quot; &quot;our,&quot; or
              &quot;us&quot;).
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4 font-['Space_Grotesk']">
              2. Description of Services
            </h2>
            <p className="text-muted-foreground mb-4">
              Xmart provides information technology services including but not
              limited to:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>Cloud services and infrastructure management</li>
              <li>Cybersecurity solutions</li>
              <li>IT consulting and strategy</li>
              <li>Network solutions and management</li>
              <li>Software development</li>
              <li>Data science and analytics</li>
              <li>Artificial intelligence and machine learning solutions</li>
              <li>Mobile application development</li>
              <li>DevOps and automation services</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4 font-['Space_Grotesk']">
              3. Accounts and Registration
            </h2>
            <p className="text-muted-foreground mb-4">
              To access certain features of our Services, you may need to create
              an account. You agree to:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>Provide accurate, current, and complete information</li>
              <li>Maintain the security of your account credentials</li>
              <li>Promptly notify us of any unauthorized access</li>
              <li>
                Accept responsibility for all activities under your account
              </li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4 font-['Space_Grotesk']">
              4. Payment Terms
            </h2>
            <h3 className="text-lg font-semibold mb-3">4.1 Fees and Billing</h3>
            <p className="text-muted-foreground mb-4">
              Certain Services require payment of fees. You agree to:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-6">
              <li>
                Pay all fees in accordance with the pricing displayed on our
                website
              </li>
              <li>Provide valid payment information</li>
              <li>
                Accept that fees are non-refundable except as required by law
              </li>
            </ul>

            <h3 className="text-lg font-semibold mb-3">
              4.2 Subscription Services
            </h3>
            <p className="text-muted-foreground">
              For subscription-based Services, you will be billed in advance on
              a recurring basis. You may cancel your subscription at any time,
              but no refunds will be provided for partial subscription periods.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4 font-['Space_Grotesk']">
              5. Intellectual Property
            </h2>
            <h3 className="text-lg font-semibold mb-3">
              5.1 Our Intellectual Property
            </h3>
            <p className="text-muted-foreground mb-4">
              All content, features, and functionality of our Services,
              including but not limited to text, graphics, logos, and software,
              are owned by Xmart and protected by intellectual property laws.
            </p>

            <h3 className="text-lg font-semibold mb-3">5.2 License to You</h3>
            <p className="text-muted-foreground">
              Subject to these Terms, we grant you a limited, non-exclusive,
              non-transferable license to access and use our Services for your
              internal business purposes.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4 font-['Space_Grotesk']">
              6. Confidentiality
            </h2>
            <p className="text-muted-foreground">
              Both parties agree to maintain the confidentiality of any
              proprietary information disclosed during the course of our
              business relationship. This obligation survives termination of
              these Terms.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4 font-['Space_Grotesk']">
              7. Limitation of Liability
            </h2>
            <p className="text-muted-foreground mb-4">
              To the maximum extent permitted by law, Xmart shall not be liable
              for:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>Indirect, incidental, special, or consequential damages</li>
              <li>Loss of profits, revenue, data, or business opportunities</li>
              <li>
                Damages exceeding the amount you paid to Xmart in the 12 months
                preceding the claim
              </li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4 font-['Space_Grotesk']">
              8. Indemnification
            </h2>
            <p className="text-muted-foreground">
              You agree to indemnify and hold harmless Xmart and its officers,
              directors, employees, and agents from any claims, damages, or
              expenses arising from your use of our Services or violation of
              these Terms.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4 font-['Space_Grotesk']">
              9. Service Level Agreements
            </h2>
            <p className="text-muted-foreground mb-4">
              For Enterprise customers, specific Service Level Agreements (SLAs)
              may apply. These SLAs will be documented in separate agreements
              and incorporated by reference into these Terms.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4 font-['Space_Grotesk']">
              10. Termination
            </h2>
            <p className="text-muted-foreground mb-4">
              We may terminate or suspend your access to our Services
              immediately, without prior notice or liability, for any reason,
              including:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>Breach of these Terms</li>
              <li>Non-payment of fees</li>
              <li>
                Conduct that we determine to be harmful to other users or our
                business
              </li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4 font-['Space_Grotesk']">
              11. Governing Law
            </h2>
            <p className="text-muted-foreground">
              These Terms shall be governed by and construed in accordance with
              the laws of the State of California, United States, without regard
              to its conflict of law provisions.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4 font-['Space_Grotesk']">
              12. Dispute Resolution
            </h2>
            <p className="text-muted-foreground">
              Any dispute arising from these Terms shall first be attempted to
              be resolved through good faith negotiation. If negotiation fails,
              disputes shall be resolved through binding arbitration in San
              Francisco, California.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4 font-['Space_Grotesk']">
              13. Changes to Terms
            </h2>
            <p className="text-muted-foreground">
              We reserve the right to modify these Terms at any time. We will
              notify you of any material changes by posting the updated Terms on
              our website. Your continued use of our Services after such changes
              constitutes acceptance of the new Terms.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4 font-['Space_Grotesk']">
              14. Contact Information
            </h2>
            <p className="text-muted-foreground mb-4">
              If you have any questions about these Terms, please contact us:
            </p>
            <ul className="list-none space-y-2 text-muted-foreground">
              <li>
                Email:{" "}
                <a
                  href="mailto:legal@Xmart.io"
                  className="text-primary hover:underline"
                >
                  legal@Xmart.io
                </a>
              </li>
              <li>Address: 123 Tech Street, San Francisco, CA 94105</li>
              <li>Phone: +1 (555) 123-4567</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4 font-['Space_Grotesk']">
              15. Severability
            </h2>
            <p className="text-muted-foreground">
              If any provision of these Terms is found to be unenforceable or
              invalid, that provision will be limited or eliminated to the
              minimum extent necessary, and the remaining provisions will
              continue in full force and effect.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4 font-['Space_Grotesk']">
              16. Entire Agreement
            </h2>
            <p className="text-muted-foreground">
              These Terms, together with our Privacy Policy and any other legal
              notices published by us on the Services, constitute the entire
              agreement between you and Xmart concerning the Services.
            </p>
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
