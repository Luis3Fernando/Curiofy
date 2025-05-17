import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CuriosityQueryService {
  constructor(private prisma: PrismaService) {}

  async findAllPublicCuriosities(params: {
    search?: string;
    limit?: number;
    page?: number;
  }) {
    const { search, limit = 100, page = 1 } = params;

    const take = limit;
    const skip = (page - 1) * limit;

    const where = {
      isApproved: true,
      ...(search && {
        OR: [
          { title: { contains: search, mode: 'insensitive' } },
          { content: { contains: search, mode: 'insensitive' } },
        ],
      }),
    };

    const [results, total] = await Promise.all([
      this.prisma.curiosity.findMany({
        where,
        skip,
        take,
        orderBy: { createdAt: 'desc' },
        include: {
          category: {
            select: {
              name: true,
            },
          },
          curiosityTopics: {
            include: {
              topic: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
      }),
      this.prisma.curiosity.count({ where }),
    ]);

    // Limpiar los datos para que no salgan cosas innecesarias
    const formattedResults = results.map((curiosity) => ({
      id: curiosity.id,
      title: curiosity.title,
      content: curiosity.content,
      createdAt: curiosity.createdAt,
      updatedAt: curiosity.updatedAt,
      category: curiosity.category.name,
      topics: curiosity.curiosityTopics.map((ct) => ct.topic.name),
    }));

    return {
      total,
      page,
      limit,
      results: formattedResults,
    };
  }
}
