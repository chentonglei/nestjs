import {
  Controller,
  Dependencies,
  Get,
  Post,
  Body,
  Bind,
} from '@nestjs/common';
import { ChartService } from '../services/chart.service';

@Controller('chart')
@Dependencies(ChartService)
export class SchoolController {
  constructor(chartService) {
    this.chartService = chartService;
  }
  @Post('school') //获取列表
  async getSchool() {
    return await this.chartService.getSchool();
  }
}
