import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ButtonLink } from "@/components/ui/Button";

export function Hero() {
  return (
    <section className="pt-[88px] pb-[60px]">
      <Container>
        <div className="mx-auto max-w-[760px] text-center">
          <Eyebrow center>
            Brand, ads, copy, admin &amp; web — under one roof
          </Eyebrow>
          <h1 className="my-[18px] text-[clamp(2.2rem,4vw,3.3rem)]">
            Built around what your business needs{" "}
            <em className="italic text-blue-deep">next.</em>
          </h1>
          <p className="mx-auto mb-9 max-w-[560px] text-[1.05rem] leading-relaxed text-ink-soft">
            Copy That Factory runs your ads, writes the copy that supports them,
            builds the website or app behind them, and handles the admin in
            between — as one team, scoped and quoted around what you actually
            need.
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
