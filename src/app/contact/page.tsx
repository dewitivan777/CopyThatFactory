import type { Metadata } from "next";
import { Mail, MapPin, MessageCircle } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { ContactForm } from "@/components/contact/ContactForm";
import { JsonLd } from "@/components/seo/JsonLd";
import { contactPageSchema } from "@/lib/structured-data";
import { contactSchema, type ContactFormValues } from "@/lib/validation";
import { siteConfig } from "@/data/site";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Tell us what's not working — your website, your ads, or the admin load. We'll tell you straight whether it's a visibility, demand, or capacity problem.",
  alternates: { canonical: "/contact" },
};

interface ContactPageProps {
  searchParams: Promise<{ interest?: string }>;
}

/** Validate the ?interest= param against the schema so only known values pass. */
function resolveInterest(value?: string): ContactFormValues["interest"] {
  const result = contactSchema.shape.interest.safeParse(value);
  return result.success ? result.data : undefined;
}

export default async function ContactPage({ searchParams }: ContactPageProps) {
  const { interest } = await searchParams;
  const defaultInterest = resolveInterest(interest);

  return (
    <>
      <JsonLd data={contactPageSchema()} />
      <PageHeader
        eyebrow="Get in touch"
        title="Let's find your real bottleneck."
        description="Send us your website and a sense of what's not working. We'll come back within one working day with a straight read on where to start — no obligation."
      />

      <section className="py-16 sm:py-20">
        <Container>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1.5fr]">
            <aside>
              <h2 className="font-mono text-[0.78rem] uppercase tracking-[0.1em] text-blue-deep">
                Prefer to reach out directly?
              </h2>
              <ul className="mt-5 space-y-5">
                <li className="flex items-start gap-3">
                  <Mail size={18} className="mt-0.5 flex-none text-blue-deep" aria-hidden="true" />
                  <div>
                    <div className="text-[0.78rem] text-ink-soft">Email</div>
                    <a
                      href={`mailto:${siteConfig.email}`}
                      className="text-[0.95rem] font-medium text-ink transition-colors hover:text-blue-deep"
                    >
                      {siteConfig.email}
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <MessageCircle size={18} className="mt-0.5 flex-none text-blue-deep" aria-hidden="true" />
                  <div>
                    <div className="text-[0.78rem] text-ink-soft">WhatsApp</div>
                    <a
                      href={siteConfig.whatsappLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[0.95rem] font-medium text-ink transition-colors hover:text-blue-deep"
                    >
                      {siteConfig.whatsapp}
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin size={18} className="mt-0.5 flex-none text-blue-deep" aria-hidden="true" />
                  <div>
                    <div className="text-[0.78rem] text-ink-soft">Location</div>
                    <div className="text-[0.95rem] font-medium text-ink">
                      {siteConfig.location}
                    </div>
                  </div>
                </li>
              </ul>

              <p className="mt-8 rounded-[10px] border border-rule bg-bg-panel p-5 text-[0.9rem] leading-relaxed text-ink-soft">
                Not sure what you need? Just describe the problem in the form —
                working out the right starting point, and quoting it to your
                requirements, is the first thing we do.
              </p>
            </aside>

            <ContactForm defaultInterest={defaultInterest} />
          </div>
        </Container>
      </section>
    </>
  );
}
