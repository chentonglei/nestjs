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
export class IntroductionController {
  constructor(introductionService) {
    this.introductionService = introductionService;
  }
  @Post('show') //获取列表
  @Bind(Body()) //data为body的数据
  async getList(data) {
    const { current, pageSize, ...searchKeys } = data;
    return await this.introductionService.getList(
      current,
      pageSize,
      searchKeys,
    );
  }
}
