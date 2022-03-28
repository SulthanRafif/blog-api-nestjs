import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateIdColumnInProductsTable1648166074302
  implements MigrationInterface
{
  name = 'UpdateIdColumnInProductsTable1648166074302';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`product_has_categories\` DROP FOREIGN KEY \`FK_c379e867aaa46a5f7f8e0c6bfc7\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`products\` CHANGE \`id\` \`id\` int NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE \`products\` DROP PRIMARY KEY`);
    await queryRunner.query(`ALTER TABLE \`products\` DROP COLUMN \`id\``);
    await queryRunner.query(
      `ALTER TABLE \`products\` ADD \`id\` varchar(36) NOT NULL PRIMARY KEY`,
    );
    await queryRunner.query(
      `ALTER TABLE \`product_has_categories\` DROP PRIMARY KEY`,
    );
    await queryRunner.query(
      `ALTER TABLE \`product_has_categories\` ADD PRIMARY KEY (\`category_id\`)`,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_c379e867aaa46a5f7f8e0c6bfc\` ON \`product_has_categories\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`product_has_categories\` DROP COLUMN \`product_id\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`product_has_categories\` ADD \`product_id\` varchar(36) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`product_has_categories\` DROP PRIMARY KEY`,
    );
    await queryRunner.query(
      `ALTER TABLE \`product_has_categories\` ADD PRIMARY KEY (\`category_id\`, \`product_id\`)`,
    );
    await queryRunner.query(
      `CREATE INDEX \`IDX_c379e867aaa46a5f7f8e0c6bfc\` ON \`product_has_categories\` (\`product_id\`)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`product_has_categories\` ADD CONSTRAINT \`FK_c379e867aaa46a5f7f8e0c6bfc7\` FOREIGN KEY (\`product_id\`) REFERENCES \`products\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`product_has_categories\` DROP FOREIGN KEY \`FK_c379e867aaa46a5f7f8e0c6bfc7\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_c379e867aaa46a5f7f8e0c6bfc\` ON \`product_has_categories\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`product_has_categories\` DROP PRIMARY KEY`,
    );
    await queryRunner.query(
      `ALTER TABLE \`product_has_categories\` ADD PRIMARY KEY (\`category_id\`)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`product_has_categories\` DROP COLUMN \`product_id\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`product_has_categories\` ADD \`product_id\` int NOT NULL`,
    );
    await queryRunner.query(
      `CREATE INDEX \`IDX_c379e867aaa46a5f7f8e0c6bfc\` ON \`product_has_categories\` (\`product_id\`)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`product_has_categories\` DROP PRIMARY KEY`,
    );
    await queryRunner.query(
      `ALTER TABLE \`product_has_categories\` ADD PRIMARY KEY (\`product_id\`, \`category_id\`)`,
    );
    await queryRunner.query(`ALTER TABLE \`products\` DROP COLUMN \`id\``);
    await queryRunner.query(
      `ALTER TABLE \`products\` ADD \`id\` int NOT NULL AUTO_INCREMENT`,
    );
    await queryRunner.query(
      `ALTER TABLE \`products\` ADD PRIMARY KEY (\`id\`)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`products\` CHANGE \`id\` \`id\` int NOT NULL AUTO_INCREMENT`,
    );
    await queryRunner.query(
      `ALTER TABLE \`product_has_categories\` ADD CONSTRAINT \`FK_c379e867aaa46a5f7f8e0c6bfc7\` FOREIGN KEY (\`product_id\`) REFERENCES \`products\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }
}
