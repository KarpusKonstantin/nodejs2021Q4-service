import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {

  constructor(@InjectRepository(User) private usersRepository: Repository<User>) {}

  async getAllUsers(): Promise<User[]> {
    return this.usersRepository.find();
  };

  async getUserById(id: string): Promise<User> {
    return this.usersRepository.findOne(id);
  }

  async removeUser(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const insertResult = await this.usersRepository.insert(createUserDto);
    const user = await this.usersRepository.findOne(insertResult.identifiers[0].id);

    delete user.password;

    return user;
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const { affected } = await this.usersRepository.update(id, updateUserDto);

    if (affected > 0) {
      return await this.usersRepository.findOne(id);
    }

    throw new HttpException(`Пользователь с id = ${id} не найден.`, HttpStatus.NOT_FOUND);
  }

  // const updateUser =  (id: string, userData: IUser): Promise<IResultToResponse> => usersRepository.updateUser(id, userData);
  //
  // const deleteUser = async (id: string): Promise<IResultToResponse> => {
  //   await setUserIdToNull(id);
  //   const result: IResultToResponse = await usersRepository.deleteUser(id);
  //
  //   return { code: StatusCodes.OK, message: result.message }
  // }
  //
  // const getUserByLoginAndPassword = (login: string, password: string): Promise<IResultToResponse> =>  usersRepository.getUserByLoginAndPassword(login, password);
}
