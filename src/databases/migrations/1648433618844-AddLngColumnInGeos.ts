import {MigrationInterface, QueryRunner} from "typeorm";

export class AddLngColumnInGeos1648433618844 implements MigrationInterface {
    name = 'AddLngColumnInGeos1648433618844'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`geos\` ADD \`lng\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`categories\` CHANGE \`total_products\` \`total_products\` int NOT NULL DEFAULT 0`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`categories\` CHANGE \`total_products\` \`total_products\` int NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`geos\` DROP COLUMN \`lng\``);
    }

}
