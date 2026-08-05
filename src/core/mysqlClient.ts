import mysql from 'mysql2/promise';
import { mysqlConfig } from '../../config/db/mysql.config';

export interface MysqlClient {
  query<T = unknown>(sql: string, params?: unknown[]): Promise<T[]>;
  close(): Promise<void>;
}

export async function createMysqlClient(): Promise<MysqlClient> {
  const pool = mysql.createPool({
    host: mysqlConfig.host,
    port: mysqlConfig.port,
    user: mysqlConfig.user,
    password: mysqlConfig.password,
    database: mysqlConfig.database,
    connectionLimit: 5
  });

  return {
    async query<T = unknown>(sql: string, params: unknown[] = []): Promise<T[]> {
      const [rows] = await pool.query(sql, params);
      return rows as T[];
    },
    async close(): Promise<void> {
      await pool.end();
    }
  };
}
