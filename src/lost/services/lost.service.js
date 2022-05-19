import { Injectable, Dependencies } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Lost, Comment, Return } from '../../entities';
import moment from 'moment';
@Injectable()
@Dependencies(
  getRepositoryToken(Lost),
  getRepositoryToken(Comment),
  getRepositoryToken(Return),
)
export class LostService {
  constructor(lost, comment, returnmessage) {
    this.lost = lost;
    this.comment = comment;
    this.returnmessage = returnmessage;
  }
  async getList(current, pageSize, school_id, searchKeys) {
    //获取列表信息
    //获取符合条件的总数 即数据库中数量
    const total = await this.lost
      .createQueryBuilder()
      .where(searchKeys.Lost_id ? 'Lost_id LIKE :id' : {})
      .andWhere(searchKeys.Lost_time ? 'Lost_time LIKE :time' : {})
      .andWhere(searchKeys.Lost_where ? 'Lost_where LIKE :where' : {})
      .andWhere(searchKeys.Lost_content ? 'Lost_content LIKE :content' : {})
      .andWhere(searchKeys.Lost_status ? 'Lost_status LIKE :status' : {})
      .andWhere(
        searchKeys.Lost_send_time ? 'Lost_send_time LIKE :send_time' : {},
      )
      .andWhere(
        searchKeys.Lost_people_id ? 'Lost_people_id LIKE :people_id' : {},
      )
      .andWhere(
        searchKeys.Lost_people_name ? 'Lost_people_name LIKE :people_name' : {},
      )
      .andWhere(
        searchKeys.Lost_people_phone
          ? 'Lost_people_phone LIKE :people_phone'
          : {},
      )
      .andWhere(school_id ? { Sch_id: school_id } : {})
      .setParameters({
        id: `%${searchKeys.Lost_id}%`,
        time: `%${searchKeys.Lost_time}%`,
        where: `%${searchKeys.Lost_where}%`,
        content: `%${searchKeys.Lost_content}%`,
        status: `%${searchKeys.Lost_status}%`,
        send_time: `%${searchKeys.Lost_send_time}%`,
        people_id: `%${searchKeys.Lost_people_id}%`,
        people_name: `%${searchKeys.Lost_people_name}%`,
        people_phone: `%${searchKeys.Lost_people_phone}%`,
      })
      .getCount();
    const message = await this.lost
      .createQueryBuilder()
      .where(searchKeys.Lost_id ? 'Lost_id LIKE :id' : {})
      .andWhere(searchKeys.Lost_time ? 'Lost_time LIKE :time' : {})
      .andWhere(searchKeys.Lost_where ? 'Lost_where LIKE :where' : {})
      .andWhere(searchKeys.Lost_content ? 'Lost_content LIKE :content' : {})
      .andWhere(searchKeys.Lost_status ? 'Lost_status LIKE :status' : {})
      .andWhere(
        searchKeys.Lost_send_time ? 'Lost_send_time LIKE :send_time' : {},
      )
      .andWhere(
        searchKeys.Lost_people_id ? 'Lost_people_id LIKE :people_id' : {},
      )
      .andWhere(
        searchKeys.Lost_people_name ? 'Lost_people_name LIKE :people_name' : {},
      )
      .andWhere(
        searchKeys.Lost_people_phone
          ? 'Lost_people_phone LIKE :people_phone'
          : {},
      )
      .andWhere(school_id ? { Sch_id: school_id } : {})
      .setParameters({
        id: `%${searchKeys.Lost_id}%`,
        time: `%${searchKeys.Lost_time}%`,
        where: `%${searchKeys.Lost_where}%`,
        content: `%${searchKeys.Lost_content}%`,
        status: `%${searchKeys.Lost_status}%`,
        send_time: `%${searchKeys.Lost_send_time}%`,
        people_id: `%${searchKeys.Lost_people_id}%`,
        people_name: `%${searchKeys.Lost_people_name}%`,
        people_phone: `%${searchKeys.Lost_people_phone}%`,
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
      const num = await this.lost.delete(array[i]);
      await this.comment.delete({ Com_type_id: array[i], Com_type: '失物' });
      await this.returnmessage.delete({
        Return_message_id: array[i],
        Return_type: '失物',
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
      message = await this.lost.find({
        where: {
          Lost_status: '未找到',
        },
        order: { Lost_id: 'DESC' },
      });
    else
      message = await this.lost.find({
        where: {
          Lost_status: '未找到',
          Sch_name: data.Sch_name,
        },
        order: { Lost_id: 'DESC' },
      });
    return { data: message };
  }
  async getSend(data) {
    const num = await this.lost.insert({
      ...data,
      Lost_send_time: moment().format('YYYY-MM-DD HH:mm'),
    });
    if (num.raw.affectedRows >= 1) return { result: 'true', msg: '添加成功' };
    else return { result: 'false', msg: '添加失败，请重试' };
  }
  async getInfo(data) {
    const message = await this.lost.findOne({ Lost_id: data.Lost_id });
    return { data: message };
  }
  async get(data) {
    const message = await this.returnmessage.insert({
      ...data,
      Return_type: '失物',
      Return_time: moment().format('YYYY-MM-DD HH:mm'),
    });
    const Return_id = message.identifiers[0].Return_id;
    const num = await this.lost.update(data.Return_message_id, {
      Return_id,
      Lost_status: '已找到',
    }); //添加
    if (num.affected >= 1) return { result: 'true', msg: '修改成功' };
    else return { result: 'false', msg: '修改失败，请重试' };
  }
  async getOneList(data) {
    const message = await this.lost.find({
      where: {
        Lost_people_id: data.Lost_people_id,
      },
      order: { Lost_id: 'DESC' },
    });
    return { data: message };
  }
}
