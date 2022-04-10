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
export class UserShowController {
  constructor(introductionService) {
    this.introductionService = introductionService;
  }
  @Post('UserShow') //获取列表
  @Bind(Body()) //data为body的数据
  async getList() {
    return await this.introductionService.getUserList();
  }
}
