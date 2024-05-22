import {
  TypeOrmModuleOptions,
  TypeOrmOptionsFactory,
} from '@nestjs/typeorm/dist/interfaces/typeorm-options.interface';
import { Injectable } from '@nestjs/common';
import { baseConfig } from '@/database/database.config';

@Injectable()
export class DatabaseFactoryService implements TypeOrmOptionsFactory {
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return baseConfig;
  }
}
