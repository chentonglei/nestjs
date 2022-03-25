import { Module } from '@nestjs/common';
import CommentControllers from './controllers';
import CommentService from './services';
import { TypeOrmModule } from '@nestjs/typeorm';
import entities from '../entities';

@Module({
  imports: [TypeOrmModule.forFeature(entities)],
  controllers: CommentControllers,
  providers: [...CommentService],
})
export class CommentModule {}
