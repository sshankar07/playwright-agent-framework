export interface TenantDefinition {
  id: string;
  displayName: string;
  env: 'dev' | 'qa' | 'prod';
  baseURLOverride?: string;
  defaultUsers: {
    id: string;
    role: string;
    username: string;
  }[];
}
