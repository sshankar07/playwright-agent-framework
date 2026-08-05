import { test as base, expect as baseExpect } from '@playwright/test';
import { EnvContext, createEnvContext } from './envContext';
import { TestDataBundle } from '../types/testData';
import { loadTestData } from './dataLoader';
import { createMysqlClient, MysqlClient } from './mysqlClient';
import { Logger, createLogger } from './logger';

export type CoreFixtures = {
  envContext: EnvContext;
  testData: TestDataBundle;
  mysql: MysqlClient;
  logger: Logger;
};

export const test = base.extend<CoreFixtures>({
  envContext: async ({}, use) => {
    const ctx = createEnvContext();
    await use(ctx);
  },
  testData: async ({ envContext }, use) => {
    const data = await loadTestData(envContext.envName);
    await use(data);
  },
  mysql: async ({}, use) => {
    const client = await createMysqlClient();
    await use(client);
    await client.close();
  },
  logger: async ({}, use) => {
    const logger = createLogger();
    await use(logger);
  }
});

export const expect = baseExpect;
