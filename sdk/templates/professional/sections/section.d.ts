import type { ReactNode } from "react";
/**
 * Standard max-width padded wrapper for every section on the site.
 *
 * `tone` gives a long page its rhythm through alternating white / muted / navy
 * bands, where a hairline rule would just read as one continuous column.
 *
 * `eyebrow` renders a pill badge rather than an underlined uppercase label,
 * matching the reference design. `asideHeading` switches to the reference's
 * asymmetric two-column intro: the badge and heading sit left, the supporting
 * copy right, instead of stacking centred.
 */
export declare function Section({ heading, eyebrow, aside, tone, children, className, }: {
    heading?: string;
    eyebrow?: string;
    /** Supporting copy placed in a right-hand column beside the heading. */
    aside?: string;
    tone?: "default" | "muted" | "primary";
    children: ReactNode;
    className?: string;
}): import("react").JSX.Element;
