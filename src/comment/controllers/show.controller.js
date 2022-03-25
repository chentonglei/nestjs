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
export class ShowController {
  constructor(commentService) {
    this.commentService = commentService;
  }
  @Post('show') //获取列表
  @Bind(Body()) //data为body的数据
  async getList(data) {
    const { current, pageSize, ...searchKeys } = data;
    return await this.commentService.getList(current, pageSize, searchKeys);
  }
}
