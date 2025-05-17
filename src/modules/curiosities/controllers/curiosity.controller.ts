import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Body,
  UseGuards,
  Req,
  Param,
} from '@nestjs/common';
import { CreateCuriosityDto, UpdateCuriosityDto } from '../dtos/curiosity.dto';
import { CuriosityService } from '../services/curiosity.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Curiosities')
@ApiBearerAuth()
@Controller('curiosities')
export class CuriosityController {
  constructor(private readonly curiositiesService: CuriosityService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Create a new curiosity' })
  @ApiBearerAuth()
  async create(@Body() dto: CreateCuriosityDto, @Req() req: any) {
    return this.curiositiesService.create(dto, req.user.userId);
  }

  @Get('me')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Get all curiosities from the logged-in user' })
  @ApiBearerAuth()
  async getMyCuriosities(@Req() req: any) {
    return this.curiositiesService.findAllByUser(req.user.userId);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Update a curiosity' })
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateCuriosityDto,
    @Req() req: any,
  ) {
    return this.curiositiesService.update(id, dto, req.user.userId);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Delete a curiosity by ID' })
  async delete(@Param('id') id: string, @Req() req: any) {
    return this.curiositiesService.delete(id, req.user.userId);
  }
}
