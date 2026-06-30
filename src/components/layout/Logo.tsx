import Link from "next/link";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/data/site";

interface LogoProps {
  className?: string;
}

/** Wordmark with the circular mark from the original concept, rebuilt in CSS. */
export function Logo({ className }: LogoProps) {
  return (
    <Link
      href="/"
      className={cn(
        "inline-flex items-center gap-2.5 font-serif text-[1.18rem] font-semibold text-ink",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className="relative h-[30px] w-[30px] flex-none rounded-full bg-blue before:absolute before:left-[7px] before:top-[14px] before:h-0.5 before:w-4 before:bg-white before:content-[''] after:absolute after:left-[18px] after:top-[11.5px] after:h-[5px] after:w-[5px] after:rounded-full after:bg-white after:content-['']"
      />
      {siteConfig.name}
    </Link>
  );
}
