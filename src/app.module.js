import { Module } from '@nestjs/common';
import { RegisterModule } from './register/register.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IntroductionModule } from './introduction/introduction.module';
import { LostModule } from './lost/lost.module';
import { ReturnModule } from './return/return.module';
import { RecruitModule } from './recruit/recruit.module';
import { CommentModule } from './comment/comment.module';
import { SchoolModule } from './school/school.module';

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
    IntroductionModule,
    LostModule,
    ReturnModule,
    RecruitModule,
    CommentModule,
    SchoolModule,
  ],
  /*   controllers: [AppController],
  providers: [AppService], */
})
export class AppModule {}
