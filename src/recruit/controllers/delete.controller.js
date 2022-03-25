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
export class DeleteController {
  constructor(recruitService) {
    this.recruitService = recruitService;
  }
  @Post('delete') //审核同意/拒绝
  @Bind(Body()) //data为body的数据
  async getDelete(data) {
    return await this.recruitService.getDelete(data.array);
  }
}
