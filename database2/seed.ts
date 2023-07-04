import { getMigrator } from './getMigrator';
import * as fs from 'fs';
import * as path from 'path';

// Utility function to run a migration
async function seed(query: string, file: string) {
  console.log(`executing migration: ${file} ...`);
  const { pool } = await getMigrator();
  await pool.query(query);
  console.log(`${file} migration executed`);
}

const directoryPath = path.join(__dirname, 'seeds');
async function runAll() {
  fs.readdir(directoryPath, async function (err, files) {
    if (err) {
      return console.log('Unable to scan directory: ' + err);
    }
    for (const file of files) {
      const data = fs.readFileSync(path.resolve(directoryPath, file), {
        encoding: 'utf8',
        flag: 'r',
      });
      await seed(data, file);
    }
    console.log('done');
    process.exit(0);
  });
}

runAll();
