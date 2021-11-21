import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import TaskCompletedEnum from '../../../modules/tasks/enumerations/TaskCompletedEnum';

export class CreateTasks1637274854781 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'tasks',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'description',
            type: 'varchar',
          },
          {
            name: 'completed',
            type: 'enum',
            enum: [TaskCompletedEnum.NO, TaskCompletedEnum.YES],
            default: `'${TaskCompletedEnum.NO}'`,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('tasks');
  }
}
