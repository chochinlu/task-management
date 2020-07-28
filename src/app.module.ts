import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as path from 'path';
import databaseConfig from './config/database.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        ({
          type: 'postgres',
          host: configService.get<string>('host'),
          port: 5432,
          username: configService.get<string>('user'),
          password: configService.get<string>('password'),
          database: configService.get<string>('db'),
          // entities: [__dirname + '/../**/*.entity.{js,ts}'],
          entities: [path.join(__dirname, '**', `*.entity.{ts,js}`)],
          synchronize: true,
          retryAttempts: 1,
        } as TypeOrmModuleOptions),
    }),
    TasksModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
