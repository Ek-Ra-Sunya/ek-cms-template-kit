/**
 * Headers for a server-side read of the current tenant's public content.
 *
 * The render key tells the API this read comes from our own renderer, so it
 * does not need the tenant's API key. PLATFORM_RENDER_KEY has no NEXT_PUBLIC_
 * prefix, so Next never inlines it into a client bundle: imported from the
 * browser, this reads undefined and sends only x-site-id.
 */
export declare function cmsReadHeaders(siteId: string): Record<string, string>;
