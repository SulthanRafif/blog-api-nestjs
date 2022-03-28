import {MigrationInterface, QueryRunner} from "typeorm";

export class AddRoleColumnInUsers1648444678425 implements MigrationInterface {
    name = 'AddRoleColumnInUsers1648444678425'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`role\` enum ('Admin', 'User') NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`role\``);
    }

}
