import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHead } from "@/components/ui/SectionHead";
import { capabilities } from "@/data/capabilities";
import { formatFromPrice } from "@/lib/utils";

export function CapabilitiesSection() {
  return (
    <section
      id="capabilities"
      className="border-y border-rule bg-bg-panel py-[84px]"
    >
      <Container>
        <SectionHead
          eyebrow="What we do"
          title="Six capabilities, combined however you need them."
          description="Each capability is available on its own or alongside the others. We evaluate what your business actually needs and quote the work accordingly — no fixed bundles, no paying for things you don't need."
          className="mb-12"
        />

        <div className="grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-rule bg-rule sm:grid-cols-2 lg:grid-cols-3">
          {capabilities.map((cap) => {
            const Icon = cap.icon;
            return (
              <Link
                key={cap.slug}
                href={`/capabilities/${cap.slug}`}
                className="group bg-white px-5 py-7 transition-colors hover:bg-bg-panel"
              >
                <div className="mb-4 flex items-center justify-between">
                  <span className="font-mono text-[0.72rem] text-blue">
                    {cap.index}
                  </span>
                  <Icon
                    size={18}
                    className="text-blue-deep"
                    aria-hidden="true"
                  />
                </div>
                <h3 className="mb-2 text-[1.08rem] group-hover:text-blue-deep">
                  {cap.name}
                </h3>
                <p className="text-[0.88rem] leading-relaxed text-ink-soft">
                  {cap.summary}
                </p>
                <p className="mt-3 font-mono text-[0.72rem] text-blue-deep">
                  {formatFromPrice(cap)}
                </p>
              </Link>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
