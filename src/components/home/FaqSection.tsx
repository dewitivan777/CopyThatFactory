import { Plus } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHead } from "@/components/ui/SectionHead";
import { JsonLd } from "@/components/seo/JsonLd";
import { faqSchema } from "@/lib/structured-data";
import type { Faq } from "@/data/faqs";

interface FaqSectionProps {
  faqs: Faq[];
  eyebrow?: string;
  title?: string;
  description?: string;
  /** Emit FAQPage structured data. Keep true on only one page per FAQ set. */
  withSchema?: boolean;
}

/**
 * Crawlable FAQ accordion. Uses native <details>, so every answer is present
 * in the server-rendered HTML — visible to crawlers and answer engines whether
 * or not the item is expanded — and pairs with optional FAQPage structured data.
 */
export function FaqSection({
  faqs,
  eyebrow = "Questions, answered",
  title = "Common questions",
  description = "Straight answers to what businesses ask before getting started.",
  withSchema = true,
}: FaqSectionProps) {
  if (faqs.length === 0) return null;

  return (
    <section id="faq" className="border-t border-rule bg-bg-panel py-[84px]">
      {withSchema && <JsonLd data={faqSchema(faqs)} />}
      <Container>
        <SectionHead
          eyebrow={eyebrow}
          title={title}
          description={description}
          className="mb-12"
        />

        <div className="mx-auto max-w-[820px] divide-y divide-rule overflow-hidden rounded-[10px] border border-rule bg-white">
          {faqs.map((faq) => (
            <details key={faq.question} className="group">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 text-[1.02rem] font-semibold text-ink [&::-webkit-details-marker]:hidden">
                {faq.question}
                <Plus
                  size={18}
                  aria-hidden="true"
                  className="flex-none text-blue-deep transition-transform duration-200 group-open:rotate-45"
                />
              </summary>
              <div className="px-6 pb-5 text-[0.94rem] leading-relaxed text-ink-soft">
                {faq.answer}
              </div>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}
