import type { CmsPage, CmsSection } from "./cms-types";
/**
 * Which published page is the homepage.
 *
 * The backend has no home flag on pages, so slug `home` is the convention an
 * editor follows; without one, the first page the tenant created stands in so
 * a brand-new site never shows a blank `/` once it has any content at all.
 */
export declare function pickHomePage(pages: CmsPage[]): CmsPage | null;
/** The homepage with its ordered sections, or null when the tenant has no published page. */
export declare function getHomePage(): Promise<{
    page: CmsPage;
    sections: CmsSection[];
} | null>;
