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
export class DeleteController {
  constructor(lostService) {
    this.lostService = lostService;
  }
  @Post('delete') //审核同意/拒绝
  @Bind(Body()) //data为body的数据
  async getDelete(data) {
    return await this.lostService.getDelete(data.array);
  }
}
