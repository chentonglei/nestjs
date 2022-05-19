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
export class DeleteController {
  constructor(returnService) {
    this.returnService = returnService;
  }
  @Post('delete') //获取列表
  @Bind(Body()) //data为body的数据
  async deleteinfo(data) {
    return await this.returnService.deleteinfo(data);
  }
}
