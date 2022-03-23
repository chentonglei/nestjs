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
export class ShowController {
  constructor(lostService) {
    this.lostService = lostService;
  }
  @Post('show') //获取列表
  @Bind(Body()) //data为body的数据
  async getList(data) {
    const { current, pageSize, ...searchKeys } = data;
    return await this.lostService.getList(current, pageSize, searchKeys);
  }
}
