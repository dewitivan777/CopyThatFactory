"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Replaces the static butterfly cursor on buttons with a wing-flapping monarch
 * that follows the pointer. Progressive enhancement only: it activates for fine
 * pointers (mouse) and bows out on touch devices, where the CSS fallback cursor
 * applies instead. Reduced-motion users get the butterfly without the flapping.
 */
export function ButterflyCursor() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;

    setEnabled(true);
    document.documentElement.classList.add("has-animated-cursor");

    let raf = 0;
    let x = -100;
    let y = -100;
    const apply = () => {
      raf = 0;
      if (wrapRef.current) {
        wrapRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      }
    };

    const onMove = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
      if (!raf) raf = requestAnimationFrame(apply);
      const target = e.target as Element | null;
      const over = !!target?.closest?.(".cursor-butterfly:not(:disabled)");
      setVisible((prev) => (prev === over ? prev : over));
    };
    const onLeave = () => setVisible(false);

    document.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    window.addEventListener("blur", onLeave);

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("blur", onLeave);
      if (raf) cancelAnimationFrame(raf);
      document.documentElement.classList.remove("has-animated-cursor");
    };
  }, []);

  if (!enabled) return null;

  return (
    <div
      ref={wrapRef}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[9999]"
      style={{ opacity: visible ? 1 : 0, transition: "opacity 120ms ease-out" }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element -- tiny decorative cursor sprite */}
      <img
        src="/butterfly-fly.webp"
        alt=""
        width={36}
        height={32}
        className="butterfly-cursor-img"
        style={{ marginLeft: -18, marginTop: -16, display: "block" }}
      />
    </div>
  );
}
