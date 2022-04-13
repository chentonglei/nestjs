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
export class SendController {
  constructor(recruitService) {
    this.recruitService = recruitService;
  }
  @Post('send') //审核同意/拒绝
  @Bind(Body()) //data为body的数据
  async getSend(data) {
    return await this.recruitService.getSend(data);
  }
}
