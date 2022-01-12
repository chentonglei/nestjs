import { Injectable, Dependencies } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../../entities';

@Injectable()
@Dependencies(getRepositoryToken(User))
export class HelloService {
  constructor(user) {
    this.user = user;
  }
  async getHello() {
    const users = this.user.find(); //查询全部
    return users;
  }
  getHello2() {
    return 'Hello Worldhahaha!';
  }
}
