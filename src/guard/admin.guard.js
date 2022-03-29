import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AdminLoginService } from '../register/services/admin-login.service';

@Injectable()
export class AdminGuard {
  async canActivate(context) {
    const request = context.switchToHttp().getRequest();
    // 读取token
    const token = request.header('token');
    // 当用户没有token，说明用户没有登录。
    if (!token) {
      return false;
    }
    return this.AdminLoginService.validateToken(token);
  }
}
