import {
  Controller,
  Dependencies,
  Get,
  Post,
  Body,
  Bind,
} from '@nestjs/common';
import { IntroductionService } from '../services/introduction.service';

@Controller('introduction')
@Dependencies(IntroductionService)
export class UpdateController {
  constructor(introductionService) {
    this.introductionService = introductionService;
  }
  @Post('update') //获取列表
  @Bind(Body()) //data为body的数据
  async getUpdate(data) {
    return await this.introductionService.getUpdate(data);
  }
}
