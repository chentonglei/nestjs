import { Injectable, Dependencies } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Recruit } from '../../entities';

@Injectable()
@Dependencies(getRepositoryToken(Recruit))
export class RecruitService {
  constructor(recruit) {
    this.recruit = recruit;
  }
  async getList(current, pageSize, searchKeys) {
    //获取列表信息
    //获取符合条件的总数 即数据库中数量
    const total = await this.recruit
      .createQueryBuilder()
      .where(searchKeys.Rec_id ? 'Rec__id LIKE :id' : {})
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
      .where(searchKeys.Rec_id ? 'Rec__id LIKE :id' : {})
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
}
