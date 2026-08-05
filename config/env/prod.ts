import type { EnvConfig } from '../../src/types/environment';

export const prodEnv: EnvConfig = {
  name: 'prod',
  baseURL: 'https://prod.example.test',
  featureFlags: {
    newUi: false
  }
};
