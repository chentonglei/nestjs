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
export class UserShowController {
  constructor(commentService) {
    this.commentService = commentService;
  }
  @Post('usershow') //获取列表
  @Bind(Body()) //data为body的数据
  async getComment(data) {
    return await this.commentService.getComment(data);
  }
}
