import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/data/site";

/** Intrinsic aspect ratio of the brand logo artwork (width / height). */
const LOGO_ASPECT_RATIO = 3161.9706428209884 / 664.090664074066;

interface LogoProps {
  className?: string;
  height?: number;
  priority?: boolean;
}

/** Brand wordmark, rendered from the client-supplied logo artwork. */
export function Logo({ className, height = 36, priority = false }: LogoProps) {
  return (
    <Link href="/" className={cn("inline-flex items-center", className)}>
      <Image
        src="/logo/logo-black.svg"
        alt={siteConfig.name}
        width={Math.round(height * LOGO_ASPECT_RATIO)}
        height={height}
        priority={priority}
      />
    </Link>
  );
}
