import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateUsersGeoAddressPostsCommentsAlbumsPhotosTodosTables1648441373024 implements MigrationInterface {
    name = 'CreateUsersGeoAddressPostsCommentsAlbumsPhotosTodosTables1648441373024'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` DROP FOREIGN KEY \`FK_31ac7ac0a151b98aa192ffafcf5\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP FOREIGN KEY \`FK_4e8ad2aab09cbbd462e12010427\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP FOREIGN KEY \`FK_a98b894aff9d0fc3344e7099e7b\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`postId\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`albumId\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`todoId\``);
        await queryRunner.query(`ALTER TABLE \`posts\` ADD \`userId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`todos\` ADD \`userId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`albums\` ADD \`userId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`posts\` ADD CONSTRAINT \`FK_ae05faaa55c866130abef6e1fee\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`todos\` ADD CONSTRAINT \`FK_4583be7753873b4ead956f040e3\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`albums\` ADD CONSTRAINT \`FK_8e46da7abb99e39551c42451684\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`albums\` DROP FOREIGN KEY \`FK_8e46da7abb99e39551c42451684\``);
        await queryRunner.query(`ALTER TABLE \`todos\` DROP FOREIGN KEY \`FK_4583be7753873b4ead956f040e3\``);
        await queryRunner.query(`ALTER TABLE \`posts\` DROP FOREIGN KEY \`FK_ae05faaa55c866130abef6e1fee\``);
        await queryRunner.query(`ALTER TABLE \`albums\` DROP COLUMN \`userId\``);
        await queryRunner.query(`ALTER TABLE \`todos\` DROP COLUMN \`userId\``);
        await queryRunner.query(`ALTER TABLE \`posts\` DROP COLUMN \`userId\``);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`todoId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`albumId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`postId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD CONSTRAINT \`FK_a98b894aff9d0fc3344e7099e7b\` FOREIGN KEY (\`postId\`) REFERENCES \`posts\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD CONSTRAINT \`FK_4e8ad2aab09cbbd462e12010427\` FOREIGN KEY (\`albumId\`) REFERENCES \`albums\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD CONSTRAINT \`FK_31ac7ac0a151b98aa192ffafcf5\` FOREIGN KEY (\`todoId\`) REFERENCES \`todos\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }

}
