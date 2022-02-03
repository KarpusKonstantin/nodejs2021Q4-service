import { forwardRef, Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Task } from '../task/task.entiry';
import { TaskModule } from '../task/task.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env`
    }),
    TypeOrmModule.forFeature([User, Task]),
    TaskModule,
    forwardRef(() => AuthModule)

  ],
  exports: [
    UserService,
  ]
})

export class UserModule {}
