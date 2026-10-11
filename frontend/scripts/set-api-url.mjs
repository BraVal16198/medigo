import { writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

let apiUrl = (process.env.API_URL || 'http://localhost:8000').trim();
apiUrl = apiUrl.replace(/^['"]|['"]$/g, '');
if (!/^https?:\/\//i.test(apiUrl)) {
  apiUrl = `https://${apiUrl}`;
}
apiUrl = apiUrl.replace(/\/$/, '').replaceAll("'", '');

const file = `export const environment = {
  production: true,
  apiUrl: '${apiUrl}'
};
`;

const target = join(dirname(fileURLToPath(import.meta.url)), '..', 'src', 'environments', 'environment.production.ts');
writeFileSync(target, file);
console.log(`API de produccion: ${apiUrl}`);
