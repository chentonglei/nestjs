import { Controller, Dependencies, Get, Post } from '@nestjs/common';
import { HelloService } from '../services/hello.service';

@Controller('/hello')
@Dependencies(HelloService)
export class HelloController {
  constructor(helloService) {
    this.helloService = helloService;
  }
  @Post()
  getHello() {
    return this.helloService.getHello();
  }
}
