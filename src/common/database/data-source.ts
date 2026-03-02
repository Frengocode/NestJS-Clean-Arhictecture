import 'dotenv/config';
import { join } from 'path';
import { DataSource } from 'typeorm';

const rootDir = process.cwd();

export default new DataSource({
  type: 'postgres',
  host: process.env.POSTGRESQL_HOST,
  port: Number(process.env.POSTGRESQL_PORT),
  username: process.env.POSTGRESQL_USERNAME,
  password: process.env.POSTGRESQL_PASSWORD,
  database: process.env.POSTGRESQL_DB_NAME,
  entities: [
    join(rootDir, 'src', 'modules', '**', '*.entitie.ts'),
    join(rootDir, 'dist', 'modules', '**', '*.entitie.js'),
  ],
  migrations: [
    join(rootDir, 'src', 'common', 'database', 'migrations', '*.ts'),
    join(rootDir, 'dist', 'common', 'database', 'migrations', '*.js'),
  ],
});
