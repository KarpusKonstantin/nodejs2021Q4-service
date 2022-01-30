import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { POSTGRES_DB, POSTGRES_PASSWORD, POSTGRES_PORT, POSTGRES_USER } from './common/config';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'postgres',
      port: Number(POSTGRES_PORT),
      username: POSTGRES_USER,
      password: POSTGRES_PASSWORD,
      database: POSTGRES_DB,
      // entities: [
      //   'src/resources/tasks/task.model.ts',
      //   'src/resources/boards/board.model.ts',
      //   'src/resources/columns/column.model.ts',
      //   'src/resources/users/user.model.ts'
      // ],

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
    UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
