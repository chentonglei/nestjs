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
export class UserShowController {
  constructor(recruitService) {
    this.recruitService = recruitService;
  }
  @Post('UserShow') //获取列表
  @Bind(Body()) //data为body的数据
  async getList() {
    return await this.recruitService.getUserList();
  }
}
