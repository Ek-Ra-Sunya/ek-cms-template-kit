/**
 * The fixed font set. Each key is loaded by next/font in the site layout,
 * which self-hosts the files at build time, so a site never requests a font
 * from a third party. A theme's `font` select and a tenant's custom theme may
 * offer only these keys; validateTheme and the API (custom-theme.dto.ts
 * THEME_FONTS) enforce it.
 */
export declare const FONT_KEYS: readonly ["plus-jakarta-sans", "urbanist", "inter", "dm-sans", "poppins", "lora", "playfair-display", "merriweather"];
export type FontKey = (typeof FONT_KEYS)[number];
export declare const FONT_LABELS: Record<FontKey, string>;
export declare function isFontKey(value: unknown): value is FontKey;
/** The CSS variable next/font binds each face to, set on the site wrapper. */
export declare const fontVar: (key: FontKey) => string;
