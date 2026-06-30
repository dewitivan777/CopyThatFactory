import { cn } from "@/lib/utils";

interface EyebrowProps {
  children: React.ReactNode;
  /** Centered variant drops the leading rule and centers the text. */
  center?: boolean;
  className?: string;
}

/** Small mono uppercase label that introduces a section. */
export function Eyebrow({ children, center, className }: EyebrowProps) {
  return (
    <span
      className={cn(
        "flex items-center gap-[0.6em] font-mono text-[0.72rem] uppercase tracking-[0.14em] text-blue-deep",
        center ? "justify-center" : "before:inline-block before:h-px before:w-[18px] before:bg-blue-deep before:content-['']",
        className,
      )}
    >
      {children}
    </span>
  );
}
