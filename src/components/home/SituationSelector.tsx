"use client";

import { useState } from "react";
import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { situations } from "@/data/situations";
import { getCapabilities } from "@/data/capabilities";

export function SituationSelector() {
  const [active, setActive] = useState(situations[0].slug);
  const situation = situations.find((s) => s.slug === active) ?? situations[0];
  const capabilities = getCapabilities(situation.capabilities);

  return (
    <div className="mx-auto w-full max-w-[920px] text-left">
      <p className="mb-[18px] text-center font-mono text-[0.78rem] uppercase tracking-[0.06em] text-ink-soft">
        What&apos;s holding your business back right now?
      </p>

      <div
        role="tablist"
        aria-label="Choose the situation that fits you best"
        className="mb-[22px] grid grid-cols-1 gap-3.5 md:grid-cols-3"
      >
        {situations.map((s) => {
          const selected = s.slug === active;
          return (
            <button
              key={s.slug}
              role="tab"
              id={`tab-${s.slug}`}
              aria-selected={selected}
              aria-controls={`panel-${s.slug}`}
              onClick={() => setActive(s.slug)}
              className={cn(
                "rounded-lg border bg-white p-[18px] text-left transition-[border-color,box-shadow,transform] duration-150 hover:-translate-y-0.5",
                selected
                  ? "border-blue shadow-[0_14px_30px_-18px_rgba(28,110,156,0.45)]"
                  : "border-rule",
              )}
            >
              <span
                className={cn(
                  "mb-2 block font-mono text-[0.7rem]",
                  selected ? "text-blue" : "text-blue-deep",
                )}
              >
                {s.key} · {s.label}
              </span>
              <h3 className="mb-1 text-[1.04rem]">{s.heading}</h3>
              <p className="text-[0.84rem] leading-relaxed text-ink-soft">
                {s.blurb}
              </p>
            </button>
          );
        })}
      </div>

      <div
        role="tabpanel"
        id={`panel-${situation.slug}`}
        aria-labelledby={`tab-${situation.slug}`}
        className="rounded-[10px] border border-rule bg-white p-[30px]"
      >
        <div className="mb-5 flex flex-wrap items-start justify-between gap-5">
          <div>
            <h3 className="text-[1.3rem]">{situation.name}</h3>
            <div className="mt-1 text-[0.88rem] font-semibold text-blue-deep">
              {situation.label}
            </div>
          </div>
          <ButtonLink href="/contact" variant="ghost">
            Tell us your requirements
          </ButtonLink>
        </div>

        <p className="mb-6 max-w-[640px] text-[0.95rem] leading-relaxed text-ink-soft">
          {situation.summary}
        </p>

        <div className="mb-2 font-mono text-[0.72rem] uppercase tracking-[0.1em] text-blue-deep">
          What this usually involves
        </div>
        <ul className="mb-6 grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
          {situation.typicalWork.map((item) => (
            <li
              key={item}
              className="relative pl-[18px] text-[0.86rem] leading-relaxed text-ink-soft before:absolute before:left-0 before:top-[7px] before:h-[7px] before:w-[7px] before:rounded-full before:bg-blue before:content-['']"
            >
              {item}
            </li>
          ))}
        </ul>

        <div className="mb-2.5 font-mono text-[0.72rem] uppercase tracking-[0.1em] text-blue-deep">
          Capabilities we&apos;d draw on
        </div>
        <div className="flex flex-wrap gap-2">
          {capabilities.map((cap) => (
            <Link
              key={cap.slug}
              href={`/capabilities/${cap.slug}`}
              className="inline-flex items-center gap-1.5 rounded-base border border-rule bg-bg-panel px-3 py-1.5 text-[0.84rem] font-medium text-ink transition-colors hover:border-blue hover:text-blue-deep"
            >
              <cap.icon size={14} className="text-blue-deep" aria-hidden="true" />
              {cap.name}
            </Link>
          ))}
        </div>
      </div>

      <p className="mt-5 text-center text-[0.86rem] text-ink-soft">
        These are starting points, not fixed packages — every engagement is
        scoped and quoted to your own requirements.{" "}
        <Link
          href="/capabilities"
          className="font-medium text-blue-deep underline-offset-2 hover:underline"
        >
          See all capabilities
        </Link>
        .
      </p>
    </div>
  );
}
