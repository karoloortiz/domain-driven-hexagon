import { MigrationInterface, QueryRunner } from 'typeorm';

export class Wallet1688127516518 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE wallets (
        id INT NOT NULL AUTO_INCREMENT,
        created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
        balance INT NOT NULL DEFAULT '0',
        user_id INT NOT NULL,
        PRIMARY KEY (id) USING BTREE,
        UNIQUE INDEX wallets_user_id_key (user_id) USING BTREE
      );`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE wallets`);
  }
}
