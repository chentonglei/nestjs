import {
  Controller,
  Dependencies,
  Get,
  Post,
  Body,
  Bind,
} from '@nestjs/common';
import { LostService } from '../services/lost.service';

@Controller('lost')
@Dependencies(LostService)
export class UserShowController {
  constructor(lostService) {
    this.lostService = lostService;
  }
  @Post('UserShow') //获取列表
  @Bind(Body()) //data为body的数据
  async getList() {
    return await this.lostService.getUserList();
  }
}
