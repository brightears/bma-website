import fs from 'node:fs';
import path from 'node:path';

const locales = ['en', 'th', 'vi', 'ms', 'id', 'ko', 'ja', 'zh'];
const messagesDirectory = path.resolve('messages');

function flatten(value, currentPath = '', output = new Map()) {
  if (Array.isArray(value)) {
    output.set(currentPath, `array:${value.length}`);
    value.forEach((item, index) => flatten(item, `${currentPath}[${index}]`, output));
    return output;
  }

  if (value && typeof value === 'object') {
    Object.entries(value).forEach(([key, item]) => flatten(item, currentPath ? `${currentPath}.${key}` : key, output));
    return output;
  }

  const placeholders = typeof value === 'string'
    ? [...value.matchAll(/\{([^}]+)\}/g)].map((match) => match[1]).sort().join(',')
    : '';
  output.set(currentPath, `${typeof value}:${placeholders}`);
  return output;
}

const source = flatten(JSON.parse(fs.readFileSync(path.join(messagesDirectory, 'en.json'), 'utf8')));
let failed = false;

for (const locale of locales) {
  const candidate = flatten(JSON.parse(fs.readFileSync(path.join(messagesDirectory, `${locale}.json`), 'utf8')));
  const missing = [...source.keys()].filter((key) => !candidate.has(key));
  const extra = [...candidate.keys()].filter((key) => !source.has(key));
  const mismatched = [...source.keys()].filter((key) => candidate.has(key) && source.get(key) !== candidate.get(key));

  if (missing.length || extra.length || mismatched.length) {
    failed = true;
    console.error(`${locale}: missing=${missing.length}, extra=${extra.length}, shape/placeholders=${mismatched.length}`);
    console.error([...missing, ...extra, ...mismatched].slice(0, 12).join('\n'));
  } else {
    console.log(`${locale}: ${source.size} message paths OK`);
  }
}

if (failed) process.exit(1);
