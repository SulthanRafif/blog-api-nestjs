import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateTotalProductColumnInCategoryTable1648179754200
  implements MigrationInterface
{
  name = 'UpdateTotalProductColumnInCategoryTable1648179754200';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`categories\` CHANGE \`total_products\` \`total_products\` int NOT NULL DEFAULT 0`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`categories\` CHANGE \`total_products\` \`total_products\` int NOT NULL`,
    );
  }
}
