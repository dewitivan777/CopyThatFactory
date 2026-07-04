import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { CtaBand } from "@/components/home/CtaBand";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/structured-data";
import { capabilities } from "@/data/capabilities";
import { formatFromPrice } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Capabilities",
  description:
    "Six capabilities — web & app builds, brand design, copywriting, ads management, social media management, and admin support — combined however your business needs them.",
  alternates: { canonical: "/capabilities" },
};

export default function CapabilitiesPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Capabilities", path: "/capabilities" },
        ])}
      />
      <PageHeader
        eyebrow="What we do"
        title="Six capabilities, combined however you need them."
        description="This is everything Copy That can do. Use one capability on its own or combine several — we evaluate your requirements and quote the work to fit, with no fixed packages."
      />

      <section className="py-16 sm:py-20">
        <Container>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {capabilities.map((cap) => {
              const Icon = cap.icon;
              return (
                <Link
                  key={cap.slug}
                  href={`/capabilities/${cap.slug}`}
                  className="group flex flex-col rounded-[10px] border border-rule bg-white p-7 transition-[border-color,box-shadow,transform] duration-150 hover:-translate-y-1 hover:border-blue hover:shadow-[0_20px_40px_-24px_rgba(28,110,156,0.45)]"
                >
                  <div className="flex items-center justify-between">
                    <span className="flex h-11 w-11 items-center justify-center rounded-base bg-bg-panel text-blue-deep">
                      <Icon size={20} aria-hidden="true" />
                    </span>
                    <span className="font-mono text-[0.72rem] text-blue">
                      {cap.index}
                    </span>
                  </div>
                  <h2 className="mt-5 text-[1.2rem] group-hover:text-blue-deep">
                    {cap.name}
                  </h2>
                  <p className="mt-2.5 flex-1 text-[0.92rem] leading-relaxed text-ink-soft">
                    {cap.summary}
                  </p>
                  <span className="mt-4 font-mono text-[0.78rem] text-blue-deep">
                    {formatFromPrice(cap)}
                  </span>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-[0.9rem] font-semibold text-blue-deep">
                    Learn more
                    <ArrowRight
                      size={16}
                      className="transition-transform group-hover:translate-x-0.5"
                      aria-hidden="true"
                    />
                  </span>
                </Link>
              );
            })}
          </div>
        </Container>
      </section>

      <CtaBand />
    </>
  );
}
