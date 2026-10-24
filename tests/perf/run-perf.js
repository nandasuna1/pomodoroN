import { spawnSync } from 'node:child_process';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const directory = dirname(fileURLToPath(import.meta.url));
const jest = resolve(directory, '../../node_modules/jest/bin/jest.js');
const result = spawnSync(process.execPath, [jest, 'tests/perf', '--runInBand'], {
  stdio: 'inherit'
});

if (result.error) throw result.error;
process.exitCode = result.status ?? 1;
