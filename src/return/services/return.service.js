import { Injectable, Dependencies } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { SearchSource } from '../../../node_modules/jest/build/jest';
import { Return } from '../../entities';

@Injectable()
@Dependencies(getRepositoryToken(Return))
export class ReturnService {
  constructor(returninfo) {
    this.returninfo = returninfo;
  }
  async getInfo(data) {
    //获取列表信息
    //获取符合条件的总数 即数据库中数量
    if (data.Return_id) {
      const msg = await this.returninfo.findOne(data.Return_id);
      return msg;
    } else return;
    /* const num = await this.user.insert(data); //添加 */
    /* const num = await this.user.update(data.id, data); //更新 */
    /* const num = await this.user.delete(data.id); //删除 */
  }
}
