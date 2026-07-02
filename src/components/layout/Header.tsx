"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Logo } from "./Logo";
import { ButtonLink } from "@/components/ui/Button";
import { mainNav } from "@/data/site";

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-rule bg-bg/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1180px] items-center justify-between px-5 py-[18px] sm:px-8">
        <Logo priority />

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {mainNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-[0.92rem] text-ink-soft transition-colors hover:text-blue-deep"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <ButtonLink href="/contact">Talk to Us</ButtonLink>
        </div>

        <button
          type="button"
          className="-mr-2 inline-flex items-center justify-center p-2 text-ink md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <nav
          className="border-t border-rule bg-bg px-5 py-4 md:hidden"
          aria-label="Mobile"
        >
          <ul className="flex flex-col gap-1">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="block rounded-base px-2 py-2.5 text-ink-soft transition-colors hover:bg-bg-panel hover:text-blue-deep"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="mt-2">
              <ButtonLink
                href="/contact"
                className="w-full"
              >
                Get a quote
              </ButtonLink>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
