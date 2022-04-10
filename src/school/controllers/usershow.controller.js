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
export class UserShowController {
  constructor(schoolService) {
    this.schoolService = schoolService;
  }
  @Post('UserShow') //获取列表
  @Bind(Body()) //data为body的数据
  async getList() {
    return await this.schoolService.getUserList();
  }
}
