import {MigrationInterface, QueryRunner} from "typeorm";

export class AddEmailColumnInUsers1648444451701 implements MigrationInterface {
    name = 'AddEmailColumnInUsers1648444451701'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`email\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`email\``);
    }

}
