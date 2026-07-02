import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { ButtonLink } from "@/components/ui/Button";
import { CtaBand } from "@/components/home/CtaBand";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  capabilityServiceSchema,
  breadcrumbSchema,
} from "@/lib/structured-data";
import { capabilities, getCapability } from "@/data/capabilities";
import { situationsForCapability } from "@/data/situations";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return capabilities.map((cap) => ({ slug: cap.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const cap = getCapability(slug);
  if (!cap) return {};
  return {
    title: cap.name,
    description: cap.description,
    alternates: { canonical: `/capabilities/${cap.slug}` },
    openGraph: {
      images: [
        {
          url: `/capabilities/${cap.slug}/opengraph-image`,
          alt: `${cap.name} — Copy That`,
        },
      ],
    },
  };
}

export default async function CapabilityDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const cap = getCapability(slug);
  if (!cap) notFound();

  const Icon = cap.icon;
  const relatedSituations = situationsForCapability(cap.slug);

  return (
    <>
      <JsonLd data={capabilityServiceSchema(cap)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Capabilities", path: "/capabilities" },
          { name: cap.name, path: `/capabilities/${cap.slug}` },
        ])}
      />
      <PageHeader
        eyebrow={`Capability ${cap.index}`}
        title={cap.name}
        description={cap.summary}
      />

      <section className="py-16 sm:py-20">
        <Container>
          <Link
            href="/capabilities"
            className="inline-flex items-center gap-1.5 text-[0.88rem] font-medium text-ink-soft transition-colors hover:text-blue-deep"
          >
            <ArrowLeft size={15} aria-hidden="true" />
            All capabilities
          </Link>

          <div className="mt-8 grid grid-cols-1 gap-12 lg:grid-cols-[1.3fr_1fr]">
            <div>
              <span className="flex h-12 w-12 items-center justify-center rounded-base bg-bg-panel text-blue-deep">
                <Icon size={22} aria-hidden="true" />
              </span>
              <p className="mt-6 text-[1.1rem] leading-relaxed text-ink">
                {cap.description}
              </p>

              <h2 className="mt-12 font-mono text-[0.78rem] uppercase tracking-[0.1em] text-blue-deep">
                What you get
              </h2>
              <ul className="mt-4 space-y-3">
                {cap.deliverables.map((item) => (
                  <li key={item} className="flex gap-3">
                    <Check
                      size={18}
                      className="mt-0.5 flex-none text-blue"
                      aria-hidden="true"
                    />
                    <span className="text-[0.96rem] leading-relaxed text-ink-soft">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <aside className="h-fit rounded-[10px] border border-rule bg-bg-panel p-7">
              <h2 className="font-mono text-[0.78rem] uppercase tracking-[0.1em] text-blue-deep">
                Where this helps
              </h2>
              {relatedSituations.length > 0 ? (
                <>
                  <p className="mt-4 text-[0.9rem] leading-relaxed text-ink-soft">
                    We often draw on this when a business is working to:
                  </p>
                  <ul className="mt-3 space-y-2">
                    {relatedSituations.map((s) => (
                      <li key={s.slug}>
                        <Link
                          href="/#how-we-help"
                          className="group flex items-center justify-between rounded-base bg-white px-4 py-3 transition-colors hover:text-blue-deep"
                        >
                          <span>
                            <span className="block text-[0.92rem] font-medium text-ink group-hover:text-blue-deep">
                              {s.name}
                            </span>
                            <span className="block text-[0.78rem] text-ink-soft">
                              {s.label}
                            </span>
                          </span>
                          <ArrowRight
                            size={15}
                            className="flex-none text-ink-soft transition-transform group-hover:translate-x-0.5"
                            aria-hidden="true"
                          />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </>
              ) : (
                <p className="mt-4 text-[0.9rem] text-ink-soft">
                  Available on its own or alongside any other capability.
                </p>
              )}

              <p className="mt-6 text-[0.82rem] leading-relaxed text-ink-soft">
                Every engagement is scoped and quoted to your own requirements.
              </p>
              <ButtonLink
                href={`/contact?interest=${cap.slug}`}
                className="mt-3 w-full"
              >
                Ask about {cap.name}
              </ButtonLink>
            </aside>
          </div>
        </Container>
      </section>

      <CtaBand />
    </>
  );
}
