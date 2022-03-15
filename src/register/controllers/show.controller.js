import {
  Controller,
  Dependencies,
  Get,
  Post,
  Body,
  Bind,
} from '@nestjs/common';
import { ShowService } from '../services/show.service';

@Controller('register/show')
@Dependencies(ShowService)
export class ShowController {
  constructor(showService) {
    this.showService = showService;
  }
  @Post()
  async getList() {
    return await this.showService.getList();
  }
}
