import {
  Controller,
  Dependencies,
  Get,
  Post,
  Body,
  Bind,
} from '@nestjs/common';
import { HelloService } from '../services/hello.service';

@Controller('/hello')
@Dependencies(HelloService)
export class HelloController {
  constructor(helloService) {
    this.helloService = helloService;
  }
  @Post()
  @Bind(Body())
  async getHello(data) {
    return await this.helloService.getHello(data);
  }
}
