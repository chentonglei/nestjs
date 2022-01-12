import { Injectable } from '@nestjs/common';

@Injectable()
export class Hello2Service {
  getHello() {
    return 'Hello World!';
  }
  getHello2(id, message) {
    return `Hello Worldhahaha! ${id} ${message}`;
  }
}
