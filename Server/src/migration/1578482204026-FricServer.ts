import {MigrationInterface, QueryRunner} from "typeorm";

export class FricServer1578482204026 implements MigrationInterface {
    name = 'FricServer1578482204026'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "username" character varying NOT NULL, "password" character varying NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "email" character varying NOT NULL, "token" character varying NOT NULL, "plan" integer NOT NULL, "currentRequests" integer NOT NULL, "maximumRequests" integer NOT NULL, "createDate" TIMESTAMP NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DROP TABLE "user"`, undefined);
    }

}
