import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "AskShop privacy policy. Learn how we collect, use, and protect your data.",
};

export default function PrivacyPage() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold tracking-tight text-foreground">Privacy Policy</h1>
        <p className="mt-4 text-sm text-muted">Last updated: March 19, 2026</p>

        <div className="mt-12 space-y-8 text-sm text-muted leading-relaxed">
          <div>
            <h2 className="text-lg font-semibold text-foreground mb-3">1. Introduction</h2>
            <p>
              AskShop (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting your privacy. This Privacy
              Policy explains how we collect, use, disclose, and safeguard your information when
              you use our Shopify application and related services (collectively, the &quot;Service&quot;).
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-foreground mb-3">2. Information We Collect</h2>
            <h3 className="text-base font-medium text-foreground mt-4 mb-2">2.1 Merchant Information</h3>
            <p>When you install AskShop on your Shopify store, we collect:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Store name and domain (myshopify.com URL)</li>
              <li>Shopify store owner contact information</li>
              <li>Storefront API access token</li>
              <li>App configuration data (branding, sections, navigation preferences)</li>
              <li>Build request details (app name, icons, developer account information)</li>
            </ul>

            <h3 className="text-base font-medium text-foreground mt-4 mb-2">2.2 End User (Customer) Information</h3>
            <p>When customers use your mobile app, we collect:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Device push notification tokens (for sending push notifications)</li>
              <li>Device type and operating system version</li>
              <li>App usage analytics (screen views, session duration)</li>
              <li>AI chat conversation data (only for AI Chat App users)</li>
            </ul>
            <p className="mt-2">
              We do <strong className="text-foreground">not</strong> collect payment information, passwords, or
              personal identification documents. All payment processing is handled by Shopify.
            </p>

            <h3 className="text-base font-medium text-foreground mt-4 mb-2">2.3 Automatically Collected Information</h3>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>IP addresses (anonymized after 30 days)</li>
              <li>Browser type and version (for web analytics)</li>
              <li>Referring URLs</li>
              <li>Pages viewed on askshop.app</li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-foreground mb-3">3. How We Use Your Information</h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>To provide, maintain, and improve our Service</li>
              <li>To build and publish your mobile app</li>
              <li>To deliver push notifications on your behalf</li>
              <li>To power AI chat shopping experiences</li>
              <li>To provide customer support</li>
              <li>To send administrative communications about the Service</li>
              <li>To analyze usage patterns and improve our products</li>
              <li>To comply with legal obligations</li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-foreground mb-3">4. Data Sharing</h2>
            <p>We do not sell your personal information. We share data only with:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li><strong className="text-foreground">Shopify:</strong> As required by Shopify&apos;s platform and API terms</li>
              <li><strong className="text-foreground">Apple &amp; Google:</strong> App Store and Play Store submission data</li>
              <li><strong className="text-foreground">Expo (EAS):</strong> Build service for compiling mobile apps</li>
              <li><strong className="text-foreground">AI Providers:</strong> Chat conversation data for AI processing (anonymized)</li>
              <li><strong className="text-foreground">Analytics:</strong> Aggregated, anonymized usage data</li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-foreground mb-3">5. Data Retention</h2>
            <p>
              We retain merchant data for the duration of your subscription plus 90 days. Push
              tokens are deleted within 30 days of app uninstallation. AI conversation data is
              retained for 12 months to improve recommendations, then anonymized. You may request
              earlier deletion at any time.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-foreground mb-3">6. Data Security</h2>
            <p>
              We implement industry-standard security measures including encryption in transit
              (TLS 1.3), encryption at rest (AES-256), access controls, and regular security
              audits. However, no method of transmission over the Internet is 100% secure.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-foreground mb-3">7. Your Rights</h2>
            <p>Depending on your jurisdiction, you may have the right to:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Access the personal data we hold about you</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Object to or restrict processing</li>
              <li>Data portability</li>
              <li>Withdraw consent at any time</li>
            </ul>
            <p className="mt-2">
              To exercise these rights, contact us at{" "}
              <a href="mailto:privacy@askshop.app" className="text-primary hover:text-primary-dark">
                privacy@askshop.app
              </a>.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-foreground mb-3">8. GDPR Compliance</h2>
            <p>
              For EU/EEA residents: We process data under the legal bases of contract performance,
              legitimate interest, and consent. Our Data Processing Agreement (DPA) is available
              at{" "}
              <a href="/dpa" className="text-primary hover:text-primary-dark">
                askshop.app/dpa
              </a>.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-foreground mb-3">9. CCPA Compliance</h2>
            <p>
              For California residents: We do not sell personal information. You have the right
              to know what data we collect, request deletion, and opt out of any future sale of
              personal information.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-foreground mb-3">10. Children&apos;s Privacy</h2>
            <p>
              Our Service is not directed to children under 13 (or 16 in the EU). We do not
              knowingly collect personal information from children.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-foreground mb-3">11. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of material
              changes via email or through the Service. Continued use after changes constitutes
              acceptance.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-foreground mb-3">12. Contact Us</h2>
            <p>
              For privacy-related inquiries:<br />
              Email:{" "}
              <a href="mailto:privacy@askshop.app" className="text-primary hover:text-primary-dark">
                privacy@askshop.app
              </a>
              <br />
              Website: askshop.app
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
