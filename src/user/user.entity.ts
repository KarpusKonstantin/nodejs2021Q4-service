import { Column, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user')
export class User {
  @PrimaryColumn()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  login: string;

  @Column()
  name: string;

  @Column()
  password: string;

  // @OneToMany(() => Task, (task) => task.user)
  // tasks?: Task[];
}
