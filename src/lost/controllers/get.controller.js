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
export class GetController {
  constructor(lostService) {
    this.lostService = lostService;
  }
  @Post('get') //获取列表
  @Bind(Body()) //data为body的数据
  async get(data) {
    return await this.lostService.get(data);
  }
}
