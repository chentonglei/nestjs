import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminModule } from './admin/admin.module';
import { HelloModule } from './hello/hello.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '123456',
      database: 'scm', //数据库名
      autoLoadEntities: true, //// 每个通过forFeature()注册的实体都会自动添加到配置对象的entities数组中
      synchronize: true,
    }),
    AdminModule,
    HelloModule,
  ],
  /*   controllers: [AppController],
  providers: [AppService], */
})
export class AppModule {}
