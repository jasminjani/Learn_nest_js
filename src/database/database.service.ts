import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { createPool, Pool, PoolConnection } from 'mysql2/promise';

@Injectable()
export class DatabaseService implements OnModuleInit, OnModuleDestroy {
  private pool: Pool;

  onModuleInit() {
    this.pool = createPool({
      host: 'localhost',
      user: 'root',
      password: 'root',
      database: 'nestjs_form',
      // waitForConnections: true,
      // connectionLimit: 10,
      // queueLimit: 0,
    });
    console.log('MySQL connection pool initialized.');
  }

  async poolConnection(): Promise<PoolConnection> {
    return this.pool.getConnection();
  }

  async query(sql: string, values?: any[]): Promise<any> {
    const connection = await this.poolConnection();

    try {
      const [result] = await connection.query(sql, values);
      return result;
    } catch (err) {
      console.error(err);
      throw err;
      // throw new Error(err);
    } finally {
      connection.release();
    }
  }

  onModuleDestroy() {
    this.pool.destroy();
    console.log('MySQL connection pool closed.');
  }
}
