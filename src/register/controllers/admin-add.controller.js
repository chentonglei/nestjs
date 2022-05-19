import {
  Controller,
  Dependencies,
  Get,
  Post,
  Body,
  Bind,
} from '@nestjs/common';
import { AdminLoginService } from '../services/admin-login.service';

@Controller('register')
@Dependencies(AdminLoginService)
export class AdminAddController {
  constructor(adminLoginService) {
    this.adminLoginService = adminLoginService;
  }
  @Post('AdminAdd') //初始化密码
  @Bind(Body()) //data为body的数据
  async getList(data) {
    return await this.adminLoginService.adminadd(data);
  }
}
