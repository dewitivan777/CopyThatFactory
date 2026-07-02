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
    question: "What does Copy That do?",
    answer:
      "Copy That is a South African marketing partner for startups and small businesses, combining six capabilities under one roof: web and app builds, brand design, copywriting, paid ads management, social media management, and admin support. Instead of hiring several separate vendors, you get one hands-on team — and the work is scoped and quoted around what your business actually needs.",
  },
  {
    question: "What is AEO, and how is it different from SEO?",
    answer:
      "SEO (search engine optimisation) structures a website so it ranks in traditional search results like Google. AEO (answer engine optimisation) structures the same content so AI answer tools — ChatGPT, Perplexity, and Google's AI overviews — can find, understand, and cite it directly in their answers. Copy That writes and structures copy for both, so you show up whether someone searches or asks an AI.",
  },
  {
    question: "Do you sell fixed packages?",
    answer:
      "No. Copy That doesn't sell set packages or bundles. Each capability — web and app builds, brand design, copywriting, ads management, social media management, or admin support — can be used on its own or combined with others, and every engagement is evaluated and quoted to your specific requirements, so you only pay for the work you need.",
  },
  {
    question: "How do I know what I need?",
    answer:
      "Start with the bottleneck holding you back: low visibility (you're hard to find), weak demand (you're found but enquiries are quiet), or limited capacity (leads are coming in but admin is eating the week). You don't have to work it out alone — Copy That runs a free audit to diagnose the real problem and recommend which capabilities will fix it first.",
  },
  {
    question: "How does pricing work?",
    answer:
      "Every engagement is quoted individually, because the work is scoped to your specific requirements rather than sold as a fixed package. The starting point is always a free audit, after which you receive a clear quote before any work begins — so there are no set prices to compare, and nothing you pay for that you don't need.",
  },
  {
    question: "Who does Copy That work with?",
    answer:
      "Copy That works with South African startups and small businesses that want their website, brand, copy, ads, social media, and admin handled by one hands-on team rather than several disconnected suppliers. We're built for lean, growing businesses rather than large enterprises.",
  },
];
