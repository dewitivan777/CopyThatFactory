import { Container } from "@/components/ui/Container";
import { SectionHead } from "@/components/ui/SectionHead";
import { processSteps } from "@/data/process";

export function ProcessSection() {
  return (
    <section id="process" className="py-[84px]">
      <Container>
        <SectionHead
          center
          eyebrow="How we work"
          title="Diagnose. Plan. Build. Run."
          description="The same four stages whether we're handling one capability or all five — so you always know what's happening and why."
          className="mb-12"
        />

        <div className="relative pt-12">
          {/* Dashed connector rail, hidden on small screens */}
          <div
            aria-hidden="true"
            className="absolute left-[6%] right-[6%] top-[74px] hidden h-0.5 [background:repeating-linear-gradient(to_right,var(--color-blue-line)_0_10px,transparent_10px_18px)] lg:block"
          />

          <div className="relative grid grid-cols-1 gap-9 sm:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((step) => (
              <div key={step.number} className="text-center">
                <div className="relative z-10 mx-auto mb-[18px] flex h-[54px] w-[54px] items-center justify-center rounded-full border-2 border-blue bg-white font-serif font-semibold text-blue-deep">
                  {step.number}
                </div>
                <h3 className="mb-2 text-base font-semibold">{step.title}</h3>
                <p className="mx-auto max-w-[220px] text-[0.86rem] leading-relaxed text-ink-soft">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
