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
  title: "Marketing, Copywriting, Admin & Web Builds for South African Businesses",
  description:
    "Copy That Factory runs your ads, writes the copy, builds the website or app, and handles the admin — as one team, scoped and quoted around what your business actually needs.",
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
