import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

import { CreateCuriosityDto, UpdateCuriosityDto } from '../dtos/curiosity.dto';

@Injectable()
export class CuriosityService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(dto: CreateCuriosityDto, userId: string) {
    const UserFound = await this.prismaService.user.findUnique({
      where: { id: userId },
    });

    if (!UserFound) {
      throw new NotFoundException('Acces token inválido o caducado');
    }

    const category = await this.prismaService.category.findUnique({
      where: { name: dto.categoryName },
    });

    if (!category) {
      throw new NotFoundException(
        `La categoria "${dto.categoryName}" no existe en la base de datos`,
      );
    }

    let topics: any = [];
    if (dto.topicNames && dto.topicNames.length > 0) {
      topics = await this.prismaService.topic.findMany({
        where: { name: { in: dto.topicNames } },
      });

      const foundNames = topics.map((t) => t.name);
      const notFound = dto.topicNames.filter(
        (name) => !foundNames.includes(name),
      );
      if (notFound.length > 0) {
        throw new NotFoundException(
          `No se encontro los Topics: ${notFound.join(', ')}`,
        );
      }
    }

    const curiosity = await this.prismaService.curiosity.create({
      data: {
        title: dto.title,
        content: dto.content,
        isApproved: UserFound.role === 'ADMIN',
        user: { connect: { id: UserFound.id } },
        category: { connect: { id: category.id } },
        curiosityTopics: {
          create: topics.map((topic) => ({
            topic: { connect: { id: topic.id } },
          })),
        },
      },
      include: {
        curiosityTopics: true,
        category: true,
        user: false,
      },
    });

    return curiosity;
  }

  async findAllByUser(userId: string) {
    const curiosities = await this.prismaService.curiosity.findMany({
      where: {
        userId,
      },
      select: {
        id: true,
        title: true,
        content: true,
        isApproved: true,
        createdAt: true,
        category: {
          select: {
            id: false,
            name: true,
            description: false,
          },
        },
        curiosityTopics: {
          select: {
            topic: {
              select: {
                id: false,
                name: true,
                description: false,
              },
            },
          },
        },
      },
    });

    return curiosities;
  }

  async update(curiosityId: string, dto: UpdateCuriosityDto, userId: string) {
    const UserFound = await this.prismaService.user.findUnique({
      where: { id: userId },
    });

    if (!UserFound) {
      throw new NotFoundException('Acces token inválido o caducado');
    }
    const curiosity = await this.prismaService.curiosity.findUnique({
      where: { id: curiosityId },
    });

    if (
      !curiosity ||
      (UserFound.role !== 'ADMIN' && curiosity.userId !== userId)
    ) {
      throw new NotFoundException('Curiosidad no encontrada o no autorizada');
    }

    let category;
    if (dto.categoryName) {
      category = await this.prismaService.category.findUnique({
        where: { name: dto.categoryName },
      });

      if (!category) {
        throw new NotFoundException(
          `La categoría "${dto.categoryName}" no existe`,
        );
      }
    }

    let topics: any = [];
    if (dto.topicNames && dto.topicNames.length > 0) {
      topics = await this.prismaService.topic.findMany({
        where: { name: { in: dto.topicNames } },
      });

      const foundNames = topics.map((t) => t.name);
      const notFound = dto.topicNames.filter(
        (name) => !foundNames.includes(name),
      );
      if (notFound.length > 0) {
        throw new NotFoundException(
          `No se encontraron los Topics: ${notFound.join(', ')}`,
        );
      }

      await this.prismaService.curiosityTopic.deleteMany({
        where: { curiosityId },
      });
    }

    const updated = await this.prismaService.curiosity.update({
      where: { id: curiosityId },
      data: {
        title: dto.title,
        content: dto.content,
        category: category ? { connect: { id: category.id } } : undefined,
        curiosityTopics: topics.length
          ? {
              create: topics.map((topic) => ({
                topic: { connect: { id: topic.id } },
              })),
            }
          : undefined,
      },
      include: {
        category: true,
        curiosityTopics: {
          include: { topic: true },
        },
      },
    });

    return updated;
  }

  async delete(id: string, userId: string) {
    const curiosity = await this.prismaService.curiosity.findUnique({
      where: { id },
    });
    const UserFound = await this.prismaService.user.findUnique({
      where: { id: userId },
    });

    if (!UserFound) {
      throw new NotFoundException('Acces token inválido o caducado');
    }

    if (!curiosity) {
      throw new NotFoundException('Curiosidad no encontrada');
    }

    if (UserFound.role !== 'ADMIN' && curiosity.userId !== userId) {
      throw new ForbiddenException('No puedes eliminar esta curiosidad');
    }

    await this.prismaService.curiosityTopic.deleteMany({
      where: {
        curiosityId: id,
      },
    });

    await this.prismaService.curiosity.delete({
      where: { id },
    });

    return { message: 'Curiosidad eliminada correctamente' };
  }
}
