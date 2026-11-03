/**
 * WCAG 2.x contrast. Shared by the Customizer (rejects a custom colour as the
 * admin types it), schema validation (rejects one on render) and the preset
 * palette test, so the three can never disagree about what passes.
 */
export declare const AA = 4.5;
/** Ratio of two #rrggbb colours, 1 to 21. Order does not matter. */
export declare function contrastRatio(a: string, b: string): number;
/**
 * Custom brand colours are used as filled surfaces under white text (buttons,
 * panels), so that is the pair checked. Returns one message per failing key,
 * worded for the form: which colour, what it scored, what it needs.
 */
export declare function contrastFailures(colors: Record<string, string>): string[];
