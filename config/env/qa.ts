import type { EnvConfig } from '../../src/types/environment';

export const qaEnv: EnvConfig = {
  name: 'qa',
  baseURL: 'https://qa.example.test',
  featureFlags: {
    newUi: false
  }
};
