// Royal Tach SEO integrity check — no network calls or website changes.
import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
const source = join(root, 'index.html');
const output = join(root, 'dist');
const errors = [];
const warnings = [];
const read = (path) => existsSync(path) ? readFileSync(path, 'utf8') : null;
const html = read(source);
if (!html) errors.push('index.html missing');
const canonical = html?.match(/<link\s+rel="canonical"\s+href="([^"]+)"/i)?.[1];
if (!canonical) errors.push('Canonical URL missing');
if (!/<meta\s+name="description"\s+content="[^"]+"/i.test(html || '')) errors.push('Meta description missing');
if (!/<html\s+lang="en"/i.test(html || '')) warnings.push('Review HTML language');
const sitemap = read(join(root, 'public/sitemap.xml'));
const robots = read(join(root, 'public/robots.txt'));
if (!sitemap) errors.push('public/sitemap.xml missing');
if (!robots) errors.push('public/robots.txt missing');
if (canonical && sitemap && !sitemap.includes('<loc>' + canonical + '</loc>')) errors.push('Canonical URL absent from sitemap');
if (canonical && robots && !robots.includes('Sitemap: ' + new URL('sitemap.xml', canonical).href)) errors.push('Robots sitemap URL differs from canonical host');
if (robots && /Disallow:\s*\//i.test(robots)) warnings.push('Review Disallow rules');
for (const name of ['index.html', 'robots.txt', 'sitemap.xml']) {
  if (existsSync(output) && !existsSync(join(output, name))) errors.push('Build output missing ' + name);
}
if (!existsSync(output)) warnings.push('dist/ not found: run npm run build before checking deployment assets');
for (const x of warnings) console.warn('WARN:', x);
for (const x of errors) console.error('FAIL:', x);
if (errors.length) process.exitCode = 1;
else console.log('PASS: Basic SEO source and build-file consistency checks');
