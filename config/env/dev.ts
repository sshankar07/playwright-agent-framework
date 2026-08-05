import type { EnvConfig } from '../../src/types/environment';

export const devEnv: EnvConfig = {
  name: 'dev',
  baseURL: 'https://dev.example.test',
  featureFlags: {
    newUi: true
  }
};
