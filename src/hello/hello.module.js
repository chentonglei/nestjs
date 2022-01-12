import { Module } from '@nestjs/common';
import HelloControllers from './controllers';
import HelloServices from './services';
import { TypeOrmModule } from '@nestjs/typeorm';
import entities from '../entities';

@Module({
  imports: [TypeOrmModule.forFeature(entities)],
  controllers: HelloControllers,
  providers: [...HelloServices],
})
export class HelloModule {}
