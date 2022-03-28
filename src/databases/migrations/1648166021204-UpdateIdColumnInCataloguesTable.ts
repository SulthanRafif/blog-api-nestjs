import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateIdColumnInCataloguesTable1648166021204
  implements MigrationInterface
{
  name = 'UpdateIdColumnInCataloguesTable1648166021204';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`products\` DROP FOREIGN KEY \`FK_5e36765f068b386522688c4a4d5\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`products\` DROP COLUMN \`catalogId\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`products\` ADD \`catalogId\` varchar(36) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`catalogues\` CHANGE \`id\` \`id\` int NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE \`catalogues\` DROP PRIMARY KEY`);
    await queryRunner.query(`ALTER TABLE \`catalogues\` DROP COLUMN \`id\``);
    await queryRunner.query(
      `ALTER TABLE \`catalogues\` ADD \`id\` varchar(36) NOT NULL PRIMARY KEY`,
    );
    await queryRunner.query(
      `ALTER TABLE \`products\` ADD CONSTRAINT \`FK_5e36765f068b386522688c4a4d5\` FOREIGN KEY (\`catalogId\`) REFERENCES \`catalogues\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`products\` DROP FOREIGN KEY \`FK_5e36765f068b386522688c4a4d5\``,
    );
    await queryRunner.query(`ALTER TABLE \`catalogues\` DROP COLUMN \`id\``);
    await queryRunner.query(
      `ALTER TABLE \`catalogues\` ADD \`id\` int NOT NULL AUTO_INCREMENT`,
    );
    await queryRunner.query(
      `ALTER TABLE \`catalogues\` ADD PRIMARY KEY (\`id\`)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`catalogues\` CHANGE \`id\` \`id\` int NOT NULL AUTO_INCREMENT`,
    );
    await queryRunner.query(
      `ALTER TABLE \`products\` DROP COLUMN \`catalogId\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`products\` ADD \`catalogId\` int NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`products\` ADD CONSTRAINT \`FK_5e36765f068b386522688c4a4d5\` FOREIGN KEY (\`catalogId\`) REFERENCES \`catalogues\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }
}
