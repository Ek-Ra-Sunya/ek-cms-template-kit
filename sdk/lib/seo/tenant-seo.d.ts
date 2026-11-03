/**
 * Site-wide SEO/GEO settings for the current tenant.
 *
 * Mirrors the backend's SiteSeo. Everything is optional: an unset field means
 * "derive it", never "emit an empty tag".
 */
export interface TenantSeo {
    titleSuffix?: string;
    metaDescription?: string;
    ogImage?: string;
    /**
     * Keeps the WHOLE site out of search results while still serving it.
     *
     * The case this exists for is a staging or beta host that is registered as a
     * real tenant domain and therefore fully indexable, while the client's live
     * site is still served elsewhere. Two indexed sites for one brand split the
     * ranking between them, and the staging copy sometimes wins.
     */
    noindex?: boolean;
    /**
     * Forces the canonical for every page onto another origin.
     *
     * Only for a host that genuinely duplicates a site that lives somewhere else
     * - a beta domain shadowing a live one. Setting it on a site that IS the real
     * one points every page away from itself and removes it from search, so it is
     * off unless a tenant deliberately sets it.
     */
    canonicalUrl?: string;
    organizationType?: string;
    organizationDescription?: string;
    knowsAbout?: string[];
    areaServed?: string[];
    sameAs?: string[];
    addressLocality?: string;
    addressRegion?: string;
    postalCode?: string;
    addressCountry?: string;
    latitude?: number;
    longitude?: number;
    twitterHandle?: string;
    fbAppId?: string;
    googleSiteVerification?: string;
    bingSiteVerification?: string;
    allowAiCrawlers?: boolean;
}
export interface TenantSeoContext {
    /** Origin of the host the visitor actually used, e.g. https://acme.com. */
    origin: string;
    siteName: string;
    seo: TenantSeo;
    tagline: string | null;
    address: string | null;
    phones: string[];
    emails: string[];
    social: string[];
    logoUrl: string | null;
}
/**
 * Everything needed to build this tenant's metadata and structured data.
 *
 * Returns null when there is no tenant context or the CMS is unreachable, and
 * every caller treats that as "emit nothing extra" rather than falling back to
 * a default identity. There is no safe default here: the previous shared
 * module's constants were one client's facts, so a fallback would publish that
 * client's identity on someone else's domain.
 */
export declare function getTenantSeo(): Promise<TenantSeoContext | null>;
/**
 * Site-wide SEO settings for a schema the caller already resolved.
 *
 * For the routes that bypass proxy.ts and therefore have no tenant header:
 * /robots.txt and /llms.txt both do their own resolve-domain lookup and hold
 * the schema, so they pass it here rather than going through currentSiteId(),
 * which would throw.
 *
 * Fails soft to null. robots.txt in particular must still be served when the
 * CMS is unreachable: no answer means "fall back to the default rules", never
 * an error page where a crawler expects crawl rules.
 */
export declare function tenantSeoForSchema(schemaName: string): Promise<TenantSeo | null>;
/**
 * Makes a possibly-relative URL absolute.
 *
 * Structured data and OpenGraph both require absolute URLs: a crawler reading
 * "/media/tenant/x/logo.png" has no origin to resolve it against, so the
 * property is silently dropped.
 */
export declare function absolutise(url: string, origin: string): string;
