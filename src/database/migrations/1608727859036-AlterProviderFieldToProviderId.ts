import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from "typeorm";

export default class AlterProviderFieldToProviderId1608727859036 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('appointments', 'barbeiro');
        await queryRunner.addColumn('appointments', new TableColumn({
            name: 'barbeiro_id',
            type: 'uuid',
            isNullable: true,
        }),
        );

        await queryRunner.createForeignKey('appointments', new TableForeignKey({
            name: 'AppointmentBarbeiro',
            columnNames:['barbeiro_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'users',
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE',
        }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('appointments', 'AppointmentBarbeiro');

        await queryRunner.dropColumn('appointments', 'barbeiro_id');

        await queryRunner.addColumn('appointments', new TableColumn({
            name: 'barbeiro',
            type: 'varchar',
        }))
    }

}
