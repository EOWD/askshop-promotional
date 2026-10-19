import type { Metadata } from "next";
import { site, mailto } from "@/lib/site";

export const metadata: Metadata = {
  title: "Data Processing Agreement (DPA)",
  description:
    "Tapmerce Data Processing Agreement for GDPR compliance. Details on how we process personal data on behalf of merchants.",
};

export default function DPAPage() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold tracking-tight text-foreground">
          Data Processing Agreement
        </h1>
        <p className="mt-4 text-sm text-muted">Last updated: September 9, 2026</p>

        <div className="mt-8 p-4 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-sm text-muted">
          This DPA is automatically included with all Tapmerce Enterprise plans. Starter and
          Growth plan merchants may request execution of this DPA by contacting{" "}
          <a href={mailto("DPA request")} className="text-primary hover:text-primary-dark">
            {site.contact.email}
          </a>.
        </div>

        <div className="mt-12 space-y-8 text-sm text-muted leading-relaxed">
          <div>
            <h2 className="text-lg font-semibold text-foreground mb-3">1. Definitions</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong className="text-foreground">&quot;Controller&quot;</strong> means the Merchant who determines the purposes and means of processing Personal Data through the Tapmerce Service.</li>
              <li><strong className="text-foreground">&quot;Processor&quot;</strong> means Tapmerce (operated by {site.legal.operator}), which processes Personal Data on behalf of the Controller.</li>
              <li><strong className="text-foreground">&quot;Personal Data&quot;</strong> means any information relating to an identified or identifiable natural person processed through the Service.</li>
              <li><strong className="text-foreground">&quot;Sub-processor&quot;</strong> means any third party engaged by Tapmerce to process Personal Data on behalf of the Controller.</li>
              <li><strong className="text-foreground">&quot;Data Subject&quot;</strong> means the identified or identifiable person to whom Personal Data relates (i.e., the Merchant&apos;s customers).</li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-foreground mb-3">2. Scope and Purpose</h2>
            <p>
              This DPA applies to the processing of Personal Data by Tapmerce on behalf of the
              Merchant in connection with providing the Service. The categories of Personal Data
              and purposes of processing are:
            </p>
            <table className="mt-4 w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 pr-4 font-semibold text-foreground">Data Category</th>
                  <th className="text-left py-2 font-semibold text-foreground">Purpose</th>
                </tr>
              </thead>
              <tbody className="text-muted">
                <tr className="border-b border-border">
                  <td className="py-2 pr-4">Device push tokens</td>
                  <td className="py-2">Delivering push notifications</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 pr-4">Device identifiers</td>
                  <td className="py-2">Analytics, push targeting</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 pr-4">AI chat conversations</td>
                  <td className="py-2">Product recommendations, AI improvement</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 pr-4">App usage data</td>
                  <td className="py-2">Analytics, service improvement</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4">IP addresses</td>
                  <td className="py-2">Security, fraud prevention (anonymized after 30 days)</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-foreground mb-3">3. Obligations of the Processor</h2>
            <p>Tapmerce shall:</p>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>Process Personal Data only on documented instructions from the Controller</li>
              <li>Ensure that persons authorized to process Personal Data are bound by confidentiality obligations</li>
              <li>Implement appropriate technical and organizational measures to ensure security of processing</li>
              <li>Not engage another processor (sub-processor) without prior written authorization of the Controller</li>
              <li>Assist the Controller in responding to Data Subject requests</li>
              <li>Delete or return all Personal Data upon termination of the Service, at the Controller&apos;s choice</li>
              <li>Make available all information necessary to demonstrate compliance and allow for audits</li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-foreground mb-3">4. Security Measures</h2>
            <p>Tapmerce implements the following security measures:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Encryption in transit (TLS 1.3) and at rest (AES-256)</li>
              <li>Access controls with role-based permissions</li>
              <li>Regular security audits and penetration testing</li>
              <li>Incident response procedures with 72-hour breach notification</li>
              <li>Employee security training</li>
              <li>Secure development practices (code review, automated testing)</li>
              <li>Database backups with encryption</li>
              <li>Network monitoring and intrusion detection</li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-foreground mb-3">5. Sub-processors</h2>
            <p>Tapmerce uses the following sub-processors:</p>
            <table className="mt-4 w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 pr-4 font-semibold text-foreground">Sub-processor</th>
                  <th className="text-left py-2 pr-4 font-semibold text-foreground">Purpose</th>
                  <th className="text-left py-2 font-semibold text-foreground">Location</th>
                </tr>
              </thead>
              <tbody className="text-muted">
                <tr className="border-b border-border">
                  <td className="py-2 pr-4">Shopify</td>
                  <td className="py-2 pr-4">Platform, billing, product data</td>
                  <td className="py-2">Canada/US</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 pr-4">Expo (EAS)</td>
                  <td className="py-2 pr-4">Mobile app build service</td>
                  <td className="py-2">US</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 pr-4">Apple (APNs)</td>
                  <td className="py-2 pr-4">iOS push notification delivery</td>
                  <td className="py-2">US</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 pr-4">Google (FCM)</td>
                  <td className="py-2 pr-4">Android push notification delivery</td>
                  <td className="py-2">US</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4">Database provider</td>
                  <td className="py-2 pr-4">Data storage</td>
                  <td className="py-2">US/EU</td>
                </tr>
              </tbody>
            </table>
            <p className="mt-4">
              We will notify you at least 30 days before adding or replacing a sub-processor.
              You may object to a new sub-processor within 14 days of notification.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-foreground mb-3">6. International Transfers</h2>
            <p>
              Where Personal Data is transferred outside the EEA, we ensure appropriate safeguards
              are in place, including Standard Contractual Clauses (SCCs) approved by the European
              Commission, or reliance on an adequacy decision.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-foreground mb-3">7. Data Breach Notification</h2>
            <p>
              In the event of a Personal Data breach, Tapmerce will notify the Controller without
              undue delay and within 72 hours of becoming aware of the breach. The notification
              will include the nature of the breach, categories and number of Data Subjects
              affected, likely consequences, and measures taken or proposed to address the breach.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-foreground mb-3">8. Data Subject Rights</h2>
            <p>
              Tapmerce will assist the Controller in fulfilling its obligation to respond to
              requests from Data Subjects exercising their rights under GDPR (access,
              rectification, erasure, restriction, portability, objection). We will respond to
              such requests within 10 business days.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-foreground mb-3">9. Term and Termination</h2>
            <p>
              This DPA shall remain in effect for the duration of the Service agreement. Upon
              termination, Tapmerce will delete all Personal Data within 90 days, unless retention
              is required by applicable law. The Controller may request a copy of all Personal
              Data before deletion.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-foreground mb-3">10. Contact</h2>
            <p>
              For DPA-related inquiries or to request execution of this agreement:<br />
              Email:{" "}
              <a href={mailto("DPA request")} className="text-primary hover:text-primary-dark">
                {site.contact.email}
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
