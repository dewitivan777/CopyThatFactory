import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";

interface CtaBandProps {
  title?: string;
  description?: string;
  ctaLabel?: string;
  ctaHref?: string;
}

export function CtaBand({
  title = "Not sure where to start?",
  description = "Send us your website and a sense of what's not working — we'll tell you straight whether it's a visibility, demand, or capacity problem.",
  ctaLabel = "Book a free audit",
  ctaHref = "/contact",
}: CtaBandProps) {
  return (
    <section className="border-y border-rule bg-white py-[84px]">
      <Container className="flex flex-wrap items-center justify-between gap-6">
        <div>
          <h2 className="max-w-[480px] text-[1.6rem]">{title}</h2>
          <p className="mt-2 max-w-[420px] text-ink-soft">{description}</p>
        </div>
        <ButtonLink href={ctaHref}>{ctaLabel}</ButtonLink>
      </Container>
    </section>
  );
}
