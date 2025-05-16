import { Controller, Get } from '@nestjs/common';
import { TopicService } from '../services/topic.service';
import { ApiOperation } from '@nestjs/swagger';

@Controller('topics')
export class TopicController {
  constructor(private readonly topicService: TopicService) {}

  @Get()
  @ApiOperation({ summary: 'Listar todos los topics (tags)' })
  async findAll() {
    return this.topicService.findAll();
  }
}
