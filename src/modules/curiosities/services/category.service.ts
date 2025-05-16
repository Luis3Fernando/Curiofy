import { PrismaService } from 'src/prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.category.findMany({
      select: {
        id: false,
        name: true,
        description: true,
      },
      orderBy: { name: 'asc' },
    });
  }
}
