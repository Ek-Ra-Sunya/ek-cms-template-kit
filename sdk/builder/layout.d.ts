/**
 * Page builder layout: sections > columns > widgets, stored on the page as
 * `layout` (live) and `layoutDraft` (the editor's working copy).
 *
 * The backend validates every value against a whitelist
 * (ek-cms-backend src/common/content/page-layout.ts). The rules for style
 * values are repeated here because they go straight into a stylesheet: a
 * value that fails is dropped rather than trusted. Change both together.
 */
export declare const BREAKPOINTS: readonly ["desktop", "tablet", "mobile"];
export type Breakpoint = (typeof BREAKPOINTS)[number];
/** Upper bound of each narrower breakpoint, desktop first. */
export declare const BREAKPOINT_MAX: Record<Exclude<Breakpoint, 'desktop'>, number>;
export type StyleValues = Record<string, string | boolean>;
export type NodeStyle = Partial<Record<Breakpoint, StyleValues>>;
export type WidgetType = 'heading' | 'text' | 'image' | 'button' | 'spacer' | 'divider' | 'block' | 'nav-menu' | 'site-logo' | 'social-icons' | 'icon' | 'video';
/** Networks a `social-icons` widget links to, each a setting holding the profile URL. */
export declare const SOCIAL_NETWORKS: readonly ["facebook", "instagram", "x", "linkedin", "youtube", "tiktok", "whatsapp"];
/** Hosts a `video` widget may embed. Matches the backend's VIDEO_HOSTS. */
export declare const VIDEO_HOSTS: string[];
/**
 * The embed URL for a YouTube or Vimeo link, or null for anything else.
 * Built from the parsed id, so the iframe never loads the stored URL itself.
 */
export declare function videoEmbedUrl(url: unknown): string | null;
/** Legacy section types a `block` widget can be; its data follows that section type's schema. */
export declare const BLOCK_TYPES: readonly ["hero", "text", "gallery", "collection", "services", "cta", "testimonials", "faq", "contact", "form"];
export interface WidgetNode {
    id: string;
    kind: 'widget';
    widget: WidgetType;
    settings: Record<string, string | boolean>;
    /** A `block` widget's section data. */
    data?: Record<string, unknown>;
    style?: NodeStyle;
}
export interface ColumnNode {
    id: string;
    kind: 'column';
    style?: NodeStyle;
    children: WidgetNode[];
}
export interface SectionNode {
    id: string;
    kind: 'section';
    settings: {
        width?: 'boxed' | 'full';
        sticky?: boolean;
    };
    style?: NodeStyle;
    children: ColumnNode[];
}
export interface PageLayout {
    version: 1;
    sections: SectionNode[];
}
/** Links: http(s), mailto, tel, same-site paths and anchors. */
export declare const HREF: RegExp;
/** Style key -> the pattern its value must match. `hidden` is a boolean and handled apart. */
export declare const STYLE_RULES: Record<string, RegExp>;
export declare const isSafeHref: (v: unknown) => v is string;
export declare const isSafeSrc: (v: unknown) => v is string;
type NodeKind = (SectionNode | ColumnNode | WidgetNode)['kind'];
/** CSS declarations for one breakpoint's values. Unknown keys and unsafe values are dropped. */
export declare function declarations(values: StyleValues | undefined, kind?: NodeKind, editing?: boolean): string;
export declare const selectorOf: (id: string) => string;
/**
 * The stylesheet for a layout: desktop rules first, then tablet and mobile
 * overrides in max-width media queries, each scoped to its node by id.
 * The editor canvas and the public page both render this same string, except
 * that `editing` dims hidden nodes rather than removing them.
 */
export declare function compileLayoutCss(layout: PageLayout, editing?: boolean): string;
export {};
