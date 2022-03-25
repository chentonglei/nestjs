import {
  Controller,
  Dependencies,
  Get,
  Post,
  Body,
  Bind,
} from '@nestjs/common';
import { SchoolService } from '../services/school.service';

@Controller('school')
@Dependencies(SchoolService)
export class ShowController {
  constructor(schoolService) {
    this.schoolService = schoolService;
  }
  @Post('show') //获取列表
  @Bind(Body()) //data为body的数据
  async getList(data) {
    const { current, pageSize, ...searchKeys } = data;
    return await this.schoolService.getList(current, pageSize, searchKeys);
  }
}
