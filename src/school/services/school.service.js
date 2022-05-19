import { Injectable, Dependencies } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import moment from 'moment';
import { School } from '../../entities';

@Injectable()
@Dependencies(getRepositoryToken(School))
export class SchoolService {
  constructor(school) {
    this.school = school;
  }
  async getList(current, pageSize, searchKeys) {
    //获取列表信息
    //获取符合条件的总数 即数据库中数量
    const total = await this.school
      .createQueryBuilder()
      .where(searchKeys.Sch_id ? 'Sch_id LIKE :id' : {})
      .andWhere(searchKeys.Sch_name ? 'Sch_name LIKE :name' : {})
      .andWhere(searchKeys.Sch_time ? 'Sch_time LIKE :time' : {})
      .andWhere(searchKeys.Sch_status ? 'Sch_status LIKE :status' : {})
      .andWhere(
        searchKeys.Sch_documents ? 'Sch_documents LIKE :documents ' : {},
      )
      .andWhere(
        searchKeys.Sch_applicant_id
          ? 'Sch_applicant_id LIKE :applicant_id'
          : {},
      )
      .andWhere(
        searchKeys.Sch_applicant_name
          ? 'Sch_applicant_name LIKE :applicant_name'
          : {},
      )
      .setParameters({
        id: `%${searchKeys.Sch_id}%`,
        name: `%${searchKeys.Sch_name}%`,
        time: `%${searchKeys.Sch_time}%`,
        status: `%${searchKeys.Sch_status}%`,
        documents: `%${searchKeys.Sch_documents}%`,
        applicant_id: `%${searchKeys.Sch_applicant_id}%`,
        applicant_name: `%${searchKeys.Sch_applicant_name}%`,
      })
      .getCount();
    const message = await this.school
      .createQueryBuilder()
      .where(searchKeys.Sch_id ? 'Sch_id LIKE :id' : {})
      .andWhere(searchKeys.Sch_name ? 'Sch_name LIKE :name' : {})
      .andWhere(searchKeys.Sch_time ? 'Sch_time LIKE :time' : {})
      .andWhere(searchKeys.Sch_status ? 'Sch_status LIKE :status' : {})
      .andWhere(
        searchKeys.Sch_documents ? 'Sch_documents LIKE :documents ' : {},
      )
      .andWhere(
        searchKeys.Sch_applicant_id
          ? 'Sch_applicant_id LIKE :applicant_id'
          : {},
      )
      .andWhere(
        searchKeys.Sch_applicant_name
          ? 'Sch_applicant_name LIKE :applicant_name'
          : {},
      )
      .setParameters({
        id: `%${searchKeys.Sch_id}%`,
        name: `%${searchKeys.Sch_name}%`,
        time: `%${searchKeys.Sch_time}%`,
        status: `%${searchKeys.Sch_status}%`,
        documents: `%${searchKeys.Sch_documents}%`,
        applicant_id: `%${searchKeys.Sch_applicant_id}%`,
        applicant_name: `%${searchKeys.Sch_applicant_name}%`,
      })
      .skip((current - 1) * pageSize)
      .take(pageSize) //分页操作
      .getMany();
    /* const num = await this.user.insert(data); //添加 */
    /* const num = await this.user.update(data.id, data); //更新 */
    /* const num = await this.user.delete(data.id); //删除 */
    return { data: message, success: true, total };
  }
  async getDoit(data) {
    if (data.result === 'true') {
      const num = await this.school.update(data.Sch_id, {
        Sch_status: '审核通过',
      });
      if (num.affected >= 1) return { result: 'true', msg: '已通过' };
      else return { result: 'false', msg: '通过失败' };
    } else {
      const num = await this.school.update(data.Sch_id, {
        Sch_status: '审核拒绝',
      });
      if (num.affected >= 1) return { result: 'true', msg: '已拒绝' };
      else return { result: 'false', msg: '拒绝失败' };
    }
  }
  async getDelete(data) {
    const num = await this.school.delete(data.id);
    if (num.affected >= 1) return { result: 'true', msg: '删除成功' };
    else return { result: 'false', msg: '删除失败，请重试' };
  }
  async getUserList() {
    const message = await this.school.find({ Sch_status: '审核通过' });
    return { data: message };
  }
  async getAdd(data) {
    data.Sch_time = moment().format('YYYY-MM-DD HH:mm');
    data.Sch_status = '审核中';
    const num = await this.school.insert(data);
    if (num.raw.affectedRows >= 1) return { result: 'true', msg: '添加成功' };
    else return { result: 'false', msg: '添加失败，请重试' };
  }
  async search(data) {
    const message = await this.school
      .createQueryBuilder()
      .where('Sch_name LIKE :name')
      .andWhere({ Sch_status: '审核通过' })
      .setParameters({
        name: `%${data.search}%`,
      })
      .getMany();
    /* const num = await this.user.insert(data); //添加 */
    /* const num = await this.user.update(data.id, data); //更新 */
    /* const num = await this.user.delete(data.id); //删除 */
    return { data: message };
  }
}
