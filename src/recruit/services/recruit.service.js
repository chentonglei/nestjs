import { Injectable, Dependencies } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Recruit, Comment, Return } from '../../entities';
import moment from 'moment';
@Injectable()
@Dependencies(
  getRepositoryToken(Recruit),
  getRepositoryToken(Comment),
  getRepositoryToken(Return),
)
export class RecruitService {
  constructor(recruit, comment, returnmessage) {
    this.recruit = recruit;
    this.comment = comment;
    this.returnmessage = returnmessage;
  }
  async getList(current, pageSize, searchKeys) {
    //获取列表信息
    //获取符合条件的总数 即数据库中数量
    const total = await this.recruit
      .createQueryBuilder()
      .where(searchKeys.Rec_id ? 'Rec_id LIKE :id' : {})
      .andWhere(searchKeys.Rec_time ? 'Rec_time LIKE :time' : {})
      .andWhere(searchKeys.Rec_where ? 'Rec_where LIKE :where' : {})
      .andWhere(searchKeys.Rec_content ? 'Rec_content LIKE :content' : {})
      .andWhere(searchKeys.Rec_status ? 'Rec_status LIKE :status' : {})
      .andWhere(searchKeys.Rec_send_time ? 'Rec_send_time LIKE :send_time' : {})
      .andWhere(searchKeys.Rec_people_id ? 'Rec_people_id LIKE :people_id' : {})
      .andWhere(
        searchKeys.Rec_people_name ? 'Rec_people_name LIKE :people_name' : {},
      )
      .andWhere(
        searchKeys.Rec_people_phone
          ? 'Rec_people_phone LIKE :people_phone'
          : {},
      )
      .setParameters({
        id: `%${searchKeys.Rec_id}%`,
        time: `%${searchKeys.Rec_time}%`,
        where: `%${searchKeys.Rec_where}%`,
        content: `%${searchKeys.Rec_content}%`,
        status: `%${searchKeys.Rec_status}%`,
        send_time: `%${searchKeys.Rec_send_time}%`,
        people_id: `%${searchKeys.Rec_people_id}%`,
        people_name: `%${searchKeys.Rec_people_name}%`,
        people_phone: `%${searchKeys.Rec_people_phone}%`,
      })
      .getCount();
    const message = await this.recruit
      .createQueryBuilder()
      .where(searchKeys.Rec_id ? 'Rec_id LIKE :id' : {})
      .andWhere(searchKeys.Rec_time ? 'Rec_time LIKE :time' : {})
      .andWhere(searchKeys.Rec_where ? 'Rec_where LIKE :where' : {})
      .andWhere(searchKeys.Rec_content ? 'Rec_content LIKE :content' : {})
      .andWhere(searchKeys.Rec_status ? 'Rec_status LIKE :status' : {})
      .andWhere(searchKeys.Rec_send_time ? 'Rec_send_time LIKE :send_time' : {})
      .andWhere(searchKeys.Rec_people_id ? 'Rec_people_id LIKE :people_id' : {})
      .andWhere(
        searchKeys.Rec_people_name ? 'Rec_people_name LIKE :people_name' : {},
      )
      .andWhere(
        searchKeys.Rec_people_phone
          ? 'Rec_people_phone LIKE :people_phone'
          : {},
      )
      .setParameters({
        id: `%${searchKeys.Rec_id}%`,
        time: `%${searchKeys.Rec_time}%`,
        where: `%${searchKeys.Rec_where}%`,
        content: `%${searchKeys.Rec_content}%`,
        status: `%${searchKeys.Rec_status}%`,
        send_time: `%${searchKeys.Rec_send_time}%`,
        people_id: `%${searchKeys.Rec_people_id}%`,
        people_name: `%${searchKeys.Rec_people_name}%`,
        people_phone: `%${searchKeys.Rec_people_phone}%`,
      })
      .skip((current - 1) * pageSize)
      .take(pageSize) //分页操作
      .getMany();
    /* const num = await this.user.insert(data); //添加 */
    /* const num = await this.user.update(data.id, data); //更新 */
    /* const num = await this.user.delete(data.id); //删除 */
    return { data: message, success: true, total };
  }
  async getDelete(array) {
    var sum = 0;
    for (var i = 0; i < array.length; i++) {
      const num = await this.recruit.delete(array[i]);
      await this.comment.delete({ Com_type_id: array[i], Com_type: '招领' });
      await this.returnmessage.delete({
        Return_message_id: array[i],
        Return_type: '招领',
      });
      if (num.affected >= 1) sum += num.affected;
    }
    if (sum >= 1)
      return {
        result: 'true',
        msg: `删除成功`,
      };
    else return { result: 'false', msg: '删除失败，请重试' };
  }
  async getUserList(data) {
    var message;
    if (data.Sch_name === '全部学校')
      message = await this.recruit.find({ Rec_status: '未归还' });
    else
      message = await this.recruit.find({
        Rec_status: '未归还',
        Sch_name: data.Sch_name,
      });
    return { data: message };
  }
  async getSend(data) {
    const num = await this.recruit.insert({
      ...data,
      Rec_send_time: moment().format('YYYY-MM-DD HH:mm'),
    });
    if (num.raw.affectedRows >= 1) return { result: 'true', msg: '添加成功' };
    else return { result: 'false', msg: '添加失败，请重试' };
  }
  async getInfo(data) {
    const message = await this.recruit.findOne({ Rec_id: data.Rec_id });
    return { data: message };
  }
  async get(data) {
    const message = await this.returnmessage.insert({
      ...data,
      Return_type: '招领',
      Return_time: moment().format('YYYY-MM-DD HH:mm'),
    });
    const Return_id = message.identifiers[0].Return_id; //递增的值
    const num = await this.recruit.update(data.Return_message_id, {
      Return_id,
      Rec_status: '已归还',
    }); //添加
    if (num.affected >= 1) return { result: 'true', msg: '修改成功' };
    else return { result: 'false', msg: '修改失败，请重试' };
  }
}
