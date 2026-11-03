/** Valid E.164, or a valid Nepali local number saved before the selector existed. */
export declare function isValidPhone(value: string): boolean;
/** E.164 for any parseable stored value (local values read as Nepali), else undefined. */
export declare function toE164(value?: string | null): string | undefined;
/** Readable international form for display ("+977 980 1234567"); invalid values pass through. */
export declare function formatPhone(value: string): string;
