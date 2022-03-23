import {
  Controller,
  Dependencies,
  Get,
  Post,
  Body,
  Bind,
} from '@nestjs/common';
import { ReturnService } from '../services/return.service';

@Controller('return')
@Dependencies(ReturnService)
export class ShowController {
  constructor(returnService) {
    this.returnService = returnService;
  }
  @Post('show') //获取列表
  @Bind(Body()) //data为body的数据
  async getInfo(data) {
    return await this.returnService.getInfo(data);
  }
}
