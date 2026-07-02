import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { HowWeHelpSection } from "@/components/home/HowWeHelpSection";
import { CapabilitiesSection } from "@/components/home/CapabilitiesSection";
import { ProcessSection } from "@/components/home/ProcessSection";
import { ProofSection } from "@/components/home/ProofSection";
import { FaqSection } from "@/components/home/FaqSection";
import { CtaBand } from "@/components/home/CtaBand";
import { generalFaqs } from "@/data/faqs";

export const metadata: Metadata = {
  title: "Web, Brand, Copy, Ads & Social for South African Startups & Small Businesses",
  description:
    "Copy That builds the website or app, writes the copy, runs the ads, manages the social, and handles the admin — one hands-on team for South African startups and small businesses, scoped and quoted around what you actually need.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <HowWeHelpSection />
      <CapabilitiesSection />
      <ProcessSection />
      <ProofSection />
      <FaqSection faqs={generalFaqs} />
      <CtaBand />
    </>
  );
}
