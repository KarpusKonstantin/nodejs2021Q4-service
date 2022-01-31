import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { User } from './user/user.entity';
import { BoardModule } from './board/board.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env`
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      entities: [User],
      synchronize: true,
      autoLoadEntities: true,

      // migrationsRun: true,
      // logging: true,
      // logger: 'file',
      //
      // migrations: ['src/migrations/*{.ts,.js}'],
      // cli: {
      //   migrationsDir: 'src/migrations',
      // },
    }),
    UserModule,
    BoardModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
