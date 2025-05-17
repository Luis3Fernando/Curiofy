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
  Query,
} from '@nestjs/common';
import { CreateCuriosityDto, UpdateCuriosityDto } from '../dtos/curiosity.dto';
import { CuriosityService } from '../services/curiosity.service';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiTags,
  ApiOperation,
  ApiExcludeEndpoint,
} from '@nestjs/swagger';

@ApiTags('Curiosities')
@ApiBearerAuth()
@Controller('curiosities')
export class CuriosityController {
  constructor(private readonly curiositiesService: CuriosityService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Crear una nueva curiosidad' })
  @ApiBearerAuth()
  async create(@Body() dto: CreateCuriosityDto, @Req() req: any) {
    return this.curiositiesService.create(dto, req.user.userId);
  }

  @Get('me')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Obtener todas las curiosidades que creaste' })
  @ApiBearerAuth()
  async getMyCuriosities(@Req() req: any) {
    return this.curiositiesService.findAllByUser(req.user.userId);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Actualizar una curiosidad' })
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateCuriosityDto,
    @Req() req: any,
  ) {
    return this.curiositiesService.update(id, dto, req.user.userId);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Eliminar una curiosidad con su ID' })
  async delete(@Param('id') id: string, @Req() req: any) {
    return this.curiositiesService.delete(id, req.user.userId);
  }

  @Get('approve')
  @ApiExcludeEndpoint()
  async approveCuriosity(@Query('token') token: string) {
    return this.curiositiesService.approve(token);
  }
}
