import { Column, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { Task } from '../task/task.entiry';

@Entity('board')
export class Board {
  @PrimaryColumn()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column( 'json', {nullable: true })
  columns: string;

  @Column()
  title: string;

  @OneToMany(() => Task, (task) => task.board)
  tasks!: Task[];

  // @OneToMany(() => Task, (task) => task.user)
  // tasks?: Task[];
}
