import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateIdColumnInCategoriesTable1648165933491
  implements MigrationInterface
{
  name = 'UpdateIdColumnInCategoriesTable1648165933491';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`product_has_categories\` DROP FOREIGN KEY \`FK_72ce96b3154171d7830b613a521\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`categories\` CHANGE \`id\` \`id\` int NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE \`categories\` DROP PRIMARY KEY`);
    await queryRunner.query(`ALTER TABLE \`categories\` DROP COLUMN \`id\``);
    await queryRunner.query(
      `ALTER TABLE \`categories\` ADD \`id\` varchar(36) NOT NULL PRIMARY KEY`,
    );
    await queryRunner.query(
      `ALTER TABLE \`product_has_categories\` DROP PRIMARY KEY`,
    );
    await queryRunner.query(
      `ALTER TABLE \`product_has_categories\` ADD PRIMARY KEY (\`product_id\`)`,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_72ce96b3154171d7830b613a52\` ON \`product_has_categories\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`product_has_categories\` DROP COLUMN \`category_id\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`product_has_categories\` ADD \`category_id\` varchar(36) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`product_has_categories\` DROP PRIMARY KEY`,
    );
    await queryRunner.query(
      `ALTER TABLE \`product_has_categories\` ADD PRIMARY KEY (\`product_id\`, \`category_id\`)`,
    );
    await queryRunner.query(
      `CREATE INDEX \`IDX_72ce96b3154171d7830b613a52\` ON \`product_has_categories\` (\`category_id\`)`,
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
      `DROP INDEX \`IDX_72ce96b3154171d7830b613a52\` ON \`product_has_categories\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`product_has_categories\` DROP PRIMARY KEY`,
    );
    await queryRunner.query(
      `ALTER TABLE \`product_has_categories\` ADD PRIMARY KEY (\`product_id\`)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`product_has_categories\` DROP COLUMN \`category_id\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`product_has_categories\` ADD \`category_id\` int NOT NULL`,
    );
    await queryRunner.query(
      `CREATE INDEX \`IDX_72ce96b3154171d7830b613a52\` ON \`product_has_categories\` (\`category_id\`)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`product_has_categories\` DROP PRIMARY KEY`,
    );
    await queryRunner.query(
      `ALTER TABLE \`product_has_categories\` ADD PRIMARY KEY (\`product_id\`, \`category_id\`)`,
    );
    await queryRunner.query(`ALTER TABLE \`categories\` DROP COLUMN \`id\``);
    await queryRunner.query(
      `ALTER TABLE \`categories\` ADD \`id\` int NOT NULL AUTO_INCREMENT`,
    );
    await queryRunner.query(
      `ALTER TABLE \`categories\` ADD PRIMARY KEY (\`id\`)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`categories\` CHANGE \`id\` \`id\` int NOT NULL AUTO_INCREMENT`,
    );
    await queryRunner.query(
      `ALTER TABLE \`product_has_categories\` ADD CONSTRAINT \`FK_72ce96b3154171d7830b613a521\` FOREIGN KEY (\`category_id\`) REFERENCES \`categories\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }
}
