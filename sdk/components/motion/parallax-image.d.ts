/**
 * Background image that drifts slightly slower than the page scroll.
 *
 * Per the frontend SOP (section 20):
 * - Gated on `matchMedia('(prefers-reduced-motion: reduce)')`, checked at
 *   runtime. A CSS media query cannot stop this: the transform is written
 *   inline from JS.
 * - Only `transform` is animated, so no layout is triggered.
 * - The scroll listener is passive and does nothing but store a value; the
 *   actual write happens inside requestAnimationFrame, so we never do layout
 *   reads and writes in the scroll handler itself.
 *
 * The image is deliberately over-sized (`-inset-y-[15%]`) so drifting it never
 * exposes an empty edge at the top or bottom of the container.
 */
export declare function ParallaxImage({ src, alt, priority, sizes, 
/** Fraction of scroll distance the image moves. Keep small; >0.3 reads cheap. */
strength, className, }: {
    src: string;
    alt?: string;
    priority?: boolean;
    sizes?: string;
    strength?: number;
    className?: string;
}): import("react").JSX.Element;
