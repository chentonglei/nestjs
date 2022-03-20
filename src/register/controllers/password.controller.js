import {
  Controller,
  Dependencies,
  Get,
  Post,
  Body,
  Bind,
} from '@nestjs/common';
import { ShowService } from '../services/show.service';

@Controller('register')
@Dependencies(ShowService)
export class PasswordController {
  constructor(showService) {
    this.showService = showService;
  }
  @Post('password') //初始化密码
  @Bind(Body()) //data为body的数据
  async getList(data) {
    return await this.showService.getPassword(data);
  }
}
