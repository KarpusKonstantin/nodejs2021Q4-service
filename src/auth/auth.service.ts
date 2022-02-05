import { Body, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserService } from '../user/user.service';
import { User } from '../user/user.entity';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { UpdateUserDto } from '../user/dto/update-user.dto';


@Injectable()
export class AuthService {

  constructor(private userService: UserService,
              private jwtService: JwtService) {
  }


  async login(updateUserDto: UpdateUserDto) {
    const user = await this.validateUser(updateUserDto)

    return this.generateToken(user)
  }

  private async validateUser(userDto: CreateUserDto) {
    const user = await this.userService.getUserByLogin(userDto.login);
    const passwordEquals = await bcrypt.compare(userDto.password, user.password);
    if (user && passwordEquals) {
      return user;
    }
    throw new UnauthorizedException({message: 'Некорректный логин или пароль'})
  }

  async generateToken(user: User) {
    const payload = {userId: user.id, login: user.login }

    return {
      token: this.jwtService.sign(payload)
    }
  }


}
