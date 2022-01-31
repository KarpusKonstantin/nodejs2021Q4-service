import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('board')
export class Board {
  @PrimaryColumn()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column( 'json', {nullable: true })
  columns: string;

  @Column()
  title: string;

  // @OneToMany(() => Task, (task) => task.board)
  // tasks!: Task[];

  // @OneToMany(() => Task, (task) => task.user)
  // tasks?: Task[];
}
