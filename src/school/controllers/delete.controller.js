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
export class DeleteController {
  constructor(schoolService) {
    this.schoolService = schoolService;
  }
  @Post('delete') //审核同意/拒绝
  @Bind(Body()) //data为body的数据
  async getDelete(data) {
    return await this.schoolService.getDelete(data);
  }
}
