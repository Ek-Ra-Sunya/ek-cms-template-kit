import { type ReactNode } from "react";
/**
 * Adds a shadow and a slight surface shift once the page is scrolled, so the
 * sticky header separates from content instead of floating flat over it.
 *
 * Listener is passive and only flips a boolean, so it does not force layout on
 * scroll. No reduced-motion gate needed: the change is a CSS transition on
 * box-shadow, which the transition rules below already handle, and there is no
 * transform involved.
 */
export declare function HeaderShell({ children }: {
    children: ReactNode;
}): import("react").JSX.Element;
