/**
 * General-purpose site: every page, the homepage included, comes from the
 * tenant's own CMS pages, so a new tenant can publish without a bespoke route.
 * Client-safe; components live in index.ts.
 */
declare const manifest: import("@/lib/themes/define-theme").ThemeManifest;
export default manifest;
