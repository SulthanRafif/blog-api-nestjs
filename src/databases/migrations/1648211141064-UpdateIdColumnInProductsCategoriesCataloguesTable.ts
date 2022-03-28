import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateIdColumnInProductsCategoriesCataloguesTable1648211141064
  implements MigrationInterface
{
  name = 'UpdateIdColumnInProductsCategoriesCataloguesTable1648211141064';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`categories\` CHANGE \`total_products\` \`total_products\` int NOT NULL DEFAULT 0`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`categories\` CHANGE \`total_products\` \`total_products\` int NOT NULL DEFAULT '0'`,
    );
  }
}
