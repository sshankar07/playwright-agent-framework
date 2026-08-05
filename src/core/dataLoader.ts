import fs from 'node:fs/promises';
import path from 'node:path';
import type { EnvName } from '../types/environment';
import type { TestDataBundle } from '../types/testData';

const cache = new Map<string, TestDataBundle>();

export async function loadTestData(env: EnvName): Promise<TestDataBundle> {
  const key = env;
  if (cache.has(key)) return cache.get(key)!;

  const filePath = path.join(process.cwd(), 'src', 'data', `testData.${env}.json`);
  try {
    const raw = await fs.readFile(filePath, 'utf-8');
    const parsed = JSON.parse(raw) as TestDataBundle;
    cache.set(key, parsed);
    return parsed;
  } catch {
    const empty: TestDataBundle = { users: [] };
    cache.set(key, empty);
    return empty;
  }
}
