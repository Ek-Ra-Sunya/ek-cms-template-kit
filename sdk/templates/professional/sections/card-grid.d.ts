import { type ReactNode } from "react";
/**
 * Grid of cards, the shape services/industries/people/insights all share.
 *
 * Staggering lives here rather than at each call site so every grid on the site
 * animates identically and no page can forget it. RevealItem must wrap each
 * child directly for the stagger variants to reach it.
 */
export declare function CardGrid({ children, columns, }: {
    children: ReactNode;
    columns?: string;
}): import("react").JSX.Element;
/**
 * Card with a top accent rule that fills in on hover.
 *
 * Existing props are unchanged so every current call site (services, insights,
 * people) keeps working; `index` is optional and only adds the numeral used on
 * the services grid.
 */
export declare function Card({ title, eyebrow, index, id, image, href, children, className, }: {
    title: string;
    eyebrow?: string;
    index?: number;
    /** Anchor target, so mega-menu deep links (/industries#energy) land here. */
    id?: string;
    /** Optional cover image. Fixed aspect ratio so the grid never shifts. */
    image?: string;
    /**
     * Makes the whole card clickable via a stretched overlay link.
     *
     * The overlay is a single real anchor wrapping the title, so the card has one
     * accessible name and one tab stop. Any other link inside the card must sit
     * above it (`relative z-10`) or it becomes unclickable and, worse, invisible
     * to keyboard users who would land on the overlay instead.
     */
    href?: string;
    children?: ReactNode;
    className?: string;
}): import("react").JSX.Element;
