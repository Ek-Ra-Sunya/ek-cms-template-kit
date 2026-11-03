import { type FontKey } from './fonts';
/**
 * A tenant's own look, layered over the preset palette (settings.customTheme).
 * The API validates the same rules (custom-theme.dto.ts); they are repeated
 * here so an import reports every field error before anything is sent.
 */
export declare const COLOR_TOKENS: readonly ["primary", "accent", "background", "surface", "text", "muted"];
export type ColorToken = (typeof COLOR_TOKENS)[number];
export declare const RADII: readonly ["none", "sm", "md", "lg", "full"];
export type Radius = (typeof RADII)[number];
export interface CustomThemeTokens extends Partial<Record<ColorToken, string>> {
    headingFont?: FontKey;
    bodyFont?: FontKey;
    radius?: Radius;
}
export interface CustomTheme {
    name?: string;
    tokens: CustomThemeTokens;
    customCss?: string;
}
/**
 * The file the dashboard exports and imports. `preset` carries the base the
 * tokens sit on, so colours inherited from it survive the round trip; files
 * from before it was added import without one and keep the editor's preset.
 */
export interface ThemeFile extends CustomTheme {
    version: 1;
    preset?: string;
}
export declare const CUSTOM_CSS_MAX_BYTES: number;
/** Mirrors customCssViolation in the API; null when the CSS is acceptable. */
export declare function customCssViolation(css: string): string | null;
export type FieldErrors = Record<string, string>;
/**
 * Parses an imported file. Returns the theme, or every field error keyed by
 * its path (tokens.primary, customCss, ...), so the editor can show them all.
 */
export declare function parseThemeFile(text: string): {
    theme: CustomTheme;
    preset?: string;
} | {
    errors: FieldErrors;
};
export declare function toThemeFile(theme: CustomTheme, preset?: string): ThemeFile;
/**
 * Tokens -> CSS custom properties for the site wrapper's inline style, which
 * beats each template's scoped theme.css. Names are the template tokens
 * (theme.css), so every component already reading them repaints.
 */
export declare function customThemeStyle(tokens: CustomThemeTokens | undefined): Record<string, string>;
/**
 * The site wrapper's variables for a tenant that has a custom theme: the
 * preset's colour as the primary, then the tenant's tokens over it. Tenants
 * without one get nothing, so their sites keep the template's own palette
 * (render.ts keeps the preset attribute-only for the same reason).
 */
export declare function siteThemeStyle(preset: string, custom: CustomTheme | null | undefined): Record<string, string>;
/** The attribute the site wrapper carries; custom CSS is scoped to it. */
export declare const SITE_ROOT_ATTR = "data-site-root";
/**
 * The stylesheet text for the site's <style> tag: the heading font rule plus
 * the tenant's CSS inside `@scope ([data-site-root])`. Unlike nesting, where
 * a rule starting with a combinator (`~ footer`) becomes `& ~ footer` and
 * reaches the root's siblings, @scope stops every selector at the root, and
 * bare declarations still apply to the root itself. customCssViolation
 * refuses what would end the block early (stray braces). The CSS only ever
 * renders on the tenant's own site either way. `<` is escaped to its CSS form, so no input can close
 * the tag whatever the API let through.
 */
export declare function customThemeCss(theme: CustomTheme | null | undefined): string;
