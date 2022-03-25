import { Module } from '@nestjs/common';
import SchoolControllers from './controllers';
import SchoolService from './services';
import { TypeOrmModule } from '@nestjs/typeorm';
import entities from '../entities';

@Module({
  imports: [TypeOrmModule.forFeature(entities)],
  controllers: SchoolControllers,
  providers: [...SchoolService],
})
export class SchoolModule {}
