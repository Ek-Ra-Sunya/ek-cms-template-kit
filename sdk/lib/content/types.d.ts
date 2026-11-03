import type { ResolvedSeo } from "@/lib/seo/to-metadata";
export interface PageSection {
    heading: string;
    body: string[];
    image?: string;
}
/**
 * A CMS "form" section: an editor added a form block to the page. The form
 * itself is fetched by section id at render time, so which form appears (and
 * what fields it has) is content, not code.
 */
export interface FormSection {
    id: string;
    eyebrow?: string;
    heading?: string;
    aside?: string;
    /** CTA rendered under the form. Both halves are required to show one. */
    ctaLabel?: string;
    ctaHref?: string;
}
/**
 * A CMS "collection" section: an editor dropped a live-data grid (team,
 * services, ...) onto the page rather than authoring it as body copy. `source`
 * says which CMS-backed list to render; the section carries no items of its
 * own.
 */
export interface CollectionSection {
    id: string;
    source: "team" | "services" | "industries" | "posts" | "unknown";
}
export interface PageContent {
    eyebrow: string;
    title: string;
    intro: string;
    /** Hero background. CMS `imageKey` on the hero section overrides this. */
    heroImage?: string;
    sections: PageSection[];
    /**
     * Form sections on this page, in CMS order. Optional because the bundled
     * JSON fallbacks predate forms and never carry any; `getPage` normalises it
     * to an empty array, so renderers can map over it unconditionally.
     */
    formSections?: FormSection[];
    /** Collection sections on this page, in CMS order. Same optionality as `formSections`. */
    collectionSections?: CollectionSection[];
}
/** A sub-service under a top-level service. Rendered on the parent's page, not its own route. */
export interface SubService {
    slug: string;
    name: string;
    tagline: string;
    description: string[];
}
export interface Service {
    slug: string;
    name: string;
    tagline: string;
    description: string[];
    icon?: string;
    image?: string;
    children?: SubService[];
}
export interface Industry {
    slug: string;
    name: string;
    description: string;
    icon?: string;
}
export interface Person {
    name: string;
    role: string;
    credentials?: string;
    photo?: string;
    linkedin?: string;
    /** Short card summary. The full profile lives in `profile`. */
    bio?: string;
    /** URL segment for /about/our-leaders/[slug]. Derived from the name when absent. */
    slug?: string;
    /** Long-form profile body. A person without one has no detail page. */
    profile?: string[];
    /** Career milestones, professional bodies, recognition. */
    highlights?: {
        label: string;
        value: string;
    }[];
    /** Per-person social profiles. Rendered only where set. */
    social?: {
        platform: string;
        url: string;
    }[];
}
export interface Insight {
    slug: string;
    title: string;
    date: string;
    excerpt: string;
    body: string[];
    image?: string;
    /** What the cover image shows. Absent when nobody has described it. */
    imageAlt?: string;
    /**
     * Metadata the backend resolved for this post. Present only on a
     * single-post read: a list renders cards, not <head>.
     */
    seo?: ResolvedSeo;
}
/** A nav entry. `children` turns the entry into a mega-menu panel. */
export interface NavItem {
    label: string;
    href: string;
    description?: string;
    children?: NavItem[];
}
export interface SiteConfig {
    name: string;
    tagline: string;
    phones: string[];
    emails: string[];
    address: string;
    hours: {
        days: string;
        time: string;
    }[];
    social: {
        platform: string;
        url: string;
    }[];
    nav: NavItem[];
    footerNav: NavItem[];
}
