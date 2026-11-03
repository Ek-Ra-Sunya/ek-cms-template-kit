import type { ComponentType } from 'react';
import type { Metadata } from 'next';
/**
 * What a template declares about itself.
 *
 * `typed` names existing backend Nest modules (treks, bookings). A template
 * may reference one; it may not invent one, and validate.ts fails the build
 * if it names a module the backend does not own.
 *
 * `collections` declares generic jsonb-backed content the template needs.
 * These require no backend deploy.
 */
export interface TemplateManifest {
    /**
     * Registry key ("professional-snepal"), the same string tenants.template
     * stores and TEMPLATES is keyed by. The display label lives on
     * ThemeManifest.label.
     */
    name: string;
    /** Parent template name. Omitted by a parent; required by a child. */
    extends?: string;
    typed?: string[];
    collections?: Record<string, {
        fields: string[];
    }>;
    routes: string[];
    themes: string[];
}
/**
 * A template's code. Components are looked up by key so a child can override
 * one without re-exporting the parent's whole surface.
 *
 * Route components are registered under `route:<pathname>` and their page
 * metadata under the same pathname in `meta`, so a child can override either
 * independently.
 */
export interface TemplateModule {
    manifest: TemplateManifest;
    components: Record<string, ComponentType<Record<string, unknown>>>;
    /**
     * Per-route page metadata, keyed by pathname or route pattern.
     *
     * A plain object covers a static route. A dynamic route registers a
     * FUNCTION of the matched params instead, because its metadata depends on
     * the record being rendered: /insights/[slug] needs that article's own
     * title, description, canonical and OpenGraph, not the pattern's.
     *
     * Registering a static object for a dynamic route is legal and means "every
     * instance shares this", which is a real SEO regression on an indexed site,
     * so prefer the function form wherever the source route had a
     * generateMetadata.
     */
    meta?: Record<string, TemplateMeta>;
    /**
     * Site-wide metadata for every page this template renders: the title
     * template, description, metadataBase, default OpenGraph and Twitter cards.
     *
     * The source sites carried this on their own root layout. Here the root
     * layout belongs to the CMS dashboard and says title "EK CMS" with
     * robots noindex, so without this a client's homepage renders as "EK CMS"
     * with no social tags at all, and every other page loses its brand suffix.
     */
    siteMeta?: Metadata;
    /** Exact-path 308s for a site's legacy URLs, matched case-sensitively. */
    redirects?: Record<string, string>;
    /** next/font variable classes the template binds on its site root. */
    rootClassName?: string;
    /** Concrete paths of the template's dynamic routes, for the sitemap. */
    sitemapPaths?: () => Promise<string[]>;
}
/**
 * A route's metadata: a fixed object for a static route, or a function of the
 * matched params for a dynamic route whose metadata depends on the record
 * being rendered.
 */
export type TemplateMeta = ((params: Record<string, string>) => Metadata | Promise<Metadata>) | Metadata;
/** A template with its parent chain already flattened. */
export interface ResolvedTemplate {
    name: string;
    manifest: TemplateManifest;
    routes: string[];
    themes: string[];
    component(key: string): ComponentType<Record<string, unknown>> | undefined;
    siteMeta: Metadata | undefined;
    meta(pathname: string, params?: Record<string, string>): Promise<Metadata> | Metadata | undefined;
    matchRoute(pathname: string): {
        pattern: string;
        params: Record<string, string>;
    } | null;
    redirect(pathname: string): string | null;
    rootClassName: string | undefined;
    sitemapPaths: (() => Promise<string[]>) | undefined;
}
