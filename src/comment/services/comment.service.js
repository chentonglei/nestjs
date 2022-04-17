import { Injectable, Dependencies } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { SearchSource } from '../../../node_modules/jest/build/jest';
import { Comment } from '../../entities';
import moment from 'moment';

@Injectable()
@Dependencies(getRepositoryToken(Comment))
export class CommentService {
  constructor(comment) {
    this.comment = comment;
  }
  async getList(current, pageSize, searchKeys) {
    //获取列表信息
    //获取符合条件的总数 即数据库中数量
    const total = await this.comment
      .createQueryBuilder()
      .where(searchKeys.Com_do_message ? 'Com_do_message LIKE :do_message' : {})
      .andWhere(searchKeys.Com_do_name ? 'Com_do_name LIKE :do_name' : {})
      .andWhere(searchKeys.Com_do_id ? 'Com_do_id LIKE :do_id' : {})
      .andWhere(searchKeys.Com_do_time ? 'Com_do_time LIKE :do_time' : {})
      .andWhere(searchKeys.Com_be_name ? 'Com_be_name LIKE :be_name' : {})
      .andWhere(searchKeys.Com_be_id ? 'Com_be_id LIKE :be_id' : {})
      .andWhere(searchKeys.Com_do_name ? 'Com_do_name LIKE :do_name' : {})
      .andWhere({ Com_type_id: searchKeys.Com_type_id })
      .andWhere({ Com_type: searchKeys.Com_type })
      .setParameters({
        do_message: `%${searchKeys.Com_do_message}%`,
        do_name: `%${searchKeys.Com_do_name}%`,
        do_id: `%${searchKeys.Com_do_id}%`,
        do_time: `%${searchKeys.Com_do_time}%`,
        be_name: `%${searchKeys.Com_be_name}%`,
        be_id: `%${searchKeys.Com_be_id}%`,
      })
      .getCount();
    const message = await this.comment
      .createQueryBuilder()
      .where(searchKeys.Com_do_message ? 'Com_do_message LIKE :do_message' : {})
      .andWhere(searchKeys.Com_do_name ? 'Com_do_name LIKE :do_name' : {})
      .andWhere(searchKeys.Com_do_id ? 'Com_do_id LIKE :do_id' : {})
      .andWhere(searchKeys.Com_do_time ? 'Com_do_time LIKE :do_time' : {})
      .andWhere(searchKeys.Com_be_name ? 'Com_be_name LIKE :be_name' : {})
      .andWhere(searchKeys.Com_be_id ? 'Com_be_id LIKE :be_id' : {})
      .andWhere(searchKeys.Com_do_name ? 'Com_do_name LIKE :do_name' : {})
      .andWhere({ Com_type_id: searchKeys.Com_type_id })
      .andWhere({ Com_type: searchKeys.Com_type })
      .setParameters({
        do_message: `%${searchKeys.Com_do_message}%`,
        do_name: `%${searchKeys.Com_do_name}%`,
        do_id: `%${searchKeys.Com_do_id}%`,
        do_time: `%${searchKeys.Com_do_time}%`,
        be_name: `%${searchKeys.Com_be_name}%`,
        be_id: `%${searchKeys.Com_be_id}%`,
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
      const num = await this.comment.delete(array[i]);
      if (num.affected >= 1) sum += num.affected;
    }
    if (sum >= 1)
      return {
        result: 'true',
        msg: `删除成功`,
      };
    else return { result: 'false', msg: '删除失败' };
  }
  async getComment(data) {
    var message;
    if (data.isModalVisible === '失物')
      message = await this.comment.find({
        Com_type_id: data.Lost_id,
        Com_type: data.isModalVisible,
      });
    if (data.isModalVisible === '招领')
      message = await this.comment.find({
        Com_type_id: data.Rec_id,
        Com_type: data.isModalVisible,
      });
    return { data: message };
  }
  async getAdd(data) {
    var Com_do_time = moment().format('YYYY-MM-DD HH:mm');
    const num = await this.comment.insert({ ...data, Com_do_time }); //添加
    if (num.raw.affectedRows >= 1) return { result: 'true', msg: '添加成功' };
    else return { result: 'false', msg: '添加失败，请重试' };
  }
}
