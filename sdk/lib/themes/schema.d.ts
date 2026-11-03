/**
 * The fixed set of setting field types a theme may declare. A new type is
 * added here, with its validation, render and form control, never per theme.
 */
type Base = {
    label: string;
    optional?: boolean;
};
export type SettingField = (Base & {
    type: 'preset';
    options: readonly string[];
    default: string;
}) | (Base & {
    type: 'select';
    options: readonly string[];
    default: string;
}) | (Base & {
    type: 'colors';
    keys: readonly string[];
}) | (Base & {
    type: 'boolean';
    default: boolean;
}) | (Base & {
    type: 'text';
    max: number;
    default?: string;
}) | (Base & {
    type: 'number';
    min: number;
    max: number;
    default: number;
}) | (Base & {
    type: 'image';
});
export type SettingsSchema = Record<string, SettingField>;
export type ThemeSettings = Record<string, unknown>;
export declare function isValidSetting(field: SettingField, value: unknown): boolean;
/**
 * The values a site renders with. Per key: the saved value if it still passes
 * its field, else the legacy `settings.theme` (palette only, for the one
 * release before the follow-up migration), else the theme default. A theme
 * update that drops an option or tightens a range therefore never breaks a
 * site: the stale value just resolves to the default.
 */
export declare function resolveSettings(schema: SettingsSchema, saved: ThemeSettings | undefined, legacyPalette?: unknown): ThemeSettings;
/** `settings.themes[name].settings`, or undefined when absent or malformed. */
export declare function savedSettingsFor(themes: unknown, name: string): ThemeSettings | undefined;
export {};
