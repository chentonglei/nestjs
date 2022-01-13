import { Injectable, Dependencies } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../../entities';

@Injectable()
@Dependencies(getRepositoryToken(User))
export class HelloService {
  constructor(user) {
    this.user = user;
  }
  async getHello(data) {
    const num = await this.user.findOne(data.id); //查询全部 ===findAll findOne查询一个
    /* const num = await this.user.insert(data); //添加 */
    /* const num = await this.user.update(data.id, data); //更新 */
    /* const num = await this.user.delete(data.id); //删除 */
    return num;
  }
  getHello2() {
    return 'Hello Worldhahaha!';
  }
}
