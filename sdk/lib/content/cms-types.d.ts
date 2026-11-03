import type { PageLayout } from "@/builder/layout";
/**
 * Shapes returned by the CMS's public content endpoints.
 *
 * Section `data` is free-form JSONB authored in the dashboard, so it is typed
 * as an open record and read through the narrowing helpers in `cms-read.ts`
 * rather than trusted field-by-field. `presentationType` is the CMS's hint for
 * which component renders the section (e.g. "welcome-letter", "gallery-strip").
 */
export interface CmsPage {
    id: string;
    title: string;
    slug: string;
    showInMenu?: boolean;
    /** Published page builder layout. When set it replaces the page's sections. */
    layout?: PageLayout | null;
    createdAt?: string;
    updatedAt?: string;
}
export interface CmsSection {
    id: string;
    pageId: string;
    /** Coarse kind: hero | text | gallery | collection | services | cta | testimonials | faq | contact */
    type: string;
    order: number;
    data: CmsSectionData;
}
/**
 * A form definition authored in the CMS. `fields` is editor-authored JSONB, so
 * it is read defensively (see `toFormFields`) rather than trusted element-wise.
 */
export interface CmsForm {
    id: string;
    name: string;
    description?: string | null;
    status?: string;
    type?: string;
    fields?: unknown[];
    successMessage?: string | null;
    submitButtonLabel?: string | null;
    /** Turnstile site key for this tenant, or null when bot verification is off. Public by design. */
    turnstileSiteKey?: string | null;
}
export interface CmsSectionData {
    /** Which component should render this section. */
    presentationType?: string;
    /** Editor-facing label, not rendered. */
    name?: string;
    [key: string]: unknown;
}
