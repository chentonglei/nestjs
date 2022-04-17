import {
  Controller,
  Dependencies,
  Get,
  Post,
  Body,
  Bind,
} from '@nestjs/common';
import { CommentService } from '../services/comment.service';

@Controller('comment')
@Dependencies(CommentService)
export class AddController {
  constructor(commentService) {
    this.commentService = commentService;
  }
  @Post('add') //获取列表
  @Bind(Body()) //data为body的数据
  async getAdd(data) {
    return await this.commentService.getAdd(data);
  }
}
