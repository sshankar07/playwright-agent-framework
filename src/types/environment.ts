export type EnvName = 'dev' | 'qa' | 'prod';

export interface EnvConfig {
  name: EnvName;
  baseURL: string;
  featureFlags: Record<string, boolean>;
}
