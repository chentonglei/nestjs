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
export class CertificationController {
  constructor(showService) {
    this.showService = showService;
  }
  @Post('certification') //初始化密码
  @Bind(Body()) //data为body的数据
  async getList(data) {
    return await this.showService.getCertification(data);
  }
}
