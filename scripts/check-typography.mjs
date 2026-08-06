import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';

const roots = [
  'app/[locale]',
  'components/home',
  'components/sections',
  'components/legal',
];

async function collectTsx(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = await Promise.all(entries.map(async (entry) => {
    const target = path.join(directory, entry.name);
    if (entry.isDirectory()) return collectTsx(target);
    return entry.isFile() && entry.name.endsWith('.tsx') ? [target] : [];
  }));
  return files.flat();
}

const files = (await Promise.all(roots.map(collectTsx))).flat();
const failures = [];

for (const file of files) {
  const source = await readFile(file, 'utf8');
  const headings = source.match(/<h[12]\b[^>]*>/gs) ?? [];

  for (const heading of headings) {
    if (heading.startsWith('<h1') && !heading.includes('bma-page-title')) {
      failures.push(`${file}: public h1 must use bma-page-title`);
    }

    if (/text-\[clamp|text-(?:[3-9]xl)/.test(heading)) {
      failures.push(`${file}: h1/h2 must use a semantic BMAsia typography class, not a page-specific size`);
    }
  }
}

if (failures.length > 0) {
  console.error(failures.join('\n'));
  process.exit(1);
}

console.log(`Typography check passed across ${files.length} public TSX files.`);
