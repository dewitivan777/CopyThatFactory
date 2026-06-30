import { Container } from "@/components/ui/Container";
import { SectionHead } from "@/components/ui/SectionHead";
import { SituationSelector } from "./SituationSelector";

export function HowWeHelpSection() {
  return (
    <section id="how-we-help" className="py-[84px]">
      <Container>
        <SectionHead
          center
          eyebrow="How we help"
          title="Start with the bottleneck holding you back."
          description="Most startups and small businesses come to us in one of three situations. There are no set packages — each shows how we'd typically approach the problem and which capabilities we'd draw on, then we scope and quote to your specific needs."
          className="mb-12"
        />
        <SituationSelector />
      </Container>
    </section>
  );
}
