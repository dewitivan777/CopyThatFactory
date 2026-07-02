import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ButtonLink } from "@/components/ui/Button";

export function Hero() {
  return (
    <section className="bg-editorial-gradient pt-[88px] pb-[60px]">
      <Container>
        <div className="mx-auto max-w-[760px] text-center">
          <Eyebrow center>
            Web, brand, copy, ads, social &amp; admin — under one roof
          </Eyebrow>
          <h1 className="text-display my-[18px] text-[clamp(2.3rem,4.5vw,3.6rem)]">
            Built around what your business needs{" "}
            <em className="italic text-amber">next.</em>
          </h1>
          <p className="mx-auto mb-9 max-w-[560px] text-[1.05rem] leading-relaxed text-ink-soft">
            Copy That builds the website or app, writes the copy,
            runs the ads, manages the social, and handles the admin in
            between — one hands-on team for startups and small businesses,
            scoped and quoted around what you actually need.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <ButtonLink href="/contact">Tell us your requirements</ButtonLink>
            <ButtonLink href="/#how-we-help" variant="ghost">
              See how we help
            </ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
