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
export class ShowController {
  constructor(recruitService) {
    this.recruitService = recruitService;
  }
  @Post('show') //获取列表
  @Bind(Body()) //data为body的数据
  async getList(data) {
    const { current, pageSize, school_id, ...searchKeys } = data;
    return await this.recruitService.getList(
      current,
      pageSize,
      school_id,
      searchKeys,
    );
  }
}
