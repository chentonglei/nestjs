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
export class OneShowController {
  constructor(lostService) {
    this.lostService = lostService;
  }
  @Post('OneShow') //获取列表
  @Bind(Body()) //data为body的数据
  async getList(data) {
    return await this.lostService.getOneList(data);
  }
}
