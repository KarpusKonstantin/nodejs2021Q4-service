import { Module } from '@nestjs/common';
import { BoardService } from './board.service';
import { BoardController } from './board.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Board } from './board.entity';
import { TaskModule } from '../task/task.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from '../auth/auth.module';

@Module({
  providers: [BoardService],
  controllers: [BoardController],
  imports: [
    TypeOrmModule.forFeature([Board]),
    TaskModule,
    AuthModule
  ]
})
export class BoardModule {}
