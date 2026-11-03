import type { Insight } from "@/lib/content/types";
/**
 * Blog posts, same fallback shape as `getPageContent`: CMS first, `fallback`
 * when the API is unreachable or a post is missing the fields this site
 * renders. `fallback` is a parameter rather than a bundled-JSON import: this
 * module is shared across every tenant, and bundled posts.json is one
 * tenant's content, supplied by its own route.
 *
 * Fetches with a bare `fetch()` rather than `posts-api.ts`/`http.ts` on
 * purpose: the axios clients in `lib/api/http.ts` throw at module load when
 * `NEXT_PUBLIC_API_BASE` is unset, which defeats the "renders with no
 * .env.local" requirement every other public page meets via `cms.ts`'s
 * bare-fetch + early-return pattern.
 */
export declare function getInsights(fallback: Insight[], template: string): Promise<Insight[]>;
/**
 * One post, by the slug its URL carries.
 *
 * Asks the API for that post directly rather than filtering the list: the
 * list read fetches up to 100 posts to render one, and deliberately carries
 * no resolved SEO, so metadata had to be rebuilt from raw fields by every
 * frontend separately. The single read returns it already resolved.
 *
 * Falls back to the list on any miss, which covers both a tenant whose API
 * predates the endpoint and a post that only exists in bundled content.
 */
export declare function getInsight(slug: string, fallback: Insight[], template: string): Promise<Insight | undefined>;
/**
 * Narrows the CMS's `seo` block rather than trusting its presence.
 *
 * A truthiness check passes any object, so a partial or garbled response
 * reaches the metadata builder and emits `title: undefined` - an empty
 * <title> on a public page, which is worse than the title this would
 * otherwise derive from the post itself. `title` and `noindex` are the two
 * fields every consumer reads, so their presence is what makes it usable.
 */
export declare function asResolvedSeo(value: unknown): Insight["seo"] | undefined;
