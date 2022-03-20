import {
  Controller,
  Dependencies,
  Get,
  Post,
  Body,
  Bind,
} from '@nestjs/common';
import { ShowService } from '../services/show.service';

@Controller('register')
@Dependencies(ShowService)
export class DoitController {
  constructor(showService) {
    this.showService = showService;
  }
  @Post('doit') //审核同意/拒绝
  @Bind(Body()) //data为body的数据
  async getDoit(data) {
    return await this.showService.getDoit(data);
  }
}
