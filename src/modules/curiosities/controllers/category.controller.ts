import { Controller, Get } from '@nestjs/common';
import { CategoryService } from '../services/category.service';
import { ApiOperation } from '@nestjs/swagger';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  @ApiOperation({ summary: 'Listar todas las categorias' })
  async findAll() {
    return this.categoryService.findAll();
  }
}
