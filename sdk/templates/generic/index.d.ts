import type { TemplateModule } from '@/lib/templates/types';
/**
 * General-purpose site for any tenant. No bespoke routes: `/` and every other
 * path render the tenant's own CMS pages, so the whole site is built from the
 * dashboard. Layout primitives come from the professional parent.
 */
declare const template: TemplateModule;
export default template;
