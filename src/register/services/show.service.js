import { Injectable, Dependencies } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Register } from '../../entities';

@Injectable()
@Dependencies(getRepositoryToken(Register))
export class ShowService {
  constructor(register) {
    this.register = register;
  }
  async getList() {
    const num = await this.register.find(); //查询全部 ===find findOne查询一个
    /* const num = await this.user.insert(data); //添加 */
    /* const num = await this.user.update(data.id, data); //更新 */
    /* const num = await this.user.delete(data.id); //删除 */
    return num;
  }
}
