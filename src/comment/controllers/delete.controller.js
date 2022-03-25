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
export class DeleteController {
  constructor(commentService) {
    this.commentService = commentService;
  }
  @Post('delete') //获取列表
  @Bind(Body()) //data为body的数据
  async getDelete(data) {
    console.log(data.array);
    return await this.commentService.getDelete(data.array);
  }
}
