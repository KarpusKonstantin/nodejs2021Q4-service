import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UpdateUserDto } from '../user/dto/update-user.dto';

@Controller('login')
export class AuthController {

  constructor(private authService: AuthService) { }

  @Post()
  login(@Body() updateUserDto: UpdateUserDto) {
    return this.authService.login(updateUserDto);
  }


}
