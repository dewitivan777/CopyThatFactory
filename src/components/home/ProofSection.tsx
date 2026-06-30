import { Container } from "@/components/ui/Container";

const points = [
  "One hands-on team across web, brand, copy, ads, social, and admin — one point of contact.",
  "Work scoped around outcomes, not departments — sized for startups and small businesses.",
  "Plain-language reporting on what the ad spend is actually doing.",
];

export function ProofSection() {
  return (
    <section className="bg-blue-deep py-[84px] text-white">
      <Container className="grid grid-cols-1 items-center gap-15 lg:grid-cols-2 lg:gap-[60px]">
        <div>
          <blockquote className="font-serif text-[clamp(1.4rem,2.4vw,1.9rem)] font-medium leading-snug">
            &ldquo;Our old website wasn&apos;t even showing up in AI search
            results. They rebuilt it, ran the ads, and we stopped chasing leads
            through three different agencies.&rdquo;
          </blockquote>
          <cite className="mt-5 block text-[0.86rem] not-italic text-blue-soft">
            — Founder, small business, Gauteng
          </cite>
        </div>

        <ul>
          {points.map((point, i) => (
            <li
              key={point}
              className="flex gap-3.5 border-t border-white/20 py-4 text-[0.94rem] first:border-t-0"
            >
              <span className="mt-0.5 flex-none font-mono text-[0.78rem] text-blue-soft">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
