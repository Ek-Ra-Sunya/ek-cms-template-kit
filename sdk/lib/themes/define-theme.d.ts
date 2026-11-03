import type { TemplateManifest } from '@/lib/templates/types';
import type { SettingsSchema } from './schema';
export type ThemeVisibility = 'general' | 'client';
/** What a theme author writes in manifest.ts. */
export interface ThemeDefinition {
    /** Stable registry key, stored in tenants.template. Never a display label. */
    name: string;
    label: string;
    description: string;
    version: string;
    /** Public path to a card image. Cards fall back to palette swatches. */
    screenshot?: string;
    extends?: string;
    visibility: ThemeVisibility;
    /** Tenant slugs that may use a `client` theme. */
    clients?: string[];
    requiresModules?: string[];
    supportsModules?: string[];
    typed?: string[];
    collections?: Record<string, {
        fields: string[];
    }>;
    routes: string[];
    sections?: Record<string, {
        variants?: string[];
    }>;
    menus?: string[];
    settings: SettingsSchema;
}
/**
 * A TemplateManifest, so resolve.ts, templateThemes() and validateManifest()
 * keep working, plus every theme field with its defaults filled in.
 */
export interface ThemeManifest extends TemplateManifest {
    label: string;
    description: string;
    version: string;
    screenshot?: string;
    visibility: ThemeVisibility;
    clients: string[];
    requiresModules: string[];
    supportsModules: string[];
    sections: Record<string, {
        variants?: string[];
    }>;
    menus: string[];
    settings: SettingsSchema;
}
export declare function defineTheme(def: ThemeDefinition): ThemeManifest;
