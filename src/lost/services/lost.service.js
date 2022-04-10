import { Injectable, Dependencies } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Lost } from '../../entities';

@Injectable()
@Dependencies(getRepositoryToken(Lost))
export class LostService {
  constructor(lost) {
    this.lost = lost;
  }
  async getList(current, pageSize, searchKeys) {
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
      if (num.affected >= 1) sum += num.affected;
    }
    if (sum >= 1)
      return {
        result: 'true',
        msg: `总共${array.length}条，删除成功${sum}条`,
      };
    else return { result: 'false', msg: '删除失败，请重试' };
  }
  async getUserList() {
    const message = await this.lost.find({ Lost_status: '未找到' });
    return { data: message };
  }
}
