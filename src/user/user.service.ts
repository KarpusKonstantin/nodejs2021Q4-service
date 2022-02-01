import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Task } from '../task/task.entiry';
import { TaskService } from '../task/task.service';

@Injectable()
export class UserService {

  constructor(@InjectRepository(User) private usersRepository: Repository<User>,
              private taskService: TaskService) {}

  async getAllUsers(): Promise<User[]> {
    return this.usersRepository.find();
  };

  async getUserById(id: string): Promise<User> {
    const result = await this.usersRepository.findOne(id);

    if (result === undefined) {
      throw new HttpException(`Пользователь с id = ${id} не найден.`, HttpStatus.NOT_FOUND);
    }

    return result;
  }

  async removeUser(id: string): Promise<void> {
    await this.taskService.setUserIdToNull(id);
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
}
