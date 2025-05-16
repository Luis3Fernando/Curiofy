import { PrismaService } from 'src/prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TopicService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll() {
    return this.prismaService.topic.findMany({
      select: {
        id: false,
        name: true,
        description: true,
      },
      orderBy: { name: 'asc' },
    });
  }
}
