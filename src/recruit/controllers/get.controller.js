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
export class GetController {
  constructor(recruitService) {
    this.recruitService = recruitService;
  }
  @Post('get') //审核同意/拒绝
  @Bind(Body()) //data为body的数据
  async get(data) {
    return await this.recruitService.get(data);
  }
}
