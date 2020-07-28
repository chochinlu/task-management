import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

export const getYypeOrmConfig = (
  configService: ConfigService,
): TypeOrmModuleOptions => ({
  type: 'postgres',
  host: configService.get<string>('host'),
  port: 5432,
  username: configService.get<string>('user'),
  password: configService.get<string>('password'),
  database: configService.get<string>('db'),
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: true,
  retryAttempts: 1,
});
