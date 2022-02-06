import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../user/user.entity';
import { Board } from '../board/board.entity';

@Entity('task')
export class Task {
  @PrimaryColumn()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', nullable: true })
  boardId: string | null | undefined;

  @Column({ type: 'varchar', nullable: true })
  columnId: string | null;

  @Column()
  description: string;

  @Column({ type: 'int', default: 0})
  order: number;

  @Column()
  title: string;

  @Column({ type: 'varchar', nullable: true })
  userId: string | null;

  @ManyToOne(() => User, (user) => user.tasks)
  @JoinColumn({ name: 'userId' })
  user!: User;

  @ManyToOne(() => Board, (board) => board.tasks)
  @JoinColumn({ name: 'boardId' })
  board!: Board;

}
