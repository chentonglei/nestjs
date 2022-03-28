import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AdminLoginService } from '../register/services/admin-login.service';

@Injectable()
export class AdminGuard {
  async canActivate(context) {
    const request = context.switchToHttp().getRequest();
    // 读取token
    const authorization = request.header('authorization');
    // 当用户没有token，说明用户没有登录。
    if (!authorization) {
      return false;
    }
    return this.AdminLoginService.validateToken(authorization.slice(7));
  }
}
