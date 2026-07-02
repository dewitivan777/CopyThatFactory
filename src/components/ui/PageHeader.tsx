import { Container } from "./Container";
import { Eyebrow } from "./Eyebrow";

interface PageHeaderProps {
  eyebrow: string;
  title: React.ReactNode;
  description?: React.ReactNode;
}

/** Standard hero block for inner pages (capabilities, contact). */
export function PageHeader({ eyebrow, title, description }: PageHeaderProps) {
  return (
    <section className="border-b border-rule bg-editorial-gradient py-16 sm:py-20">
      <Container>
        <div className="max-w-[680px]">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 className="text-display mt-3.5 text-[clamp(2rem,3.5vw,3rem)]">
            {title}
          </h1>
          {description && (
            <p className="mt-4 text-[1.05rem] leading-relaxed text-ink-soft">
              {description}
            </p>
          )}
        </div>
      </Container>
    </section>
  );
}
