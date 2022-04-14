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
export class InfoController {
  constructor(lostService) {
    this.lostService = lostService;
  }
  @Post('info') //获取列表
  @Bind(Body()) //data为body的数据
  async getInfo(data) {
    return await this.lostService.getInfo(data);
  }
}
