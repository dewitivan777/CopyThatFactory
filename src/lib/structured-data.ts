import { siteConfig } from "@/data/site";
import { absoluteUrl, schemaIds } from "./seo";
import { capabilities } from "@/data/capabilities";
import type { Capability } from "@/types";
import type { Faq } from "@/data/faqs";

type JsonLdNode = Record<string, unknown>;

/**
 * The agency as a schema.org ProfessionalService entity. This is the anchor
 * that everything else (services, breadcrumbs, FAQs) references via @id, so
 * search and answer engines treat the whole site as one coherent business.
 */
export function organizationSchema(): JsonLdNode {
  return {
    "@type": ["Organization", "ProfessionalService"],
    "@id": schemaIds.organization,
    name: siteConfig.name,
    url: siteConfig.url,
    email: siteConfig.email,
    description: siteConfig.description,
    slogan: siteConfig.tagline,
    image: absoluteUrl("/opengraph-image"),
    logo: {
      "@type": "ImageObject",
      url: absoluteUrl("/opengraph-image"),
      width: 1200,
      height: 630,
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Marketing Capabilities",
      itemListElement: capabilities.map((cap) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: cap.name,
          url: absoluteUrl(`/capabilities/${cap.slug}`),
        },
      })),
    },
    address: {
      "@type": "PostalAddress",
      addressCountry: siteConfig.countryCode,
    },
    areaServed: { "@type": "Country", name: siteConfig.location },
    knowsAbout: [
      "Web and app development",
      "Brand design",
      "Copywriting",
      "Search engine optimisation",
      "Answer engine optimisation",
      "Paid advertising",
      "Social media management",
      "Business administration support",
    ],
    ...(siteConfig.sameAs.length > 0 ? { sameAs: siteConfig.sameAs } : {}),
  };
}

/** Site-level WebSite node, published by the organization. */
export function websiteSchema(): JsonLdNode {
  return {
    "@type": "WebSite",
    "@id": schemaIds.website,
    url: siteConfig.url,
    name: siteConfig.name,
    description: siteConfig.description,
    publisher: { "@id": schemaIds.organization },
    inLanguage: "en-ZA",
  };
}

/** The combined organization + website graph rendered once in the root layout. */
export function rootGraph(): JsonLdNode {
  return {
    "@context": "https://schema.org",
    "@graph": [organizationSchema(), websiteSchema()],
  };
}

/** A capability, expressed as a schema.org Service. */
export function capabilityServiceSchema(cap: Capability): JsonLdNode {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: cap.name,
    description: cap.description,
    url: absoluteUrl(`/capabilities/${cap.slug}`),
    provider: { "@id": schemaIds.organization },
    areaServed: { "@type": "Country", name: siteConfig.location },
  };
}

/** Breadcrumb trail for an inner page. Pass site-relative paths. */
export function breadcrumbSchema(
  items: { name: string; path: string }[],
): JsonLdNode {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

/**
 * FAQPage node — the single highest-value structured-data type for answer
 * engines, which lift question/answer pairs directly into AI overviews.
 */
export function faqSchema(faqs: Faq[]): JsonLdNode {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}

/** ContactPage node — tells answer engines this is the canonical contact surface for the entity. */
export function contactPageSchema(): JsonLdNode {
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    url: absoluteUrl("/contact"),
    name: `Contact ${siteConfig.name}`,
    description:
      "Get in touch with Copy That. Send your website and a description of what's not working — we'll respond within one working day with a straight read on where to start.",
    inLanguage: "en-ZA",
    mainEntity: { "@id": schemaIds.organization },
  };
}
