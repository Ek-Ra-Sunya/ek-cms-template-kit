import { getHomePage } from '@/lib/content/cms-home';
import { PageSections } from '@/templates/generic/sections/page-sections';

/** `/`: the tenant's `home` page, rendered with the generic section blocks under your own intro. */
export default async function HomePage() {
  const home = await getHomePage();
  return (
    <main>
      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
        <h1 className="text-3xl font-semibold text-foreground">{home?.page.title || 'Coming soon'}</h1>
      </section>
      {home?.sections.length ? <PageSections sections={home.sections} /> : null}
    </main>
  );
}
