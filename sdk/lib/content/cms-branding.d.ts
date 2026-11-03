export interface Branding {
    logoUrl: string | null;
    logoWhiteUrl: string | null;
    faviconUrl: string | null;
}
/**
 * Tenant branding from the EK CMS public tenant lookup (managed on the
 * dashboard's Branding screen): color logo for light surfaces, white logo for
 * the navy footer, favicon. The API resolves stored media fileKeys to
 * presigned URLs per read; the 10-minute cache here stays safely under their
 * 1-hour expiry, and the revalidate webhook purges on edit anyway. Callers
 * fall back to the bundled /images assets when a slot is unset or the API is
 * unreachable - the site must render without the CMS.
 */
export declare function getBranding(): Promise<Branding>;
