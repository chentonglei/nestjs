import { Module } from '@nestjs/common';
import IntroductionControllers from './controllers';
import IntroductionService from './services';
import { TypeOrmModule } from '@nestjs/typeorm';
import entities from '../entities';

@Module({
  imports: [TypeOrmModule.forFeature(entities)],
  controllers: IntroductionControllers,
  providers: [...IntroductionService],
})
export class IntroductionModule {}
