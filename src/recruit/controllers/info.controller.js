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
export class InfoController {
  constructor(recruitService) {
    this.recruitService = recruitService;
  }
  @Post('info') //获取列表
  @Bind(Body()) //data为body的数据
  async getInfo(data) {
    return await this.recruitService.getInfo(data);
  }
}
