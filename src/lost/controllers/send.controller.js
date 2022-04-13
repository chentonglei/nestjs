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
export class SendController {
  constructor(lostService) {
    this.lostService = lostService;
  }
  @Post('send') //审核同意/拒绝
  @Bind(Body()) //data为body的数据
  async getSend(data) {
    return await this.lostService.getSend(data);
  }
}
