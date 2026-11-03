import type { CmsForm, CmsPage, CmsSection } from "./cms-types";
import type { PageLayout } from "@/builder/layout";
/**
 * How long a rendered page may serve cached CMS content.
 *
 * Capped below the 1h expiry of the presigned image URLs the API embeds in
 * section data: if we cached a page for longer than its image links live, the
 * HTML would outlive its own images and render broken. Editors also see changes
 * within this window without a redeploy.
 */
export declare const CMS_REVALIDATE_SECONDS = 600;
export declare function getCmsPage(slug: string): Promise<CmsPage | null>;
/**
 * Published pages for the current tenant (anonymous reads never see drafts).
 * ponytail: first 100 only; a tenant past that needs pagination here.
 */
export declare function listCmsPages(): Promise<CmsPage[]>;
/** Sections for a page, ordered as the CMS orders them. */
export declare function getCmsSections(pageId: string): Promise<CmsSection[]>;
/**
 * Page + ordered sections in one call. Returns `null` when the page is absent
 * or the CMS is down, which is the signal for a route to render its bundled
 * fallback content instead of an error.
 */
export declare function getCmsPageWithSections(slug: string): Promise<{
    page: CmsPage;
    sections: CmsSection[];
} | null>;
/**
 * The form an editor attached to a page section, or null when none is.
 *
 * Not cached for as long as page content: a form's fields are what a visitor
 * is about to submit against, so a stale definition means submissions recorded
 * under fields the editor has already removed.
 */
export declare function getCmsFormBySection(sectionId: string): Promise<CmsForm | null>;
/** Looks up one section by its `presentationType` (the CMS's component hint). */
export declare function findSection(sections: CmsSection[], presentationType: string): CmsSection | undefined;
/** A header or footer built in the page builder. */
export interface CmsSitePart {
    kind: "header" | "footer";
    layout: PageLayout;
}
/**
 * Published builder header and footer, keyed by kind. Empty when the tenant
 * has published none or the CMS is unreachable, so the template's own header
 * and footer render.
 */
export declare function getSiteParts(): Promise<Partial<Record<CmsSitePart["kind"], PageLayout>>>;
