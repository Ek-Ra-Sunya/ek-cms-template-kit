export interface TenantTemplate {
    template: string;
    /** The tenant's schema id, used as the x-site-id header on every CMS call. */
    schemaName: string;
}
/** What a host resolves to, before deciding which tree serves it. */
export interface ResolvedHost {
    /**
     * Which of the tenant's domains matched: 'admin' serves the CMS dashboard,
     * anything else serves the public website. Null when the stored domain has
     * no type recorded, which is treated as public rather than assumed admin.
     */
    domainType: string | null;
    /**
     * The tenant's own public hostname, which is where a 'redirect' domain sends
     * visitors. Null when no primary is flagged, and the redirect is then skipped
     * rather than guessed: bouncing to the wrong host is worse than serving here.
     */
    primaryDomain: string | null;
    template: string | null;
    schemaName: string;
    tenantName: string | null;
    /**
     * 'active' or 'suspended'. Nothing else reaches here: an unknown host, and a
     * tenant still provisioning or failed, all 404 and resolve to null.
     */
    status: string;
    /** Why the tenant is suspended. Null unless status is 'suspended'. */
    suspensionReason: string | null;
    /**
     * Public site only. A tenant in maintenance can still reach its admin
     * dashboard, which is where the window gets ended.
     */
    maintenanceMode: boolean;
    maintenanceMessage: string | null;
}
/**
 * The template and tenant id for the host, from GET /public/resolve-domain.
 *
 * That endpoint returns { slug, schemaName, tenantName, logoUrl, logoWhiteUrl,
 * faviconUrl, primaryDomain, turnstileSiteKey, loginBackgroundUrl, template }.
 *
 * It does NOT return `theme`. Theme lives on GET /site-config, which needs an
 * x-site-id header carrying the schemaName that only this call provides, so it
 * is a second, later request wired up alongside the ported get-theme.ts.
 * Reading data.theme here returned undefined on every request and painted
 * every tenant with the default palette while type-checking clean.
 *
 * `schemaName` is captured even though this function's own caller does not use
 * it yet: it becomes the x-site-id for every CMS read, and taking it from a
 * call already being made avoids a second round trip.
 *
 * Returns null on every failure path -- unknown host, no template set,
 * unreachable API -- and the caller renders a 404. There is deliberately no
 * fallback template: substituting one would serve another client's design on
 * this client's domain.
 *
 * Reads `data.template`, not `body.template`. Every API response here is
 * wrapped in { status, statusCode, message, data }, and reading the top level
 * returns undefined on every request -- the bug that silently hid every
 * optional module from the sidebar once already.
 */
export declare function fetchTenantTemplate(host: string): Promise<TenantTemplate | null>;
/**
 * Resolves a host to its tenant WITHOUT requiring a template.
 *
 * Separate from fetchTenantTemplate because the two answer different
 * questions: this one asks "whose domain is this, and which tree does it
 * serve", which must succeed for an admin domain that has no public template
 * at all. Returns null only when the host belongs to no active tenant.
 */
export declare function resolveHost(host: string): Promise<ResolvedHost | null>;
