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
export class ShowController {
  constructor(chartService) {
    this.chartService = chartService;
  }
  @Post('welcome') //获取列表
  @Bind(Body()) //data为body的数据
  async getWelcome(data) {
    return await this.chartService.getWelcome(data);
  }
}
