import { MigrationInterface, QueryRunner } from 'typeorm';

export class initial1663604344307 implements MigrationInterface {
  name = 'initial1663604344307';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "photo" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "photo_url" character varying NOT NULL,
                "thumbnail_url" character varying NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT NOW(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT NOW(),
                "item_id" uuid,
                CONSTRAINT "PK_723fa50bf70dcfd06fb5a44d4ff" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "user" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "email" character varying NOT NULL,
                "password_hash" character varying NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT NOW(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT NOW(),
                CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"),
                CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "home" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "name" character varying(1024) NOT NULL,
                "slug" character varying(255) NOT NULL,
                "description" character varying,
                "address" character varying,
                "payment_types" character varying,
                "created_at" TIMESTAMP NOT NULL DEFAULT NOW(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT NOW(),
                "user_id" uuid,
                CONSTRAINT "PK_012205783b51369c326a1ad4a64" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "category" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "name" character varying(255) NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT NOW(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT NOW(),
                "home_id" uuid,
                CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "bundle" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "name" character varying NOT NULL,
                "price" integer,
                "sold_at" TIMESTAMP,
                "sold_price" integer,
                "sold_to" character varying,
                "created_at" TIMESTAMP NOT NULL DEFAULT NOW(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT NOW(),
                "home_id" uuid,
                CONSTRAINT "PK_637e3f87e837d6532109c198dea" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "tag" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "name" character varying NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT NOW(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT NOW(),
                CONSTRAINT "PK_8e4052373c579afc1471f526760" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "item" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "name" character varying NOT NULL,
                "description" character varying,
                "internal_note" character varying,
                "source_url" character varying,
                "price" integer NOT NULL DEFAULT '0',
                "collection_date" TIMESTAMP,
                "sold_at" TIMESTAMP,
                "sold_price" integer,
                "created_at" TIMESTAMP NOT NULL DEFAULT NOW(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT NOW(),
                "home_id" uuid,
                "category_id" uuid,
                "bundle_id" uuid,
                "sold_to_id" uuid,
                CONSTRAINT "PK_d3c0c71f23e7adcf952a1d13423" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "item_tags_tag" (
                "item_id" uuid NOT NULL,
                "tag_id" uuid NOT NULL,
                CONSTRAINT "PK_9fce4eaf2c6103e7f117b9eb9de" PRIMARY KEY ("item_id", "tag_id")
            )
        `);
    await queryRunner.query(`
            CREATE INDEX "IDX_99b3d94fc899b071b613516fcf" ON "item_tags_tag" ("item_id")
        `);
    await queryRunner.query(`
            CREATE INDEX "IDX_e460757a7e516d6b14f9ded3b8" ON "item_tags_tag" ("tag_id")
        `);
    await queryRunner.query(`
            ALTER TABLE "photo"
            ADD CONSTRAINT "FK_f806032ed1c9edcd808bae885dc" FOREIGN KEY ("item_id") REFERENCES "item"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "home"
            ADD CONSTRAINT "FK_8aa91f80ffd89341dc75b187b52" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "category"
            ADD CONSTRAINT "FK_a8e6921acd2cebe0680831b86f1" FOREIGN KEY ("home_id") REFERENCES "home"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "bundle"
            ADD CONSTRAINT "FK_771cb3a2cbf818603279765d859" FOREIGN KEY ("home_id") REFERENCES "home"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "item"
            ADD CONSTRAINT "FK_be6a6effa75bf6d48ba1b5533c1" FOREIGN KEY ("home_id") REFERENCES "home"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "item"
            ADD CONSTRAINT "FK_91ba90f150e8804bdaad7b17ff8" FOREIGN KEY ("category_id") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "item"
            ADD CONSTRAINT "FK_5eb2ae78061c828be889a378145" FOREIGN KEY ("bundle_id") REFERENCES "bundle"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "item"
            ADD CONSTRAINT "FK_11f3f2cf9adc8e237eb90c4cf0d" FOREIGN KEY ("sold_to_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "item_tags_tag"
            ADD CONSTRAINT "FK_99b3d94fc899b071b613516fcf1" FOREIGN KEY ("item_id") REFERENCES "item"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
    await queryRunner.query(`
            ALTER TABLE "item_tags_tag"
            ADD CONSTRAINT "FK_e460757a7e516d6b14f9ded3b82" FOREIGN KEY ("tag_id") REFERENCES "tag"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "item_tags_tag" DROP CONSTRAINT "FK_e460757a7e516d6b14f9ded3b82"
        `);
    await queryRunner.query(`
            ALTER TABLE "item_tags_tag" DROP CONSTRAINT "FK_99b3d94fc899b071b613516fcf1"
        `);
    await queryRunner.query(`
            ALTER TABLE "item" DROP CONSTRAINT "FK_11f3f2cf9adc8e237eb90c4cf0d"
        `);
    await queryRunner.query(`
            ALTER TABLE "item" DROP CONSTRAINT "FK_5eb2ae78061c828be889a378145"
        `);
    await queryRunner.query(`
            ALTER TABLE "item" DROP CONSTRAINT "FK_91ba90f150e8804bdaad7b17ff8"
        `);
    await queryRunner.query(`
            ALTER TABLE "item" DROP CONSTRAINT "FK_be6a6effa75bf6d48ba1b5533c1"
        `);
    await queryRunner.query(`
            ALTER TABLE "bundle" DROP CONSTRAINT "FK_771cb3a2cbf818603279765d859"
        `);
    await queryRunner.query(`
            ALTER TABLE "category" DROP CONSTRAINT "FK_a8e6921acd2cebe0680831b86f1"
        `);
    await queryRunner.query(`
            ALTER TABLE "home" DROP CONSTRAINT "FK_8aa91f80ffd89341dc75b187b52"
        `);
    await queryRunner.query(`
            ALTER TABLE "photo" DROP CONSTRAINT "FK_f806032ed1c9edcd808bae885dc"
        `);
    await queryRunner.query(`
            DROP INDEX "public"."IDX_e460757a7e516d6b14f9ded3b8"
        `);
    await queryRunner.query(`
            DROP INDEX "public"."IDX_99b3d94fc899b071b613516fcf"
        `);
    await queryRunner.query(`
            DROP TABLE "item_tags_tag"
        `);
    await queryRunner.query(`
            DROP TABLE "item"
        `);
    await queryRunner.query(`
            DROP TABLE "tag"
        `);
    await queryRunner.query(`
            DROP TABLE "bundle"
        `);
    await queryRunner.query(`
            DROP TABLE "category"
        `);
    await queryRunner.query(`
            DROP TABLE "home"
        `);
    await queryRunner.query(`
            DROP TABLE "user"
        `);
    await queryRunner.query(`
            DROP TABLE "photo"
        `);
  }
}
