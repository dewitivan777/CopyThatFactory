import { siteConfig } from "@/data/site";

/** Official WhatsApp glyph, inlined as SVG so we don't need a brand-icon dependency. */
export function WhatsAppIcon({
  size = 28,
  className,
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M16.004 0C7.163 0 0 7.163 0 16.004c0 2.822.738 5.577 2.14 8.003L0 32l8.187-2.108a15.93 15.93 0 0 0 7.817 2.05h.006c8.841 0 16.004-7.163 16.004-16.004 0-4.274-1.665-8.29-4.688-11.313A15.9 15.9 0 0 0 16.004 0Zm0 29.276h-.005a13.24 13.24 0 0 1-6.752-1.849l-.485-.288-4.858 1.251 1.297-4.738-.316-.486a13.26 13.26 0 0 1-2.033-7.162c0-7.33 5.966-13.296 13.302-13.296 3.552 0 6.888 1.384 9.396 3.895a13.2 13.2 0 0 1 3.897 9.407c0 7.33-5.966 13.266-13.443 13.266Zm7.29-9.943c-.4-.2-2.365-1.167-2.732-1.3-.366-.134-.633-.2-.9.2-.267.4-1.033 1.3-1.267 1.567-.233.267-.467.3-.867.1-.4-.2-1.688-.622-3.216-1.982-1.189-1.06-1.991-2.368-2.225-2.768-.233-.4-.025-.617.175-.817.18-.179.4-.467.6-.7.2-.234.267-.4.4-.667.133-.267.067-.5-.033-.7-.1-.2-.9-2.17-1.233-2.972-.325-.782-.655-.676-.9-.688a17.65 17.65 0 0 0-.767-.014c-.267 0-.7.1-1.067.5-.367.4-1.4 1.367-1.4 3.334s1.434 3.867 1.634 4.134c.2.267 2.822 4.31 6.837 6.043.955.412 1.7.658 2.28.843.958.305 1.83.262 2.518.159.768-.115 2.365-.967 2.699-1.9.333-.933.333-1.733.233-1.9-.1-.167-.367-.267-.767-.467Z" />
    </svg>
  );
}

/**
 * Site-wide floating "chat on WhatsApp" button. Fixed to the bottom-right
 * corner and offset above the reCAPTCHA v3 badge (which docks at the same
 * corner, ~14px from each edge, once it's lazy-loaded on the contact form),
 * so the two never overlap.
 */
export function WhatsAppButton() {
  return (
    <a
      href={siteConfig.whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Chat with us on WhatsApp: ${siteConfig.whatsapp}`}
      title="Chat with us on WhatsApp"
      className="fixed right-4 bottom-24 z-40 flex size-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_4px_14px_rgba(0,0,0,0.2)] transition-transform duration-150 hover:scale-105 cursor-butterfly sm:right-5"
    >
      <WhatsAppIcon size={28} />
    </a>
  );
}
