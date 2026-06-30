export const siteConfig = {
  name: "Copy That Factory",
  /** One-line elevator pitch, reused as the default meta description. */
  description:
    "A marketing partner for South African startups and small businesses — websites and apps, brand, copywriting, ads, social media, and admin, scoped and quoted around what you actually need.",
  /** Longer positioning sentence for structured data / answer engines. */
  tagline:
    "Copy That Factory builds the website or app, writes the copy, runs the ads, manages the social, and handles the admin — one hands-on team for startups and small businesses, instead of juggling separate vendors.",
  url: "https://copythatfactory.co.za",
  email: "info@copythatfactory.co.za",
  location: "South Africa",
  /** Two-letter ISO country code, used in schema.org PostalAddress. */
  countryCode: "ZA",
  /**
   * Public social / directory profiles, emitted as schema.org `sameAs` so
   * search and answer engines can reconcile the brand entity. Add real URLs
   * as they go live (LinkedIn, Facebook, Google Business Profile, etc.).
   */
  sameAs: [] as string[],

  /**
   * Google Analytics 4 Measurement ID.
   * Format: "G-XXXXXXXXXX"
   * Leave empty ("") to disable gtag.
   */
  gtagId: "G-C5P63VHLEL",

  /**
   * Google reCAPTCHA v3 site key (public — safe to expose in client code).
   * Get one at https://www.google.com/recaptcha/admin
   * Leave empty ("") to disable reCAPTCHA.
   */
  recaptchaSiteKey: "6LfZ9D0tAAAAAOwHZVHme4tHGve18oOp84215hVE",
};

export const mainNav = [
  { label: "How we help", href: "/#how-we-help" },
  { label: "Capabilities", href: "/capabilities" },
  { label: "Process", href: "/#process" },
  { label: "Contact", href: "/contact" },
];
