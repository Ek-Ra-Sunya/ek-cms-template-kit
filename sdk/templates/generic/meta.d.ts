import type { Metadata } from 'next';
/** A dispatcher pathname ("/about") as the CMS stores the slug ("about"). */
export declare const slugOf: (path: string) => string;
export declare function homeMeta(): Promise<Metadata>;
export declare function cmsPageMeta({ path }: Record<string, string>): Promise<Metadata>;
