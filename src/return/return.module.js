import { Module } from '@nestjs/common';
import ReturnControllers from './controllers';
import ReturnService from './services';
import { TypeOrmModule } from '@nestjs/typeorm';
import entities from '../entities';

@Module({
  imports: [TypeOrmModule.forFeature(entities)],
  controllers: ReturnControllers,
  providers: [...ReturnService],
})
export class ReturnModule {}
