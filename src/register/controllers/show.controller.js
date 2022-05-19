import {
  Controller,
  Dependencies,
  Get,
  Post,
  Body,
  Bind,
} from '@nestjs/common';
import { ShowService } from '../services/show.service';

@Controller('register')
@Dependencies(ShowService)
export class ShowController {
  constructor(showService) {
    this.showService = showService;
  }
  @Post('show') //获取列表
  @Bind(Body()) //data为body的数据
  async getList(data) {
    const { current, pageSize, Re_school_id, ...searchKeys } = data;
    return await this.showService.getList(
      current,
      pageSize,
      Re_school_id,
      searchKeys,
    );
  }
}
