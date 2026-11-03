/**
 * Maps a CMS image ref onto something this deployment can actually serve.
 *
 * Every client that used to have its own repo stored image paths rooted at the
 * domain: `/images/bna-hero.jpg` resolved because that repo's `public/images/`
 * sat at the site root. On the shared deployment those files are namespaced per
 * template (`public/templates/professional-bna/images/`), because `logo.png`,
 * `logo-icon.png` and `logo-white.png` collide across clients. The stored paths
 * were never rewritten, so seeded rows still point at the old location.
 *
 * That is data, not code: six BNA services came back with `/images/*.jpg`, and
 * every one 400'd through `/_next/image` ("The requested resource isn't a valid
 * image") because nothing is mounted there. The hero, the six service cards and
 * the band images were all blank on a live client site.
 *
 * Rewriting on read rather than migrating the rows keeps the two deployment
 * shapes working at once: the standalone repos still serve `/images/...`
 * unchanged, and this one serves the same content from its namespaced copy.
 *
 * ponytail: a one-way mapping for LEGACY seeded paths only. Anything an editor
 * uploads today arrives as a `tenant/<schema>/...` fileKey that the API
 * presigns into an absolute URL, which is returned untouched below.
 */
/** Where a template's own static assets live under public/. */
export declare function templateAssetRoot(template: string): string;
/**
 * Rewrites one stored path. The single rewrite rule; everything else here
 * routes through it.
 *
 * Applies to any CMS-sourced path, not just the `image`/`imageUrl` pair that
 * `renderableImage` handles: the page hero arrives as `imageKey`, text
 * sections as `image`, and posts as `coverImage`, each read by a different
 * accessor. The hero is the largest image on the page and reached the browser
 * completely unrewritten, so covering only the tidy case would have left it
 * broken.
 *
 * @param path      stored path, possibly empty
 * @param template  registry name, e.g. "professional-bna"
 */
export declare function legacyAssetPath(path: string, template: string): string;
export declare function legacyAssetPath(path: string | undefined, template: string): string | undefined;
/**
 * The URL to render for a stored image ref, or undefined when there is none
 * worth rendering.
 *
 * @param row       the CMS record, which may carry a raw `image` ref and/or an
 *                  API-resolved `imageUrl`
 * @param template  registry name of the template being rendered, e.g.
 *                  "professional-bna"
 */
export declare function renderableImage(row: {
    image?: string;
    imageUrl?: string;
}, template: string): string | undefined;
