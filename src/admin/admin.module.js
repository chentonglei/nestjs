import { Module } from '@nestjs/common';
import AdminControllers from './controllers';
import AdminServices from './services';

@Module({
  imports: [],
  controllers: AdminControllers,
  providers: [...AdminServices],
})
export class AdminModule {}
