import { Module } from '@nestjs/common';
import RecruitControllers from './controllers';
import RecruitService from './services';
import { TypeOrmModule } from '@nestjs/typeorm';
import entities from '../entities';

@Module({
  imports: [TypeOrmModule.forFeature(entities)],
  controllers: RecruitControllers,
  providers: [...RecruitService],
})
export class RecruitModule {}
