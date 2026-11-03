/**
 * Codec for the `page-text` envelope that tenant sites store inside a text
 * section's `body`.
 *
 * WHY AN ENVELOPE EXISTS AT ALL
 * -----------------------------
 * `TextSectionData` is validated with `whitelist + forbidNonWhitelisted`, so a
 * key it doesn't declare 422s the whole save. The tenant sites needed per
 * section layout/image settings the DTO never declared, so rather than extend
 * it they serialized those settings — together with the prose — into `body`,
 * which IS declared (as `string | string[]`). nyadhahomes-frontend says so
 * outright in src/lib/cms/page-text-content.ts:5-6: "Keep presentation
 * settings in the existing body field... This avoids sending unsupported new
 * fields to the strict text DTO."
 *
 * The stored shape (nyadhahomes-frontend/src/lib/validations/section.schema.ts:1032-1044):
 *
 *   body: JSON.stringify({
 *     kind: "page-text", version: 1,
 *     paragraphs: string[], layout, mediaId, imageKey, imageAlt,
 *   })
 *
 * WHY THIS FILE EXISTS
 * --------------------
 * This dashboard edited `body` as a plain textarea, so opening such a section
 * showed the raw JSON, and saving wrote that JSON back as literal prose —
 * destroying the settings and burying `{"kind":"page-text"...}` in the page's
 * visible text. This module is the boundary that stops that: decode on load,
 * edit prose as prose, re-encode on save with the settings carried through
 * untouched.
 *
 * ROUND-TRIP RULES, taken from the tenant reader/writer so a save from here
 * is byte-comparable with a save from the tenant's own admin:
 * - Paragraphs split on BLANK lines only (/\n\s*\n/). Single newlines are
 *   significant — they carry the `##` headings and `-` bullets that
 *   page-text-blocks.ts parses — so they must survive inside a paragraph.
 * - Settings absent from the envelope keep their documented defaults
 *   (layout "alternating", the rest ""), never `undefined`, because the
 *   tenant writer always emits all five keys.
 * - Anything that is not a valid page-text envelope is left ALONE: plain
 *   prose stays plain prose. Legacy sections that never used an envelope must
 *   not gain one just by being opened.
 */
/** Settings the envelope carries alongside the prose. */
export interface PageTextSettings {
    layout: 'alternating' | 'stacked';
    mediaId: string;
    imageKey: string;
    imageAlt: string;
}
export interface DecodedPageText {
    /** Prose as the editor shows it: paragraphs joined by a blank line. */
    text: string;
    settings: PageTextSettings;
    /** True when `body` really held an envelope — the signal to re-encode on save. */
    isEnvelope: boolean;
}
export declare const DEFAULT_PAGE_TEXT_SETTINGS: PageTextSettings;
/**
 * Reads `body` (the raw section field) into prose + settings.
 *
 * Mirrors readPageTextContent in the tenant repos, including its fallbacks:
 * an array body is paragraphs already, and a plain string is plain prose.
 */
export declare function decodePageText(body: unknown): DecodedPageText;
/**
 * Builds the envelope string to store back in `body`.
 *
 * Splits on blank lines ONLY: single newlines stay inside the paragraph so
 * headings and bullet runs keep working (page-text-blocks.ts re-splits on
 * \n when it renders).
 */
export declare function encodePageText(text: string, settings: PageTextSettings): string;
