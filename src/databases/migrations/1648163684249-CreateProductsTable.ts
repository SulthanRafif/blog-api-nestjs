import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateProductsTable1648163684249 implements MigrationInterface {
  name = 'CreateProductsTable1648163684249';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`products\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`stock\` int NOT NULL, \`price\` int NOT NULL, \`description\` varchar(255) NOT NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`catalogId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`product_has_categories\` (\`product_id\` int NOT NULL, \`category_id\` int NOT NULL, INDEX \`IDX_c379e867aaa46a5f7f8e0c6bfc\` (\`product_id\`), INDEX \`IDX_72ce96b3154171d7830b613a52\` (\`category_id\`), PRIMARY KEY (\`product_id\`, \`category_id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`products\` ADD CONSTRAINT \`FK_5e36765f068b386522688c4a4d5\` FOREIGN KEY (\`catalogId\`) REFERENCES \`catalogues\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`product_has_categories\` ADD CONSTRAINT \`FK_c379e867aaa46a5f7f8e0c6bfc7\` FOREIGN KEY (\`product_id\`) REFERENCES \`products\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`product_has_categories\` ADD CONSTRAINT \`FK_72ce96b3154171d7830b613a521\` FOREIGN KEY (\`category_id\`) REFERENCES \`categories\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`product_has_categories\` DROP FOREIGN KEY \`FK_72ce96b3154171d7830b613a521\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`product_has_categories\` DROP FOREIGN KEY \`FK_c379e867aaa46a5f7f8e0c6bfc7\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`products\` DROP FOREIGN KEY \`FK_5e36765f068b386522688c4a4d5\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_72ce96b3154171d7830b613a52\` ON \`product_has_categories\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_c379e867aaa46a5f7f8e0c6bfc\` ON \`product_has_categories\``,
    );
    await queryRunner.query(`DROP TABLE \`product_has_categories\``);
    await queryRunner.query(`DROP TABLE \`products\``);
  }
}
