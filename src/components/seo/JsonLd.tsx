/**
 * Renders a JSON-LD structured-data block. Server-rendered into the initial
 * HTML so crawlers and answer engines read it without executing JavaScript.
 */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      // Structured data is built from our own typed data, not user input.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
