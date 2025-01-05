// src/lib/database/index.ts

import { createPool } from 'mysql2/promise';

// 1) Create the pool
export const pool = createPool({
  host: '127.0.0.1',     
  port: 3306,
  user: 'root',        // must match Docker env
  password: '',
  database: 'roommate_app' // same as MYSQL_DATABASE in Docker
});

// 2) Attempt a quick connection on startup
(async () => {
  try {
    const connection = await pool.getConnection();
    console.log('✅ Database connection established');
    connection.release();
  } catch (err) {
    console.error('❌ Failed to connect to the database:', err);
  }
})();

// 3) (Optional) Provide a query helper
export async function query<T = any>(sql: string, params?: any[]) {
  const [rows] = await pool.query<T[]>(sql, params);
  return rows;
}
