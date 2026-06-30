export const siteConfig = {
  name: "Copy That Factory",
  /** One-line elevator pitch, reused as the default meta description. */
  description:
    "A marketing agency for South African businesses — brand, ads, copywriting, admin, and bespoke web builds, scoped and quoted around the outcomes you need.",
  /** Longer positioning sentence for structured data / answer engines. */
  tagline:
    "Copy That Factory runs your ads, writes the copy, builds the website or app, and handles the admin — as one team, not four separate vendors.",
  url: "https://copythatfactory.co.za",
  email: "hello@copythatfactory.co.za",
  phone: "+27 00 000 0000",
  location: "South Africa",
  /** Two-letter ISO country code, used in schema.org PostalAddress. */
  countryCode: "ZA",
  /**
   * Public social / directory profiles, emitted as schema.org `sameAs` so
   * search and answer engines can reconcile the brand entity. Add real URLs
   * as they go live (LinkedIn, Facebook, Google Business Profile, etc.).
   */
  sameAs: [] as string[],
};

export const mainNav = [
  { label: "How we help", href: "/#how-we-help" },
  { label: "Capabilities", href: "/capabilities" },
  { label: "Process", href: "/#process" },
  { label: "Contact", href: "/contact" },
];
