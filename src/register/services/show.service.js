import { Injectable, Dependencies } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { SearchSource } from '../../../node_modules/jest/build/jest';
import { Like } from '../../../node_modules/typeorm/index';
import { Register } from '../../entities';

@Injectable()
@Dependencies(getRepositoryToken(Register))
export class ShowService {
  constructor(register) {
    this.register = register;
  }
  async getList(current, pageSize, searchKeys) {
    //获取列表信息
    //获取符合条件的总数 即数据库中数量
    const total = await this.register
      .createQueryBuilder()
      .where(searchKeys.Re_id ? 'Re_id LIKE :id' : {})
      .andWhere(searchKeys.Re_name ? 'Re_name LIKE :name' : {})
      .andWhere(searchKeys.Re_telephone ? 'Re_telephone LIKE :telephone' : {})
      .andWhere(
        searchKeys.Re_school_name ? 'Re_school_name LIKE :school_name' : {},
      )
      .andWhere(searchKeys.Re_school_id ? 'Re_school_id LIKE :school_id' : {})
      .andWhere(searchKeys.Re_sex ? { Re_sex: searchKeys.Re_sex } : {})
      .setParameters({
        id: `%${searchKeys.Re_id}%`,
        name: `%${searchKeys.Re_name}%`,
        telephone: `%${searchKeys.Re_telephone}%`,
        school_name: `%${searchKeys.Re_school_name}%`,
        school_id: `%${searchKeys.Re_school_id}%`,
      })
      .getCount();
    const message = await this.register
      .createQueryBuilder()
      .where(searchKeys.Re_id ? 'Re_id LIKE :id' : {})
      .andWhere(searchKeys.Re_name ? 'Re_name LIKE :name' : {})
      .andWhere(searchKeys.Re_telephone ? 'Re_telephone LIKE :telephone' : {})
      .andWhere(
        searchKeys.Re_school_name ? 'Re_school_name LIKE :school_name' : {},
      )
      .andWhere(searchKeys.Re_school_id ? 'Re_school_id LIKE :school_id' : {})
      .andWhere(searchKeys.Re_sex ? { Re_sex: searchKeys.Re_sex } : {})
      .setParameters({
        id: `%${searchKeys.Re_id}%`,
        name: `%${searchKeys.Re_name}%`,
        telephone: `%${searchKeys.Re_telephone}%`,
        school_name: `%${searchKeys.Re_school_name}%`,
        school_id: `%${searchKeys.Re_school_id}%`,
      })
      .skip((current - 1) * pageSize)
      .take(pageSize) //分页操作
      .getMany();
    /* const num = await this.user.insert(data); //添加 */
    /* const num = await this.user.update(data.id, data); //更新 */
    /* const num = await this.user.delete(data.id); //删除 */
    return { data: message, success: true, total };
  }
  async getUpdate(data) {
    const num = await this.register.update(data.Re_id, data);
    if (num.affected >= 1) return { result: 'true', msg: '修改成功' };
    else return { result: 'false', msg: '修改失败，请重试' };
  }
  async getPassword(data) {
    const num = await this.register.update(data.Re_id, {
      Re_password: '123456',
    });
    if (num.affected >= 1) return { result: 'true', msg: '初始化成功' };
    else return { result: 'false', msg: '初始化失败，请重试' };
  }
  async getCertification(data) {
    const num = await this.register.update(data.Re_id, {
      Re_status: '未提交认证信息',
      Re_school_name: '',
      Re_school_id: null,
      Re_img: '',
    });
    if (num.affected >= 1) return { result: 'true', msg: '初始化成功' };
    else return { result: 'false', msg: '初始化失败，请重试' };
  }
  async getDoit(data) {
    if (data.result === 'true') {
      const num = await this.register.update(data.Re_id, {
        Re_status: '审核通过',
      });
      if (num.affected >= 1) return { result: 'true', msg: '已通过' };
      else return { result: 'false', msg: '通过失败' };
    } else {
      const num = await this.register.update(data.Re_id, {
        Re_status: '审核拒绝',
      });
      if (num.affected >= 1) return { result: 'true', msg: '已拒绝' };
      else return { result: 'false', msg: '拒绝失败' };
    }
  }
}
