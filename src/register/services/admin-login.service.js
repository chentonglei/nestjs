import { Injectable, Dependencies, HttpException } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { SearchSource } from '../../../node_modules/jest/build/jest';
import { Like } from '../../../node_modules/typeorm/index';
import { Register } from '../../entities';
import { JwtService } from '@nestjs/jwt';

@Injectable()
@Dependencies(getRepositoryToken(Register), JwtService)
export class AdminLoginService {
  constructor(register, jwtService) {
    this.register = register;
    this.jwtService = jwtService;
  }
  async login(data) {
    console.log(data);
    const admin = await this.register.findOne({
      Re_id: data.Re_id,
      Re_password: data.Re_password,
      Re_power: data.Re_power,
    });
    if (!admin) {
      throw new HttpException(`登陆失败！账号或密码错误`, 401);
    }
    // 生成token并返回
    const payload = {
      Re_id: data.Re_id,
      Re_password: data.Re_password,
      Re_power: data.Re_power,
    };
    const token = this.jwtService.sign(payload);
    return { token };
  }
  async validateToken(token) {
    try {
      this.jwtService.verify(token);
      return true;
    } catch (error) {
      throw new HttpException(`登陆状态失效，${error.message}`, 401);
    }
  }

  // req的token转管理员
  async tokenToAdmin(req) {
    const token = req.header('token');
    console.log(token);
    const decodeAdminInfo = this.jwtService.decode(token);
    if (typeof decodeAdminInfo == 'object') {
      const { password, ...admin } = await this.register.findOne({
        Re_id: decodeAdminInfo.Re_id,
        Re_power: decodeAdminInfo.Re_power,
      });
      return admin;
    } else {
      throw new HttpException(
        `登陆状态失效，token解析失败，解析结果不为对象。`,
        401,
      );
    }
  }
}
