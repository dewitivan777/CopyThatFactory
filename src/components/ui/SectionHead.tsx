import { Eyebrow } from "./Eyebrow";
import { cn } from "@/lib/utils";

interface SectionHeadProps {
  eyebrow: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  center?: boolean;
  className?: string;
}

/** Eyebrow + heading + optional lead, used at the top of most sections. */
export function SectionHead({
  eyebrow,
  title,
  description,
  center,
  className,
}: SectionHeadProps) {
  return (
    <div
      className={cn(
        "max-w-[620px]",
        center && "mx-auto text-center",
        className,
      )}
    >
      <Eyebrow center={center}>{eyebrow}</Eyebrow>
      <h2 className="mt-3.5 text-[clamp(1.8rem,3vw,2.3rem)]">{title}</h2>
      {description && (
        <p className="mt-3.5 text-base leading-relaxed text-ink-soft">
          {description}
        </p>
      )}
    </div>
  );
}
