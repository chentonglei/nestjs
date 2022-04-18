import {
  Controller,
  Dependencies,
  Get,
  Post,
  Body,
  Bind,
} from '@nestjs/common';
import { RecruitService } from '../services/recruit.service';

@Controller('recruit')
@Dependencies(RecruitService)
export class OneShowController {
  constructor(recruitService) {
    this.recruitService = recruitService;
  }
  @Post('OneShow') //获取列表
  @Bind(Body()) //data为body的数据
  async getList(data) {
    return await this.recruitService.getOneList(data);
  }
}
