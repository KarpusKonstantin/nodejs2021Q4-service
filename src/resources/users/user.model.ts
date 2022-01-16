import { v4 as uuidv4 } from 'uuid';
import { Entity, Column, PrimaryColumn } from 'typeorm';


export interface IUser {
  id?: string;
  name?: string;
  login?: string;
  password?: string;
}

/**
 * User model which implement interface IUser
 */

@Entity('user')
class User implements IUser{
  @PrimaryColumn()
  id: string;

  @Column()
  login: string;

  @Column()
  name: string;

  @Column()
  password: string;

  constructor({
    id = uuidv4(),
    name = 'USER',
    login = 'user',
    password = 'P@55w0rd'
  } = {} as IUser) {
    this.id = id;
    this.name = name;
    this.login = login;
    this.password = password;
  }

  /**
   * Return instance
   * @returns IUser
   */
  get(): IUser {
    return {
      id: this.id,
      name: this.name,
      login: this.login,
    }
  }

  /**
   * Static method which return board object
   * @param user - user data (IUser)
   * @returns IUser
   */
  static toResponse(user: IUser): IUser {
    const { id, name, login } = user;
    return { id, name, login };
  }


}

export default User;
