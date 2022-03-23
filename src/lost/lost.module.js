import { Module } from '@nestjs/common';
import LostControllers from './controllers';
import LostService from './services';
import { TypeOrmModule } from '@nestjs/typeorm';
import entities from '../entities';

@Module({
  imports: [TypeOrmModule.forFeature(entities)],
  controllers: LostControllers,
  providers: [...LostService],
})
export class LostModule {}
