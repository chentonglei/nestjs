import {
  Controller,
  Dependencies,
  Get,
  Post,
  Body,
  Bind,
} from '@nestjs/common';
import { RegisterService } from '../services/register.service';

@Controller('/register')
@Dependencies(RegisterService)
export class RegisterController {
  constructor(registerService) {
    this.registerService = registerService;
  }
  @Post()
  @Bind(Body()) //将body的内容存放起来到gethello2里的第一个参数 可两个即两个参数 @Bind(Param('id'), Body()) update(id, updateCatDto) {
  async getHello2(data) {
    const data2 = {
      id: data.Re_id,
      password: data.Re_password,
    };

    return await this.registerService.register(data2);
  }
}
