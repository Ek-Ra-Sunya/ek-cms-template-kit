/**
 * Rewrites expiring presigned R2 URLs into permanent same-origin ones.
 *
 * The API resolves stored media keys into presigned URLs that are valid for an
 * hour. Rendering those directly puts a credential with an expiry inside a
 * document that outlives it - a cached page, an open tab, a browser image
 * cache - so the image 403s and shows broken until a reload. See
 * src/app/media/[...key]/route.ts for the full timeline.
 *
 * Applied to the parsed payload as it enters, so callers keep working with
 * plain URL strings and no renderer has to know media can expire. The route
 * mints a fresh signature per request.
 */
/** The stable, non-expiring address for a media object key. */
export declare function stableMediaUrl(url: string): string;
/**
 * Deep-clones `value`, replacing every presigned R2 URL with its stable form.
 *
 * Walks the whole payload rather than named image fields: section `data` is
 * free-form JSONB, so which keys hold media differs per section type and per
 * tenant, and a field list would silently miss the next one an editor adds.
 * Non-string leaves are returned as-is.
 */
export declare function withStableMediaUrls<T>(value: T): T;
