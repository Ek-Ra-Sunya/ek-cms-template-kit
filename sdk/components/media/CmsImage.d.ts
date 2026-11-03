import { type ImageProps } from 'next/image';
/**
 * True for a URL served by the tenant media route.
 *
 * Exported so the sitemap of render sites is not the only place this rule
 * lives; anything deciding how to render a CMS asset asks here.
 */
export declare function isCmsMediaSrc(src: ImageProps['src']): boolean;
/**
 * next/image, with optimization switched off for CMS media only.
 *
 * The image optimizer CANNOT read /media/<key>. For a relative `url` it does
 * not make an HTTP request: it invokes the matching route in-process against a
 * mocked response and reads the buffers written to it. That works for a static
 * file in public/ and fails for a dynamic route handler, which writes nothing
 * the mock captures -- so every CMS image came back 400, `"url" parameter is
 * valid but internal response is invalid`. Verified against a local build:
 * /media/... through the optimizer is a 400 while the same route fetched
 * directly returns the real bytes, and a static asset optimizes fine.
 *
 * Streaming instead of redirecting did not help, nor did buffering the body
 * first; the mocked-response path simply does not carry a route handler's
 * output. The Next docs point the same way, recommending `unoptimized` for any
 * src that needs authentication -- which is exactly what a presigned key is.
 *
 * Scoped to /media/ rather than set globally in next.config, because a global
 * `unoptimized: true` would also stop optimizing the bundled template assets,
 * which the optimizer handles perfectly well. The tradeoff is per-URL, so the
 * decision is too.
 *
 * Not a quality loss in practice: R2 serves the original bytes, the route
 * marks them immutable, and images are uploaded through the CMS at sane sizes.
 * What is lost is per-breakpoint resizing and AVIF/WebP conversion for CMS
 * media. If that starts to matter, the fix is a real image CDN in front of R2
 * (a Cloudflare Images / resizing worker on the tenant's public base URL), not
 * making the in-process optimizer read a route it cannot read.
 */
export declare function CmsImage(props: ImageProps): import("react").JSX.Element;
