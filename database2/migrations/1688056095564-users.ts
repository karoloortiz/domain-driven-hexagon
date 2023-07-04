import { MigrationInterface, QueryRunner } from 'typeorm';

export class Users1688056095564 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE users (
        id INT NOT NULL AUTO_INCREMENT,
        created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
        email VARCHAR(50) NOT NULL,
        country VARCHAR(50) NOT NULL,
        postal_code VARCHAR(50) NOT NULL,
        street VARCHAR(50) NOT NULL,
        role VARCHAR(50) NOT NULL,
        PRIMARY KEY (id) USING BTREE,
        UNIQUE INDEX users_email_key (email) USING BTREE
      )`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE users`);
  }
}
