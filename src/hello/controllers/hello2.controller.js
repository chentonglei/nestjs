import {
  Controller,
  Dependencies,
  Get,
  Post,
  Body,
  Bind,
} from '@nestjs/common';
import { Hello2Service } from '../services/hello2.service';

@Controller('/hello2')
@Dependencies(Hello2Service)
export class Hello2Controller {
  constructor(hello2Service) {
    this.hello2Service = hello2Service;
  }
  @Post()
  @Bind(Body()) //将body的内容存放起来到gethello2里的第一个参数 可两个即两个参数 @Bind(Param('id'), Body()) update(id, updateCatDto) {
  getHello2(data) {
    const { id, message } = data;
    return this.hello2Service.getHello2(id, message);
  }
}
