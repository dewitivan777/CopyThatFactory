import { Container } from "@/components/ui/Container";

const points = [
  "One hands-on team across web, brand, copy, ads, social, and admin — one point of contact.",
  "Work scoped around outcomes, not departments — sized for startups and small businesses.",
  "Plain-language reporting on what the ad spend is actually doing.",
];

/**
 * Client logos. Drop the artwork into `public/brands/` using the `file` paths
 * below. Logos scroll in a continuous marquee, shown in their original colours,
 * so the strip scales to as many brands as you add here.
 *
 * `bg` is optional — any CSS colour for that logo's card. Defaults to white;
 * set it for logos that need a dark or tinted backdrop (e.g. a white wordmark).
 */
const brands: { name: string; file: string; bg?: string }[] = [
  { name: "Suzuki Vryheid", file: "/brands/suzuki-vryheid.png", bg: "#000000" },
  { name: "SAASWIPP", file: "/brands/saaswipp.png" },
  { name: "Waddle", file: "/brands/waddle.png", bg: "#000000" },
  { name: "First Aid First", file: "/brands/first-aid-first.png" },
  { name: "The Shooting Range", file: "/brands/the-shooting-range.png", bg: "#000000"  },
  { name: "Soccer Strikers", file: "/brands/soccer-strikers.png" },
];

// The track is two identical halves; translating it -50% scrolls exactly one
// half, so the loop is seamless and endless. Each half repeats the brand set
// enough times to overflow even wide viewports — otherwise a short set leaves a
// visible gap before it repeats. Adding more brands only makes this safer.
const REPEATS_PER_HALF = 3;
const half = Array.from({ length: REPEATS_PER_HALF }, () => brands).flat();
const marqueeBrands = [...half, ...half];

export function ProofSection() {
  return (
    <section className="overflow-hidden bg-blue-deep py-[84px] text-white">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-mono text-[0.72rem] uppercase tracking-[0.22em] text-blue-soft">
            Proof
          </p>
          <h2 className="mt-3 font-serif text-[clamp(1.5rem,2.6vw,2rem)] font-medium leading-snug">
            Brands we&apos;ve worked with
          </h2>
          <p className="mt-4 text-[1.02rem] leading-relaxed text-blue-soft">
            From startups to established names — and we&apos;d love to see yours
            here next.
          </p>
        </div>
      </Container>

      {/* Full-bleed marquee: spans edge to edge, fades out at both sides, and
          pauses when the visitor hovers to inspect a logo. */}
      <div className="group relative mt-12 [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]">
        <ul className="flex w-max animate-marquee group-hover:[animation-play-state:paused]">
          {marqueeBrands.map((brand, i) => (
            <li
              key={i}
              aria-hidden={i >= brands.length}
              className="mr-4 shrink-0"
            >
              <div
                style={{ backgroundColor: brand.bg ?? "#ffffff" }}
                className="flex h-24 w-48 items-center justify-center rounded-2xl px-7 shadow-sm ring-1 ring-black/5"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={brand.file}
                  alt={i < brands.length ? brand.name : ""}
                  className="max-h-14 w-auto max-w-full object-contain"
                />
              </div>
            </li>
          ))}
        </ul>
      </div>

      <Container>
        <ul className="mt-16 grid grid-cols-1 gap-x-10 border-t border-white/15 pt-10 sm:grid-cols-3">
          {points.map((point, i) => (
            <li key={point} className="flex gap-3.5 py-3 text-[0.94rem]">
              <span className="mt-0.5 flex-none font-mono text-[0.78rem] text-blue-soft">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
