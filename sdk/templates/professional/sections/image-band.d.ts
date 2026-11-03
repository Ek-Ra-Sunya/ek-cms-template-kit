/**
 * Full-bleed photographic band for mid-page breaks, with optional overlaid
 * copy. Gives long pages a visual pause between prose blocks.
 *
 * Height is fixed per breakpoint so the band reserves its space before the
 * image loads and never shifts the page (CLS).
 */
export declare function ImageBand({ src, alt, heading, body, }: {
    src: string;
    alt?: string;
    heading?: string;
    body?: string;
}): import("react").JSX.Element;
