import { Injectable, Dependencies } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { SearchSource } from '../../../node_modules/jest/build/jest';
import { Return, Lost, Recruit } from '../../entities';

@Injectable()
@Dependencies(
  getRepositoryToken(Return),
  getRepositoryToken(Lost),
  getRepositoryToken(Recruit),
)
export class ReturnService {
  constructor(returninfo, lost, recruit) {
    this.returninfo = returninfo;
    this.lost = lost;
    this.recruit = recruit;
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
  async getOneShow(body) {
    var data = [];
    const message = await this.returninfo.find({
      where: {
        Return_people_id: body.Return_people_id,
      },
      order: { Return_id: 'DESC' },
    });
    for (var i = 0; i < message.length; i++) {
      if (message[i].Return_type === '失物') {
        var one = await this.lost.findOne({
          Lost_id: message[i].Return_message_id,
        });
        data.push({ ...one, isModalVisible: '失物' });
      }
      if (message[i].Return_type === '招领') {
        var one = await this.recruit.findOne({
          Rec_id: message[i].Return_message_id,
        });
        data.push({ ...one, isModalVisible: '招领' });
      }
    }
    return { data };
  }
  async deleteinfo(data) {
    const num = await this.returninfo.delete(data.Return_id);
    if (data.isModalVisible === '失物')
      var message = await this.lost.update(
        { Lost_id: data.id },
        { Return_id: null, Lost_status: '未找到' },
      );
    else
      var message = await this.recruit.update(
        { Rec_id: data.id },
        { Return_id: null, Rec_status: '未归还' },
      );
    if (num.affected >= 1) return { result: 'true', msg: '删除成功' };
    else return { result: 'false', msg: '删除失败，请重试' };
  }
}
