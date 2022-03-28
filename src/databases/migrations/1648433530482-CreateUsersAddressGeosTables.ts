import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateUsersAddressGeosTables1648433530482 implements MigrationInterface {
    name = 'CreateUsersAddressGeosTables1648433530482'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`geos\` (\`id\` varchar(36) NOT NULL, \`lat\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`users\` (\`id\` varchar(36) NOT NULL, \`username\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`phone\` varchar(255) NOT NULL, \`website\` varchar(255) NOT NULL, \`addressId\` varchar(36) NULL, UNIQUE INDEX \`REL_bafb08f60d7857f4670c172a6e\` (\`addressId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`addresses\` (\`id\` varchar(36) NOT NULL, \`street\` varchar(255) NOT NULL, \`suite\` varchar(255) NOT NULL, \`city\` varchar(255) NOT NULL, \`zipcode\` varchar(255) NOT NULL, \`geoId\` varchar(36) NULL, UNIQUE INDEX \`REL_49c35157842aec1a76537798fa\` (\`geoId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`categories\` CHANGE \`total_products\` \`total_products\` int NOT NULL DEFAULT 0`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD CONSTRAINT \`FK_bafb08f60d7857f4670c172a6ea\` FOREIGN KEY (\`addressId\`) REFERENCES \`addresses\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`addresses\` ADD CONSTRAINT \`FK_49c35157842aec1a76537798faf\` FOREIGN KEY (\`geoId\`) REFERENCES \`geos\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`addresses\` DROP FOREIGN KEY \`FK_49c35157842aec1a76537798faf\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP FOREIGN KEY \`FK_bafb08f60d7857f4670c172a6ea\``);
        await queryRunner.query(`ALTER TABLE \`categories\` CHANGE \`total_products\` \`total_products\` int NOT NULL DEFAULT '0'`);
        await queryRunner.query(`DROP INDEX \`REL_49c35157842aec1a76537798fa\` ON \`addresses\``);
        await queryRunner.query(`DROP TABLE \`addresses\``);
        await queryRunner.query(`DROP INDEX \`REL_bafb08f60d7857f4670c172a6e\` ON \`users\``);
        await queryRunner.query(`DROP TABLE \`users\``);
        await queryRunner.query(`DROP TABLE \`geos\``);
    }

}
