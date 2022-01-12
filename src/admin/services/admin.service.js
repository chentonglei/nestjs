import { Injectable } from '@nestjs/common';

@Injectable()
export class AdminService {
  getHello() {
    return 'admin';
  }
  getHello2() {
    return 'Hello Worldhahaha!';
  }
}
