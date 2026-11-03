import type { NavItem } from "@/lib/content/types";
/**
 * Merges the collection into a dropdown and orders the result by the display
 * order set on the collection itself.
 *
 * Menu Items is a separate CMS module from services/industries, so an entry
 * exists in two places with two independent orders. Concatenating the lists -
 * curated items in menu order, then the rest in collection order - meant the
 * two never interleaved: Banking & Financial Services sits at collection order
 * 1 but rendered 12th, after all eleven curated items. QA asked for the list to
 * follow the order number, which is what this does.
 *
 * `entries` arrives already sorted by the API (`order ASC, name ASC`), so its
 * index IS the intended position. Curated items the collection does not know
 * about - "All services", a hand-added external link - have no such index and
 * keep their menu order, anchored to the item they currently follow, so an
 * editor's own arrangement is preserved rather than dropped to the bottom.
 *
 * Labels stay whatever the editor curated: an entry already linked is matched
 * by href and left alone, only repositioned.
 */
export declare function withCollectionEntries(items: NavItem[], entries: NavItem[]): NavItem[];
/** Header/mega-menu nav; `fallback` is the site_config/site.json chain. */
export declare function getCmsNav(fallback: NavItem[], collections?: {
    services?: NavItem[];
    industries?: NavItem[];
}): Promise<NavItem[]>;
export interface SocialLink {
    platform: string;
    url: string;
}
export interface FooterColumn {
    title: string;
    items: NavItem[];
    /** Social profiles from the footer's bottom bar. Empty when none are set. */
    socialLinks: SocialLink[];
}
/**
 * Footer link column and social profiles from the CMS footer module (the
 * dashboard's "Footer" screen). The layout renders a single "Explore" column,
 * so this returns the first section; `fallback` is the
 * site_config.footerNav/site.json chain.
 */
export declare function getCmsFooterColumn(fallback: NavItem[]): Promise<FooterColumn>;
