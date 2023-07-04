import { DataSource } from 'typeorm';

/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import * as dotenv from 'dotenv';
import * as path from 'path';
import { createPool } from 'mysql2/promise';

// use .env or .env.test depending on NODE_ENV variable
const envPath = path.resolve(
  __dirname,
  process.env.NODE_ENV === 'test' ? '../.env.test' : '../.env',
);
dotenv.config({ path: envPath });

const connectionUri = `mysql://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;

export async function getMigrator() {
  const pool = await createPool({
    uri: connectionUri,
    multipleStatements: true,
  });

  const migrationSearchFilesPath = path.resolve(
    __dirname,
    'migrations/**/*.ts',
  );
  const migrator = await new DataSource({
    type: 'mysql',
    url: connectionUri,
    migrations: [migrationSearchFilesPath],
  }).initialize();

  return { pool, migrator };
}
