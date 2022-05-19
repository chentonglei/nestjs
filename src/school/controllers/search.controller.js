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
export class SearchController {
  constructor(schoolService) {
    this.schoolService = schoolService;
  }
  @Post('search') //审核同意/拒绝
  @Bind(Body()) //data为body的数据
  async search(data) {
    return await this.schoolService.search(data);
  }
}
