import { devEnv } from '../../config/env/dev';
import { qaEnv } from '../../config/env/qa';
import { prodEnv } from '../../config/env/prod';
import type { EnvName, EnvConfig } from '../types/environment';

export interface EnvContext {
  envName: EnvName;
  config: EnvConfig;
}

export function resolveEnv(): EnvConfig {
  const env = (process.env.ENV || 'dev') as EnvName;
  switch (env) {
    case 'qa':
      return qaEnv;
    case 'prod':
      return prodEnv;
    case 'dev':
    default:
      return devEnv;
  }
}

export function createEnvContext(): EnvContext {
  const config = resolveEnv();
  return {
    envName: config.name,
    config
  };
}
