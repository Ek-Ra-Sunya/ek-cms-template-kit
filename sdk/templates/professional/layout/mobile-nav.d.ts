import type { NavItem } from "@/lib/content/types";
/**
 * The desktop nav is `hidden md:flex`, so without this the site had no
 * navigation at all below 768px. AntD's Drawer already handles focus trapping
 * and Escape, so this only owns open state and closing on navigation.
 */
export declare function MobileNav({ items }: {
    items: NavItem[];
}): import("react").JSX.Element;
