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
export class DeleteController {
  constructor(introductionService) {
    this.introductionService = introductionService;
  }
  @Post('delete') //获取列表
  @Bind(Body()) //data为body的数据
  async getDelete(data) {
    return await this.introductionService.getDelete(data);
  }
}
