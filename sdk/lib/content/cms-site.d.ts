import type { SiteConfig, Service, Industry } from "@/lib/content/types";
/** Homepage credential tile. Not in the bundled JSON, so it has its own default. */
export interface Credential {
    value: string;
    label: string;
}
/**
 * Site-wide config: identity, contact, navigation, credential tiles.
 *
 * The CMS record starts empty, so every field falls back to `fallback`
 * individually rather than all-or-nothing. That way a tenant who has filled in
 * only their phone number gets their phone number plus the shipped navigation,
 * instead of losing the nav until they re-enter it.
 *
 * `fallback` is a parameter, not a bundled-JSON import: this module is shared
 * across every tenant, and the bundled site.json is one tenant's (Snepal's)
 * content. That fallback data lives with the professional-snepal child
 * template, whose route supplies it here.
 */
export declare function getSiteConfig(fallback: SiteConfig): Promise<SiteConfig & {
    credentials: Credential[];
}>;
/**
 * @param template registry name, used to namespace legacy `/images/...` refs
 *                 onto this deployment's per-template asset directory.
 */
export declare function getCmsServices(fallback: Service[], template: string): Promise<Service[]>;
export declare function getCmsIndustries(fallback: Industry[]): Promise<Industry[]>;
