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
export class AdminPwdController {
  constructor(adminLoginService) {
    this.adminLoginService = adminLoginService;
  }
  @Post('AdminPwd') //初始化密码
  @Bind(Body()) //data为body的数据
  async getList(data) {
    return await this.adminLoginService.pwd(data);
  }
}
