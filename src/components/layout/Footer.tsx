import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Logo } from "./Logo";
import { capabilities } from "@/data/capabilities";
import { siteConfig } from "@/data/site";

const exploreLinks = [
  { label: "How we help", href: "/#how-we-help" },
  { label: "Capabilities", href: "/capabilities" },
  { label: "Process", href: "/#process" },
  { label: "Contact", href: "/contact" },
];

function FooterHeading({ children }: { children: React.ReactNode }) {
  return (
    <h4 className="mb-4 font-mono text-[0.78rem] font-medium uppercase tracking-[0.08em] text-ink-soft">
      {children}
    </h4>
  );
}

export function Footer() {
  return (
    <footer className="pb-10 pt-14">
      <Container>
        <div className="grid grid-cols-1 gap-10 border-b border-rule pb-9 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Logo height={40} />
            <p className="mt-2.5 max-w-[260px] text-[0.92rem] leading-relaxed text-ink-soft">
              {siteConfig.description}
            </p>
          </div>

          <div>
            <FooterHeading>Explore</FooterHeading>
            <ul className="space-y-2.5">
              {exploreLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[0.92rem] text-ink-soft transition-colors hover:text-blue-deep"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <FooterHeading>Capabilities</FooterHeading>
            <ul className="space-y-2.5">
              {capabilities.map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/capabilities/${c.slug}`}
                    className="text-[0.92rem] text-ink-soft transition-colors hover:text-blue-deep"
                  >
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <FooterHeading>Get in touch</FooterHeading>
            <ul className="space-y-2.5">
              <li>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="text-[0.92rem] text-ink-soft transition-colors hover:text-blue-deep"
                >
                  {siteConfig.email}
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[0.92rem] text-ink-soft transition-colors hover:text-blue-deep"
                >
                  WhatsApp: {siteConfig.whatsapp}
                </a>
              </li>
              <li className="text-[0.92rem] text-ink-soft">{siteConfig.location}</li>
            </ul>
          </div>
        </div>

        <div className="flex flex-wrap justify-between gap-2.5 pt-6 text-[0.82rem] text-ink-soft">
          <span>
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </span>
          <span>Web, brand, copy, ads, social &amp; admin — under one roof.</span>
        </div>
      </Container>
    </footer>
  );
}
