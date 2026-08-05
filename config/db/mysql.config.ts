export const mysqlConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT || 3306),
  user: process.env.DB_USER || 'test',
  password: process.env.DB_PASSWORD || 'test',
  database: process.env.DB_NAME || 'test_db'
};
