export interface UserRecord {
  id: string;
  role: string;
  username: string;
  password?: string;
}

export interface TestDataBundle {
  users: UserRecord[];
  [key: string]: unknown;
}
