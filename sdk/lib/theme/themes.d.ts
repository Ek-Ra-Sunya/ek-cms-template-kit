/**
 * Named theme presets for the public site.
 *
 * The backend stores only the key (see ek-cms-backend theme.constants.ts); the
 * values live here, next to the tokens they override, so there is exactly one
 * place holding hexes.
 *
 * Each theme sets ONLY the accent family and surfaces. Type scale, spacing and
 * radii stay shared, so switching theme restyles the site without relaying it
 * out — a tenant cannot accidentally pick a theme that breaks the design.
 *
 * Every accent is checked to >= 4.5:1 for white text (used on filled buttons
 * and the navy panels) and for the accent as body text on white. See
 * `theme-contrast.test.ts`, which fails the build if a future theme is added
 * that does not clear AA.
 */
export declare const THEME_KEYS: readonly ["navy", "emerald", "slate", "plum", "sand"];
export type ThemeKey = (typeof THEME_KEYS)[number];
export declare const DEFAULT_THEME: ThemeKey;
export interface ThemeTokens {
    /** Shown in the superadmin selector. */
    label: string;
    /** One-line description of the intended feel. */
    description: string;
    accent: string;
    accentHover: string;
    accentSubtle: string;
    /** Decorative only: rules and hairlines, never text. */
    gold: string;
    bgSubtle: string;
    text: string;
    textMuted: string;
    border: string;
    borderStrong: string;
}
export declare const THEMES: Record<ThemeKey, ThemeTokens>;
export declare function isThemeKey(value: unknown): value is ThemeKey;
/**
 * Renders a theme as CSS custom properties, overriding the :root defaults.
 *
 * Only the tokens that differ per theme are emitted, so radii, easing and the
 * type scale keep coming from globals.css.
 */
export declare function themeToCssVars(key: ThemeKey): string;
