import {
  Controller,
  Dependencies,
  Get,
  Post,
  Body,
  Bind,
  Request,
} from '@nestjs/common';
import { AdminLoginService } from '../services/admin-login.service';

@Controller('register')
@Dependencies(AdminLoginService)
export class AdminInfoController {
  constructor(adminLoginService) {
    this.adminLoginService = adminLoginService;
  }
  @Post('getAdminInfo') //初始化密码
  @Bind(Request()) //获取request
  async getInfo(req) {
    /* console.log(req); */
    return await this.adminLoginService.tokenToAdmin(req);
  }
}
