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
export class AddController {
  constructor(introductionService) {
    this.introductionService = introductionService;
  }
  @Post('add') //获取列表
  @Bind(Body()) //data为body的数据
  async getAdd(data) {
    return await this.introductionService.getAdd(data);
  }
}
