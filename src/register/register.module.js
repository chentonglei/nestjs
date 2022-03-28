import { Module } from '@nestjs/common';
import ShowControllers from './controllers';
import ShowService from './services';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import entities from '../entities';

@Module({
  imports: [
    JwtModule.register({
      secret: 'admin-secret',
      signOptions: { expiresIn: '24h' },
    }),
    TypeOrmModule.forFeature(entities),
  ],
  controllers: ShowControllers,
  providers: [...ShowService],
})
export class RegisterModule {}
