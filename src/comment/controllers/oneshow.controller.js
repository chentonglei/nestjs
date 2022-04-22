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
export class OneShowController {
  constructor(commentService) {
    this.commentService = commentService;
  }
  @Post('OneShow') //获取列表
  @Bind(Body()) //data为body的数据
  async getOneComment(data) {
    return await this.commentService.getOneComment(data);
  }
}
