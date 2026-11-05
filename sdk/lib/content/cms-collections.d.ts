/** A published entry of a custom collection. `data` follows the collection's schema. */
export interface CollectionEntry {
    id: string;
    slug: string;
    data: Record<string, unknown>;
}
/**
 * Published entries of the current tenant's collection `slug`, in editor order.
 * [] when the collection does not exist or the API is unreachable.
 */
export declare function getCollectionEntries(slug: string): Promise<CollectionEntry[]>;
/** One published entry by its slug, or null (unknown, draft, or API unreachable). */
export declare function getCollectionEntry(slug: string, entrySlug: string): Promise<CollectionEntry | null>;
