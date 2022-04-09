import {
  Controller,
  Dependencies,
  Get,
  Post,
  Body,
  Bind,
  UseGuards,
} from '@nestjs/common';
import { ChartService } from '../services/chart.service';
@Controller('chart')
@Dependencies(ChartService)
export class LostController {
  constructor(chartService) {
    this.chartService = chartService;
  }
  @Post('lost') //获取列表
  @Bind(Body()) //data为body的数据
  async getLost(data) {
    return await this.chartService.getLost(data);
  }
}
