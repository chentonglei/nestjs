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
export class DoitController {
  constructor(lostService) {
    this.lostService = lostService;
  }
  @Post('doit') //审核同意/拒绝
  @Bind(Body()) //data为body的数据
  async getDoit(data) {
    return await this.lostService.getDoit(data);
  }
}
