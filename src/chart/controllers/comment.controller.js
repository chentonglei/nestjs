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
export class CommentController {
  constructor(chartService) {
    this.chartService = chartService;
  }
  @Post('comment') //获取列表
  @Bind(Body()) //data为body的数据
  async getComment(data) {
    return await this.chartService.getComment(data);
  }
}
