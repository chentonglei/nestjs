import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Dependencies,
} from '@nestjs/common';
import { AdminLoginService } from '../register/services/admin-login.service';

@Injectable()
@Dependencies(AdminLoginService)
export class AdminGuard {
  constructor(adminLoginService) {
    this.adminLoginService = adminLoginService;
  }
  async canActivate(context) {
    const request = context.switchToHttp().getRequest();
    // 读取token
    const token = request.header('token');
    // 当用户没有token，说明用户没有登录。
    if (!token) {
      return false;
    }
    return this.adminLoginService.validateToken(token);
  }
}
