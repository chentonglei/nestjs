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
export class UserController {
  constructor(chartService) {
    this.chartService = chartService;
  }
  @Post('user') //获取列表
  async getUser() {
    return await this.chartService.getUser();
  }
}
