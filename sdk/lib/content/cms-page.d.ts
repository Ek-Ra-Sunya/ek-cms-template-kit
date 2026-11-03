import type { CollectionSection, PageContent } from "@/lib/content/types";
import { itemStr } from "./cms-read";
import type { CmsSection } from "./cms-types";
/**
 * Maps a CMS page onto the `PageContent` shape the interior pages already
 * render (hero eyebrow/title/intro + alternating text sections), so every
 * standard page becomes CMS-driven without each route growing its own mapping.
 *
 * Falls back to `fallback` whenever the CMS is unreachable or returns nothing
 * usable, so a CMS outage degrades to the previous content instead of an empty
 * page. `fallback` is a parameter rather than a bundled-JSON import: this
 * module is shared across every tenant, and each tenant's bundled pages/*.json
 * is that tenant's own content, supplied by its own route (which is also the
 * only place that knows whether the slug even has a bundled counterpart).
 */
export declare function getPageContent(slug: string, fallback: PageContent, template: string): Promise<PageContent>;
/**
 * Same mapping as `getPageContent`, for a slug that has NO bundled JSON: a page
 * an editor created in the dashboard, served by the `[...slug]` catch-all. A
 * CMS-authored page has no bundled fallback, so `null` - a 404 - is the honest
 * answer when the CMS has nothing usable.
 */
export declare function getCmsOnlyPageContent(slug: string, template: string): Promise<PageContent | null>;
/**
 * Which live list a "collection" section pulls from.
 *
 * The section editor is gaining an explicit `source` field, so that wins when
 * present. Live sections seeded before that field existed (e.g.
 * /about/our-leaders' "people" section) carry only a label/name and no
 * `source`, so this falls back to sniffing the editor-facing label/name and
 * `presentationType` for a people/team keyword. "unknown" means a source this
 * site cannot serve; the renderer's job is to render nothing for it rather
 * than guess further.
 */
export declare function toCollectionSection(section: CmsSection): CollectionSection;
/** Hero copy for pages whose body is rendered by a bespoke component. */
export declare function getPageHero(slug: string, fallback: {
    eyebrow?: string;
    title: string;
    intro?: string;
}): Promise<{
    eyebrow: string;
    title: string;
    intro: string;
    sections: CmsSection[];
}>;
export { itemStr };
