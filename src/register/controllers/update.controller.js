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
export class UpdateController {
  constructor(showService) {
    this.showService = showService;
  }
  @Post('update') //更新个人信息
  @Bind(Body()) //data为body的数据
  async getList(data) {
    return await this.showService.getUpdate(data);
  }
}
