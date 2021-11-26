import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class AddTaskIdToHistories1637960569525 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'histories',
      new TableColumn({
        name: 'task_id',
        type: 'int',
      })
    );

    await queryRunner.createForeignKey(
      'histories',
      new TableForeignKey({
        name: 'HistoriesTask',
        columnNames: ['task_id'],
        referencedTableName: 'tasks',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('histories', 'HistoriesTask');
    await queryRunner.dropColumn('histories', 'task_id');
  }
}
