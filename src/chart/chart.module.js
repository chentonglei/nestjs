import { Module } from '@nestjs/common';
import ChartControllers from './controllers';
import ChartService from './services';
import { TypeOrmModule } from '@nestjs/typeorm';
import entities from '../entities';
@Module({
  imports: [TypeOrmModule.forFeature(entities)],
  controllers: ChartControllers,
  providers: [...ChartService],
})
export class ChartModule {}
