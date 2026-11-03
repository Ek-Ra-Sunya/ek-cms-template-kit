import type { Metadata } from "next";
/**
 * SEO the backend already resolved: overrides applied, then the entity's own
 * content, then the site-wide defaults. Mirrors ResolvedSeo in
 * ek-cms-backend/src/common/content/seo-resolver.ts.
 */
export interface ResolvedSeo {
    title: string;
    description?: string;
    canonicalUrl?: string;
    /** A media key or an absolute URL. Keys are resolved to a stable URL below. */
    ogImage?: string;
    ogImageAlt?: string;
    noindex: boolean;
    excludeFromSitemap: boolean;
}
export interface ToMetadataOptions {
    siteName: string;
    /** og:locale, e.g. "en_AU". Differs per tenant, so it is not derivable here. */
    locale?: string;
    /** "article" for a post, "website" for a page. */
    type?: "article" | "website";
    /** ISO date for og:article:published_time. */
    publishedTime?: string;
    /** Absolute origin, for turning a media key into a fetchable image URL. */
    origin?: string;
    /** Base of the CMS API, which serves the stable image route. */
    apiBase?: string;
}
/**
 * Maps resolved SEO onto Next's Metadata.
 *
 * Deliberately branchless beyond presence checks: everything that needed a
 * decision was decided server-side, in one place, so six frontends cannot
 * drift into explaining the same post differently.
 *
 * `openGraph` is emitted whole every time. Next merges metadata SHALLOWLY -
 * "duplicate keys are replaced based on their ordering" - so a page-level
 * openGraph REPLACES the layout's outright rather than filling gaps in it.
 * Returning a partial one here would silently drop the site name and image
 * from every share card. Since the backend always resolves a complete set,
 * no caller can construct a partial one by accident.
 */
export declare function toMetadata(seo: ResolvedSeo, opts: ToMetadataOptions): Metadata;
