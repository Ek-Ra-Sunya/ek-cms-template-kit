import type { CmsSectionData } from "./cms-types";
/**
 * Narrowing helpers for CMS section data.
 *
 * `data` is free-form JSONB an editor can reshape at any time, so nothing in it
 * is guaranteed. Every read goes through these so a missing or mistyped field
 * degrades to a fallback instead of throwing in a server component and blanking
 * the page.
 */
export declare function str(data: CmsSectionData | undefined, key: string, fallback?: string): string;
export declare function bool(data: CmsSectionData | undefined, key: string, fallback?: boolean): boolean;
export declare function arr(data: CmsSectionData | undefined, key: string): unknown[];
/** Reads the first key that holds a non-empty array (the CMS duplicates some lists). */
export declare function firstArr(data: CmsSectionData | undefined, ...keys: string[]): unknown[];
/** Reads the first key that holds a non-empty string. */
export declare function firstStr(data: CmsSectionData | undefined, ...keys: string[]): string;
export declare function isRecord(v: unknown): v is Record<string, unknown>;
/** Reads a string field off an unknown array element. */
export declare function itemStr(item: unknown, key: string, fallback?: string): string;
export declare function itemNum(item: unknown, key: string, fallback?: number): number;
/** Reads a string array field off an unknown array element. */
export declare function itemStrArr(item: unknown, key: string): string[];
/**
 * Picks an image URL off an item, tolerating the different key names the CMS
 * uses across section types (`src`, `url`, `image`, `imageUrl`).
 */
export declare function itemImage(item: unknown, ...extraKeys: string[]): string;
