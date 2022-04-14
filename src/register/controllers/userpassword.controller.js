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
export class UserPasswordController {
  constructor(showService) {
    this.showService = showService;
  }
  @Post('UserPassword') //初始化密码
  @Bind(Body()) //data为body的数据
  async getchangepwd(data) {
    return await this.showService.getchangepwd(data);
  }
}
