import { Module } from '@nestjs/common';
import ShowControllers from './controllers';
import ShowService from './services';
import { TypeOrmModule } from '@nestjs/typeorm';
import entities from '../entities';

@Module({
  imports: [TypeOrmModule.forFeature(entities)],
  controllers: ShowControllers,
  providers: [...ShowService],
})
export class RegisterModule {}
