import { type ThemeKey } from "./themes";
import { type CustomTheme } from "@/lib/themes/custom-theme";
export type SiteConfig = {
    theme: ThemeKey;
    allowRegistration: boolean;
    modules: string[];
    /** settings.themes: saved settings per theme, read by the site layout. */
    themes: Record<string, unknown>;
    /** settings.customTheme, re-validated here; null when absent or malformed. */
    customTheme: CustomTheme | null;
};
export declare function getSiteConfig({ live, nav, }?: {
    live?: boolean;
    nav?: boolean;
}): Promise<SiteConfig>;
/**
 * The look fields of a site-config payload, narrowed. Shared with the kit
 * preview, whose verify response carries the same three fields.
 */
export declare function lookFields(data: {
    theme?: unknown;
    themes?: unknown;
    customTheme?: unknown;
}): Pick<SiteConfig, "theme" | "themes" | "customTheme">;
/**
 * Whether a feature module is enabled for this tenant.
 *
 * Pass `live: true` for access decisions (a route that should 404), matching
 * the register-page precedent: a cached value would leave a route open or shut
 * for up to 10 minutes after the toggle.
 */
export declare function isModuleEnabled(key: string, opts?: {
    live?: boolean;
}): Promise<boolean>;
/** Convenience wrapper for the layout, which only needs the theme. */
export declare function getTheme(): Promise<ThemeKey>;
