/**
 * Codec for the `{"items":[...]}` envelope that tenant sites store inside a
 * testimonials section's `body`.
 *
 * Same root cause as page-text-envelope.ts: `TestimonialsSectionData` declares
 * singular `quote`/`author`/`ratingText` and no array, so a tenant wanting
 * SEVERAL testimonials in one section had nowhere to put them. `body` is
 * declared as a string, so the list was serialized into it.
 *
 * The stored shape, and the item keys the public renderer reads:
 *
 *   body: JSON.stringify({ items: [{ name, role, quote, mediaId, imageUrl }] })
 *
 * This dashboard edited `body` as a plain textarea, so opening such a section
 * showed raw JSON and saving wrote it back as literal prose — the same
 * corruption the page-text codec fixes, on a smaller surface.
 *
 * KEY NAMES MATTER. The public renderer resolves each item as
 * `quote ?? testimonial`, `name ?? author`, `role ?? body ?? description`.
 * The first name in each pair is what the tenant's own editor writes, so that
 * is what this writes too: an item saved from here must render identically to
 * one saved from there.
 */
export interface TestimonialItem {
    name: string;
    role: string;
    quote: string;
    /** Carried through untouched — nothing in this dashboard edits it yet. */
    mediaId: string;
    imageUrl: string;
}
export interface DecodedTestimonials {
    items: TestimonialItem[];
    /** True when `body` really held an envelope — the signal to re-encode on save. */
    isEnvelope: boolean;
}
/** Reads `body` into a list of testimonials, or reports that it isn't an envelope. */
export declare function decodeTestimonials(body: unknown): DecodedTestimonials;
/**
 * Builds the envelope string to store back in `body`.
 *
 * Drops entries that carry no content at all, matching the tenant renderer,
 * which discards an item with no quote/body/author/image anyway — keeping one
 * would persist a row that can never render.
 */
export declare function encodeTestimonials(items: TestimonialItem[]): string;
