/**
 * The header proxy.ts stamps the tenant's HOST onto when it rewrites a public
 * domain into the /s tree.
 *
 * The host rather than the schema id, because resolving one to the other is
 * IO and the Next 16 docs rule that out in Proxy. Internal: proxy.ts sets it
 * on every such request, overwriting anything that arrived from outside, so a
 * client cannot spoof it to read another tenant's content.
 */
export declare const TENANT_HOST_HEADER = "x-ek-tenant-host";
/**
 * The path the request originally asked for, before proxy.ts rewrote it onto
 * a tree. The /s layout needs it to hand an admin domain over to /t at the
 * SAME path: without it the redirect drops everything after the host and
 * /login lands on the dashboard root.
 */
export declare const TENANT_PATH_HEADER = "x-ek-tenant-path";
/**
 * Caches which tree a tenant host belongs to, so the proxy can REWRITE
 * straight to it instead of bouncing the browser through a redirect.
 *
 * Only the first request per host pays the handover. After that the proxy
 * reads this and serves /t/<host> internally, so the address bar keeps the
 * clean URL a white-label admin panel is supposed to show, rather than
 * exposing /t/<host>/login.
 *
 * Value is the host itself, and the proxy compares it against the request's
 * own Host, so a cookie minted for one domain does nothing on another. The
 * worst a stale one can do is route to a tree the layout then corrects.
 */
export declare const TENANT_TREE_COOKIE = "ek-tenant-tree";
/**
 * Runs `fn` with the tenant bound explicitly.
 *
 * Covers only what `fn` itself awaits. A layout CANNOT use this to scope its
 * `children`: those are already-created React elements that Next renders
 * later, outside this callback, so the page would run with no tenant at all.
 * That is exactly how every route came to 500 with "called outside a tenant
 * request scope" while the unit tests, tsc and the build were all green.
 *
 * Mainly for tests and self-contained async blocks. A real request resolves
 * its tenant from the host header instead, which works at any depth.
 */
export declare function runWithTenant<T>(siteId: string, fn: () => T): T;
/**
 * The current tenant's schema id, for use as `x-site-id` on every CMS read.
 *
 * Prefers an explicit `runWithTenant` scope, then falls back to resolving the
 * host header proxy.ts stamped on the request. The header is what makes this
 * work across component boundaries: `headers()` is Next's own per-request API,
 * readable from any server component however deeply nested, whereas an
 * AsyncLocalStorage scope opened in a layout does not extend to the page.
 *
 * Throws rather than returning a default. There is no safe fallback tenant:
 * guessing serves the wrong client's content, so an unresolvable tenant must
 * surface loudly rather than silently rendering someone else's site.
 */
export declare function currentSiteId(): Promise<string>;
/**
 * The origin the visitor actually asked for, e.g. `https://acme.com`.
 *
 * Every canonical, og:url and JSON-LD `@id` has to be absolute against THIS
 * host rather than a stored primary domain. A tenant reachable on two domains
 * (a custom domain and the platform subdomain) would otherwise emit canonicals
 * pointing at the other one, which a crawler reads as a redirect chain and
 * which splits the ranking across both.
 *
 * Falls back to the raw Host header when the tenant header is absent, so the
 * routes that bypass proxy.ts - /sitemap.xml, /robots.txt, /llms.txt, all
 * excluded by the file-extension rule in its matcher - still resolve an origin.
 *
 * https, always: these URLs are published, and every tenant domain is served
 * over TLS behind Cloudflare. Emitting an http canonical would advertise the
 * pre-redirect URL as the canonical one.
 */
export declare function currentOrigin(): Promise<string | null>;
