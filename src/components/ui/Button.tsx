import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "ghost";

const base =
  "inline-flex items-center justify-center gap-2 rounded-base font-sans text-[0.88rem] font-semibold transition-[transform,box-shadow,background-color,border-color] duration-150 px-5 py-[11px] cursor-butterfly disabled:cursor-not-allowed disabled:opacity-60";

const variants: Record<Variant, string> = {
  primary:
    "bg-blue text-white shadow-[0_1px_0_rgba(14,42,61,0.08)] hover:bg-blue-deep",
  ghost:
    "bg-transparent text-ink border border-rule hover:border-blue hover:text-blue-deep",
};

interface ButtonAsLink {
  href: string;
  variant?: Variant;
  className?: string;
  children: React.ReactNode;
}

/** Link styled as a button — the primary call-to-action across the site. */
export function ButtonLink({
  href,
  variant = "primary",
  className,
  children,
}: ButtonAsLink) {
  const isInternal = href.startsWith("/") || href.startsWith("#");
  const classes = cn(base, variants[variant], className);

  if (isInternal) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <a href={href} className={classes}>
      {children}
    </a>
  );
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
}

/** Native button for form actions. */
export function Button({
  variant = "primary",
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button className={cn(base, variants[variant], className)} {...props}>
      {children}
    </button>
  );
}
