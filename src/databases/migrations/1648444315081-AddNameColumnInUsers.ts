import {MigrationInterface, QueryRunner} from "typeorm";

export class AddNameColumnInUsers1648444315081 implements MigrationInterface {
    name = 'AddNameColumnInUsers1648444315081'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`name\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`name\``);
    }

}
