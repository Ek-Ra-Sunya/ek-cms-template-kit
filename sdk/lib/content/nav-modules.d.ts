/** The module gating this href, or null when it is always available. */
export declare function moduleForHref(href: string): string | null;
/** Whether a nav entry should be rendered, given the tenant's enabled modules. */
export declare function navHref(href: string, modules: string[]): boolean;
