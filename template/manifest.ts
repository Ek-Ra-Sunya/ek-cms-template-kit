import { defineTheme } from '@/lib/themes/define-theme';

/**
 * Your template's registry key goes in `name`. It must equal the key in
 * ../ek-template.json and the `data-template` selectors in theme.css. We give
 * you the key when we register the template.
 */
const manifest = defineTheme({
  name: 'my-site',
  label: 'My site',
  description: 'A site built on the EK CMS generic template.',
  version: '1.0.0',
  extends: 'generic',
  visibility: 'client',
  routes: [],
  settings: {
    palette: { type: 'preset', label: 'Colour scheme', options: ['navy'], default: 'navy' },
  },
});

export default manifest;
