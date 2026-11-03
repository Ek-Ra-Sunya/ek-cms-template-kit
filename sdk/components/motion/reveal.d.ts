import type { ReactNode } from "react";
/**
 * Scroll-triggered reveal. Fades and rises content as it enters the viewport.
 *
 * Per the frontend SOP (section 20):
 * - Gated on `useReducedMotion`. A CSS media query does NOT stop Framer Motion,
 *   which writes inline transforms, so the gate has to be explicit here.
 * - Animates transform/opacity only, so it never triggers layout.
 * - `once: true` so content does not re-animate every time it scrolls past.
 *
 * Do NOT wrap the hero heading in this: it is the LCP element, and animating it
 * from opacity 0 delays LCP.
 */
export declare function Reveal({ children, delay, className, }: {
    children: ReactNode;
    delay?: number;
    className?: string;
}): import("react").JSX.Element;
/**
 * Staggers direct children as the group enters view, so a grid resolves as a
 * sequence rather than a single flash.
 */
export declare function RevealGroup({ children, className, stagger, }: {
    children: ReactNode;
    className?: string;
    stagger?: number;
}): import("react").JSX.Element;
/** A single item inside a RevealGroup. */
export declare function RevealItem({ children, className, }: {
    children: ReactNode;
    className?: string;
}): import("react").JSX.Element;
