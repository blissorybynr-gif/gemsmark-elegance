import { createFileRoute } from "@tanstack/react-router";
import { site } from "@/data/site";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy | Gems Mark" },
      {
        name: "description",
        content: "How Gems Mark collects, uses and protects your personal information when you shop with us.",
      },
      { property: "og:title", content: "Privacy Policy | Gems Mark" },
      { property: "og:description", content: "Our privacy practices for orders, payments and cookies." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Privacy,
});

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-8">
      <h2 className="font-display text-2xl text-foreground">{title}</h2>
      <div className="mt-3 space-y-3">{children}</div>
    </section>
  );
}

function Privacy() {
  return (
    <div className="container-luxe py-14">
      <div className="text-center">
        <p className="eyebrow">Legal</p>
        <h1 className="mt-3 font-display text-4xl md:text-5xl">Privacy Policy</h1>
        <div className="gold-rule mx-auto mt-5" />
        <p className="mt-4 text-sm text-muted-foreground">Last updated: 3 September 2026</p>
      </div>

      <div className="mx-auto mt-8 max-w-3xl text-sm text-muted-foreground">
        <p>
          {site.name} ("we," "us," or "our") sells handcrafted silver rings and pendants through this site. This
          policy explains what information we collect, how we use it, and the choices you have. By using our site,
          you agree to the collection and use of information in accordance with this policy.
        </p>

        <Section title="1. Information We Collect">
          <p className="text-foreground">Information you give us</p>
          <ul className="list-disc space-y-1 pl-5">
            <li>Name, email address, phone number</li>
            <li>Shipping and billing address</li>
            <li>Order details (products purchased, ring size, customization notes)</li>
            <li>Payment information handled by our payment providers — we do not store full card details</li>
            <li>Messages you send us through contact forms, WhatsApp, or email</li>
          </ul>
          <p className="text-foreground">Information collected automatically</p>
          <ul className="list-disc space-y-1 pl-5">
            <li>IP address, browser type, device type</li>
            <li>Pages visited, time spent on site, referring website</li>
            <li>Cookies and similar tracking technologies</li>
          </ul>
        </Section>

        <Section title="2. How We Use Your Information">
          <ul className="list-disc space-y-1 pl-5">
            <li>Process and fulfil your orders, including shipping and customer service</li>
            <li>Communicate with you about your order, inquiries, or custom requests</li>
            <li>Improve our site, products, and customer experience</li>
            <li>Send promotional emails or updates, only if you have opted in</li>
            <li>Prevent fraud and maintain the security of our site</li>
            <li>Comply with legal obligations</li>
          </ul>
        </Section>

        <Section title="3. Sharing Your Information">
          <p>We do not sell your personal information. We may share it with:</p>
          <ul className="list-disc space-y-1 pl-5">
            <li>Payment processors (bank transfer providers, Payoneer) to process transactions</li>
            <li>Shipping and courier partners ({site.couriers.join(", ")}) to deliver your order</li>
            <li>Service providers who help us run the site, such as hosting and email tools</li>
            <li>Legal authorities, if required to comply with the law or protect our rights</li>
          </ul>
          <p>
            If you also purchase from us via Etsy, that platform has its own separate privacy policy governing the
            transaction.
          </p>
        </Section>

        <Section title="4. Payment Information">
          <p>
            Payments are made by bank transfer or Payoneer. We do not store your full card or payment account
            details on our own servers — that information is handled directly by the payment provider under its own
            privacy and security policies.
          </p>
        </Section>

        <Section title="5. Data Retention">
          <p>
            We retain your personal information for as long as necessary to fulfil the purposes described in this
            policy, including order history for accounting and legal purposes, unless a longer retention period is
            required by law.
          </p>
        </Section>

        <Section title="6. Cookies">
          <p>
            We use cookies and similar technologies to keep items in your cart, understand how visitors use the
            site, and improve performance. You can disable cookies in your browser settings, though some features
            may not work properly as a result.
          </p>
        </Section>

        <Section title="7. Your Rights">
          <p>Depending on where you live, you may have the right to:</p>
          <ul className="list-disc space-y-1 pl-5">
            <li>Access the personal information we hold about you</li>
            <li>Request correction or deletion of your information</li>
            <li>Opt out of marketing communications at any time</li>
            <li>Object to or restrict certain processing of your data</li>
          </ul>
          <p>To exercise any of these rights, contact us using the details in Section 10.</p>
        </Section>

        <Section title="8. Children's Privacy">
          <p>
            Our site is not directed at children under 13 (or under 16, where applicable), and we do not knowingly
            collect personal information from children.
          </p>
        </Section>

        <Section title="9. Changes to This Policy">
          <p>
            We may update this policy from time to time. Changes will be posted on this page with an updated "Last
            updated" date.
          </p>
        </Section>

        <Section title="10. Contact Us">
          <ul className="list-disc space-y-1 pl-5">
            <li>Email: {site.email}</li>
            <li>Phone / WhatsApp: {site.whatsapp}</li>
            <li>Address: {site.location}</li>
          </ul>
        </Section>
      </div>
    </div>
  );
}
