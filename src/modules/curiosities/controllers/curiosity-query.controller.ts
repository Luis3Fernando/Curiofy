import { Controller, Get, Query } from '@nestjs/common';
import { CuriosityQueryService } from '../services/curiosity-query.service';

@Controller('public/curiosities')
export class CuriosityQueryController {
  constructor(private readonly curiosityQueryService: CuriosityQueryService) {}

  @Get()
  async getCuriosities(
    @Query('search') search?: string,
    @Query('limit') limit?: string,
    @Query('page') page?: string,
  ) {
    return this.curiosityQueryService.findAllPublicCuriosities({
      search,
      limit: limit ? parseInt(limit) : undefined,
      page: page ? parseInt(page) : undefined,
    });
  }
}
