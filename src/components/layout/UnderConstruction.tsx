import { siteConfig } from "@/data/site";

export function UnderConstruction() {
  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col items-center justify-center px-6 text-center font-sans">
      <p className="text-xs uppercase tracking-[0.2em] text-stone-400 mb-6">
        Coming Soon
      </p>
      <h1 className="text-4xl sm:text-5xl font-semibold text-white mb-4 leading-tight">
        {siteConfig.name}
      </h1>
      <p className="max-w-md text-stone-400 text-base leading-relaxed mb-10">
        We&rsquo;re putting the finishing touches on something great.
        Check back shortly.
      </p>
      <a
        href={`mailto:${siteConfig.email}`}
        className="text-sm text-stone-300 underline underline-offset-4 hover:text-white transition-colors"
      >
        {siteConfig.email}
      </a>
    </div>
  );
}
