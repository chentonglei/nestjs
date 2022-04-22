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
export class UserCertificationController {
  constructor(showService) {
    this.showService = showService;
  }
  @Post('UserCertification') //审核同意/拒绝
  @Bind(Body()) //data为body的数据
  async UserCertification(data) {
    return await this.showService.UserCertification(data);
  }
}
