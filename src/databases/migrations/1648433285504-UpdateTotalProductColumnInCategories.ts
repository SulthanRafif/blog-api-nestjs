import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateTotalProductColumnInCategories1648433285504
  implements MigrationInterface
{
  name = 'UpdateTotalProductColumnInCategories1648433285504';

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
