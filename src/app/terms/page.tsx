import type { Metadata } from "next";
import { site, mailto } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "AskShop terms of service. Rules and guidelines for using our platform.",
};

export default function TermsPage() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold tracking-tight text-foreground">Terms of Service</h1>
        <p className="mt-4 text-sm text-muted">Last updated: September 9, 2026</p>

        <div className="mt-12 space-y-8 text-sm text-muted leading-relaxed">
          <div>
            <h2 className="text-lg font-semibold text-foreground mb-3">1. Acceptance of Terms</h2>
            <p>
              By installing, accessing, or using AskShop (the &quot;Service&quot;), operated by {site.legal.operator}, you agree to be bound
              by these Terms of Service (&quot;Terms&quot;). If you do not agree, do not use the Service.
              These Terms supplement any terms agreed upon between you and Shopify.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-foreground mb-3">2. Description of Service</h2>
            <p>
              AskShop provides a platform for Shopify merchants to create, customize, and publish
              native mobile shopping applications. The Service includes:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>A Shopify embedded admin app for configuration</li>
              <li>Native mobile app builds (iOS and Android)</li>
              <li>Push notification delivery</li>
              <li>AI-powered chat shopping functionality</li>
              <li>Analytics and reporting</li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-foreground mb-3">3. Account and Eligibility</h2>
            <p>
              You must have an active Shopify store to use the Service. You are responsible for
              maintaining the security of your Shopify account and any developer accounts (Apple,
              Google) associated with your mobile app.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-foreground mb-3">4. Subscription and Billing</h2>
            <p>
              The Service is offered on a subscription basis billed through Shopify&apos;s billing
              system. Pricing is listed on our pricing page and is subject to change with 30
              days&apos; notice. All plans include a 14-day free trial. Subscriptions renew
              automatically unless cancelled.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-foreground mb-3">5. App Store Accounts</h2>
            <p>
              You are responsible for maintaining your own Apple Developer and Google Play
              Developer accounts. AskShop is not responsible for fees charged by Apple or Google,
              or for App Store or Play Store review decisions. We will make reasonable efforts to
              help resolve submission issues.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-foreground mb-3">6. Intellectual Property</h2>
            <p>
              You retain all rights to your brand assets (logos, images, product content). AskShop
              retains all rights to the platform technology, app framework, and AI models. Your
              published app is powered by AskShop technology and requires an active subscription.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-foreground mb-3">7. AI Chat Features</h2>
            <p>
              The AI Chat App uses artificial intelligence to assist customers with product
              discovery and recommendations. AI responses are generated automatically and may
              not always be accurate. You are responsible for ensuring your product data is
              accurate. AskShop is not liable for purchase decisions made based on AI
              recommendations.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-foreground mb-3">8. Acceptable Use</h2>
            <p>You agree not to:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Use the Service for any unlawful purpose</li>
              <li>Send spam or unsolicited push notifications</li>
              <li>Attempt to reverse engineer, decompile, or disassemble the Service</li>
              <li>Use the AI features to generate harmful, misleading, or illegal content</li>
              <li>Exceed rate limits or abuse API access</li>
              <li>Resell or redistribute the Service without authorization</li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-foreground mb-3">9. Service Level</h2>
            <p>
              We strive for 99.9% uptime for the config API and push notification delivery.
              Enterprise plans include formal SLA guarantees. We will provide reasonable notice
              of planned maintenance.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-foreground mb-3">10. Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by law, AskShop shall not be liable for any
              indirect, incidental, special, consequential, or punitive damages, including loss
              of profits, data, or business opportunities, arising from your use of the Service.
              Our total liability shall not exceed the fees paid by you in the 12 months preceding
              the claim.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-foreground mb-3">11. Termination</h2>
            <p>
              Either party may terminate the subscription at any time. Upon termination, your
              mobile app will continue to function until the end of the current billing period,
              after which push notifications will be disabled and config updates will stop. You
              may request data export within 90 days of termination.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-foreground mb-3">12. Governing Law</h2>
            <p>
              These Terms shall be governed by the laws of the State of Delaware, United States,
              without regard to conflict of law principles.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-foreground mb-3">13. Changes to Terms</h2>
            <p>
              We may modify these Terms at any time. Material changes will be communicated via
              email or through the Service at least 30 days in advance. Continued use after
              changes constitutes acceptance.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-foreground mb-3">14. Contact</h2>
            <p>
              For questions about these Terms:<br />
              Email:{" "}
              <a href={mailto("Terms of Service question")} className="text-primary hover:text-primary-dark">
                {site.contact.email}
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
