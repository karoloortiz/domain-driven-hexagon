import { MigrationExecutor } from 'typeorm';
import { getMigrator } from './getMigrator';

async function run() {
  const { migrator } = await getMigrator();

  const args = process.argv.slice(2);

  if (args[0] == 'pending') {
    const pendingMigrations = await new MigrationExecutor(
      migrator,
      migrator.createQueryRunner('master'),
    ).getPendingMigrations();

    if (pendingMigrations.length > 0) {
      console.log('Find the following pending migrations:');
      console.log(pendingMigrations);
    }
    if (pendingMigrations.length == 0) {
      console.log('No pending migrations found.');
    }
  }
  if (args[0] == 'up') {
    const migrations = await migrator.runMigrations();
    if (migrations.length > 0) {
      console.log('Find the following migrations:');
      console.log(migrations);
    }
    if (migrations.length == 0) {
      console.log('No migrations found.');
    }
  }
  if (args[0] == 'revert_last') {
    const queryResult = await migrator.query(
      'SELECT name FROM migrations WHERE id = (SELECT MAX(id) FROM migrations)',
    );
    const lastMigration = queryResult[0];
    if (lastMigration) {
      await migrator.undoLastMigration();

      console.log(
        `The last migration ${lastMigration.name} has been reversed.`,
      );
    }
    if (!lastMigration) {
      console.log('No migration founds in the database.');
    }
  }

  if (args[0] != 'pending' && args[0] != 'up' && args[0] != 'revert_last') {
    console.error('Invalid arg.');
  }
  if (args.length == 0) {
    console.error('No arg passed.');
  }

  await migrator.destroy();

  console.log('Done migration.');
}

run();
