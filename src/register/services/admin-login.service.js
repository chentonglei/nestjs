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
    const decodeAdminInfo = this.jwtService.decode(token);
    if (typeof decodeAdminInfo == 'object') {
      const data = await this.register.findOne({
        Re_id: decodeAdminInfo.Re_id,
        Re_power: decodeAdminInfo.Re_power,
      });
      return { data };
    } else {
      throw new HttpException(
        `登陆状态失效，token解析失败，解析结果不为对象。`,
        401,
      );
    }
  }
  async pwd(data) {
    const admin = await this.register.findOne({
      Re_id: data.Re_id,
      Re_power: data.Re_power,
    });
    if (admin.Re_password === data.Re_old_password) {
      const num = await this.register.update(
        { Re_id: data.Re_id, Re_power: data.Re_power },
        {
          Re_password: data.Re_password,
        },
      );
      if (num.affected >= 1) return { result: 'true', msg: '修改成功' };
      else return { result: 'false', msg: '修改化失败，请重试' };
    } else return { result: 'false', msg: '旧密码错误' };
  }
  async add(data) {
    const num = await this.register.insert({
      Re_id: data.Re_id,
      Re_password: data.Re_password,
      Re_name: data.Re_name,
      Re_power: 'admin',
      Re_status: 'admin',
    });
    if (num.raw.affectedRows >= 1) return { result: 'true', msg: '添加成功' };
    else return { result: 'false', msg: '添加失败，请重试' };
  }
  async userlogin(data) {
    const user = await this.register.findOne({
      Re_id: data.Re_id,
      Re_password: data.Re_password,
      Re_power: data.Re_power,
    });
    if (user) return { status: '登录成功', user };
    else return { status: '登录失败' };
  }
  async useradd(data) {
    const num = await this.register.insert({
      Re_id: data.Re_id,
      Re_password: data.Re_password,
      Re_name: data.Re_name,
      Re_telephone: data.Re_telephone,
      Re_power: 'user',
      Re_status: '未提交认证信息',
    });
    if (num.raw.affectedRows >= 1) return { result: 'true', msg: '注册成功' };
    else return { result: 'false', msg: '账号重复' };
  }
}
