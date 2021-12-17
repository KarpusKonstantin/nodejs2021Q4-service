import { v4 as uuidv4 } from 'uuid';

export interface IUser {
  id?: string;
  name?: string;
  login?: string;
  password?: string;
}


class User implements IUser{
  id: string;
  login: string;
  name: string;
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

  get(): IUser {
    return {
      id: this.id,
      name: this.name,
      login: this.login,
    }
  }

  static toResponse(user: IUser): IUser {
    const { id, name, login } = user;
    return { id, name, login };
  }


}

export default User;
