import type { TemplateModule } from '@/lib/templates/types';
import manifest from './manifest';
import HomePage from './routes/home';

type C = TemplateModule['components'][string];

/**
 * Extends `generic`: header, footer and every CMS page come from the parent.
 * Register a component here only to override one, keyed like the parent's
 * ('site-header', 'site-footer', 'cms-page', 'route:/').
 */
const template: TemplateModule = {
  manifest,
  components: {
    'route:/': HomePage as C,
  },
};

export default template;
