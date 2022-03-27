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
export class ReturnController {
  constructor(chartService) {
    this.chartService = chartService;
  }
  @Post('return') //获取列表
  @Bind(Body()) //data为body的数据
  async getReturn(data) {
    return await this.chartService.getReturn(data);
  }
}
