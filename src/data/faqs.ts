export interface Faq {
  question: string;
  /**
   * Answer written to stand alone — a complete, self-contained response an
   * answer engine can lift verbatim, without needing the question for context.
   */
  answer: string;
}

export const generalFaqs: Faq[] = [
  {
    question: "What does Copy That Factory do?",
    answer:
      "Copy That Factory is a South African marketing agency that combines five capabilities under one roof: brand design, paid ads management, copywriting, web and app builds, and admin support. Instead of hiring four separate vendors, you get one coordinated team — and the work is scoped and quoted around what your business actually needs.",
  },
  {
    question: "What is AEO, and how is it different from SEO?",
    answer:
      "SEO (search engine optimisation) structures a website so it ranks in traditional search results like Google. AEO (answer engine optimisation) structures the same content so AI answer tools — ChatGPT, Perplexity, and Google's AI overviews — can find, understand, and cite it directly in their answers. Copy That Factory writes and structures copy for both, so you show up whether someone searches or asks an AI.",
  },
  {
    question: "Do you sell fixed packages?",
    answer:
      "No. Copy That Factory doesn't sell set packages or bundles. Each capability — brand design, ads management, copywriting, web and app builds, or admin support — can be used on its own or combined with others, and every engagement is evaluated and quoted to your specific requirements, so you only pay for the work you need.",
  },
  {
    question: "How do I know what I need?",
    answer:
      "Start with the bottleneck holding you back: low visibility (you're hard to find), weak demand (you're found but enquiries are quiet), or limited capacity (leads are coming in but admin is eating the week). You don't have to work it out alone — Copy That Factory runs a free audit to diagnose the real problem and recommend which capabilities will fix it first.",
  },
  {
    question: "How does pricing work?",
    answer:
      "Every engagement is quoted individually, because the work is scoped to your specific requirements rather than sold as a fixed package. The starting point is always a free audit, after which you receive a clear quote before any work begins — so there are no set prices to compare, and nothing you pay for that you don't need.",
  },
  {
    question: "Who does Copy That Factory work with?",
    answer:
      "Copy That Factory works with South African businesses — from professional services firms to growing companies — that want their brand, ads, copy, website, and admin handled by one coordinated team rather than several disconnected suppliers.",
  },
];
