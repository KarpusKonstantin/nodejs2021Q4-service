import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { User } from './user/user.entity';
import { BoardModule } from './board/board.module';
import { TaskModule } from './task/task.module';
import { AuthModule } from './auth/auth.module';
import { FilesModule } from './files/files.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'path';
import { Board } from './board/board.entity';
import { Task } from './task/task.entiry';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env`
    }),
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, '..', 'upload'),
      serveRoot: '/file'
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      entities: [User, Task, Board],
      synchronize: false,
      migrationsRun: true,
      migrations: [`./dist/migrations/*{.ts,.js}`],
      cli: {
        migrationsDir: `./dist/migrations`,
      },
    }),
    UserModule,
    BoardModule,
    TaskModule,
    AuthModule,
    FilesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
