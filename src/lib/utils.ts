/**
 * Join class names, dropping falsy values. A tiny dependency-free helper so
 * components can compose conditional Tailwind classes cleanly.
 */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}
