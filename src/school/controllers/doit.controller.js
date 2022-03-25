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
export class DoitController {
  constructor(schoolService) {
    this.schoolService = schoolService;
  }
  @Post('doit') //审核同意/拒绝
  @Bind(Body()) //data为body的数据
  async getDoit(data) {
    return await this.schoolService.getDoit(data);
  }
}
