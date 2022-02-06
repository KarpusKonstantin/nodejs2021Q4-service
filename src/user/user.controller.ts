import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UserController {

  constructor(private userService: UserService) {}

  @Get()
  getAll(): Promise<User[]> {
    return this.userService.getAllUsers();
  }

  @Get(':id')
  getById(@Param('id') id: string): Promise<User> {
    return this.userService.getUserById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.createUser(createUserDto)
  }

  @Put(':id')
  update(@Body() updateUserDto: UpdateUserDto, @Param('id') id: string): Promise<User> {
    return this.userService.updateUser(id, updateUserDto)
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<void> {
    return this.userService.removeUser(id);
  }
}
