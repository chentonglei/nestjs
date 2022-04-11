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
export class AddController {
  constructor(schoolService) {
    this.schoolService = schoolService;
  }
  @Post('add') //审核同意/拒绝
  @Bind(Body()) //data为body的数据
  async getAdd(data) {
    return await this.schoolService.getAdd(data);
  }
}
