import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <section className="py-24 sm:py-32">
      <Container>
        <div className="mx-auto max-w-[520px] text-center">
          <span className="font-mono text-[0.78rem] uppercase tracking-[0.14em] text-blue-deep">
            404
          </span>
          <h1 className="mt-4 text-[clamp(2rem,4vw,2.8rem)]">
            That page has moved on.
          </h1>
          <p className="mx-auto mt-4 max-w-[400px] text-ink-soft">
            The link may be old or mistyped. Head back home, or tell us what you
            were looking for.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <ButtonLink href="/">Back to home</ButtonLink>
            <ButtonLink href="/contact" variant="ghost">
              Contact us
            </ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
