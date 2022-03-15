import { Module } from '@nestjs/common';
import { RegisterModule } from './register/register.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '123456',
      database: 'lost', //数据库名
      autoLoadEntities: true, //// 每个通过forFeature()注册的实体都会自动添加到配置对象的entities数组中
      synchronize: false, //同步数据库 false就不会乱改数据库导致修改长度 非空等
    }),
    RegisterModule,
  ],
  /*   controllers: [AppController],
  providers: [AppService], */
})
export class AppModule {}
