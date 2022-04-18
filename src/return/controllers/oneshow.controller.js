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
export class OneShowController {
  constructor(returnService) {
    this.returnService = returnService;
  }
  @Post('OneShow') //获取列表
  @Bind(Body()) //data为body的数据
  async getInfo(data) {
    return await this.returnService.getOneShow(data);
  }
}
