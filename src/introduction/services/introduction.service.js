import { Injectable, Dependencies } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { SearchSource } from '../../../node_modules/jest/build/jest';
import { Like } from '../../../node_modules/typeorm/index';
import { Introduction } from '../../entities';

@Injectable()
@Dependencies(getRepositoryToken(Introduction))
export class IntroductionService {
  constructor(introduction) {
    this.introduction = introduction;
  }
  async getList(current, pageSize, searchKeys) {
    //获取列表信息
    //获取符合条件的总数 即数据库中数量
    const total = await this.introduction
      .createQueryBuilder()
      .where(searchKeys.Intr_id ? 'Intr_id LIKE :id' : {})
      .andWhere(searchKeys.Intr_question ? 'Intr_question LIKE :question' : {})
      .andWhere(searchKeys.Intr_answer ? 'Intr_answer LIKE :answer' : {})
      .setParameters({
        id: `%${searchKeys.Intr_id}%`,
        question: `%${searchKeys.Intr_question}%`,
        answer: `%${searchKeys.Intr_answer}%`,
      })
      .getCount();
    const message = await this.introduction
      .createQueryBuilder()
      .where(searchKeys.Intr_id ? 'Intr_id LIKE :id' : {})
      .andWhere(searchKeys.Intr_question ? 'Intr_question LIKE :question' : {})
      .andWhere(searchKeys.Intr_answer ? 'Intr_answer LIKE :answer' : {})
      .setParameters({
        id: `%${searchKeys.Intr_id}%`,
        question: `%${searchKeys.Intr_question}%`,
        answer: `%${searchKeys.Intr_answer}%`,
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
