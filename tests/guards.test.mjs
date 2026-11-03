// The checks EK CMS runs on every push before opening a review PR. Passing
// here means the sync will not reject the push; the review still decides.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { dirname, extname, join, normalize, relative } from 'node:path';

const root = join(import.meta.dirname, '..');
const key = JSON.parse(readFileSync(join(root, 'ek-template.json'), 'utf8')).key;
const surface = JSON.parse(readFileSync(join(root, 'sdk/surface.json'), 'utf8'));
const CODE_EXT = ['.ts', '.tsx', '.css', '.json', '.md'];
const ASSET_EXT = ['.png', '.jpg', '.jpeg', '.webp', '.avif', '.svg', '.gif', '.ico', '.woff2'];
const files = (dir) => existsSync(join(root, dir))
  ? readdirSync(join(root, dir), { recursive: true, withFileTypes: true }).filter((d) => d.isFile()).map((d) => relative(root, join(d.parentPath, d.name)))
  : [];

test('ek-template.json names the manifest key', () => {
  assert.equal(typeof key, 'string');
  assert.match(readFileSync(join(root, 'template/manifest.ts'), 'utf8'), new RegExp(`name:\\s*['"]${key}['"]`));
});

test('template/index.ts and template/manifest.ts exist', () => {
  assert.ok(existsSync(join(root, 'template/index.ts')));
  assert.ok(existsSync(join(root, 'template/manifest.ts')));
});

test('only allowed file types, none over 2 MB', () => {
  for (const f of files('template')) assert.ok([...CODE_EXT, ...ASSET_EXT].includes(extname(f).toLowerCase()), `${f}: file type not allowed`);
  for (const f of files('assets')) assert.ok(ASSET_EXT.includes(extname(f).toLowerCase()), `${f}: assets holds images and fonts only`);
  for (const f of [...files('template'), ...files('assets')]) assert.ok(readFileSync(join(root, f)).length <= 2 * 1024 * 1024, `${f}: larger than 2 MB`);
});

test('imports stay inside the template, generic and the sdk', () => {
  const gap = String.raw`(?:\s|\/\*[\s\S]*?\*\/|\/\/[^\n]*\n)*`;
  const re = new RegExp(String.raw`(?:\bfrom|\bimport\s*\(|\bimport|\brequire\s*\()${gap}['"\x60]([^'"\x60]+)['"\x60]`, 'g');
  const within = (p, folder) => p === folder || p.startsWith(`${folder}/`);
  for (const f of files('template').filter((x) => /\.(ts|tsx)$/.test(x))) {
    for (const [, spec] of readFileSync(join(root, f), 'utf8').matchAll(re)) {
      assert.ok(!spec.includes('\\'), `${f}: "${spec}" contains an escape`);
      if (spec.startsWith('.')) {
        assert.ok(within(normalize(join(dirname(f), spec)), 'template'), `${f}: "${spec}" leaves the template folder`);
      } else if (spec.startsWith('@/')) {
        const ok = !spec.split('/').some((s) => s === '.' || s === '..') &&
          (within(spec, `@/templates/${key}`) || within(spec, '@/templates/generic') || surface.includes(spec));
        assert.ok(ok, `${f}: "${spec}" is outside the template SDK`);
      }
    }
  }
});

test('theme.css rules are scoped to this template', () => {
  const css = readFileSync(join(root, 'template/theme.css'), 'utf8').replace(/\/\*[\s\S]*?\*\//g, '');
  for (const sel of css.matchAll(/([^{}]+)\{/g)) {
    const s = sel[1].trim();
    if (s.startsWith('@')) continue;
    for (const part of s.split(',')) assert.ok(part.trim().startsWith(`[data-template="${key}"]`), `theme.css: "${part.trim()}" is not scoped`);
  }
});
