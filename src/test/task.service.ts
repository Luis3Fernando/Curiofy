import { Injectable } from '@nestjs/common';
import { PrismaService } from '@data/prisma.service';
import { Task } from '@prisma/client';

@Injectable()
export class TaskService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllTasks(): Promise<Task[]> {
    return await this.prisma.task.findMany();
  }

  async getTaskById(id: number): Promise<Task | null> {
    return await this.prisma.task.findUnique({
      where: { id },
    });
  }

  async createTask(data: Task): Promise<Task> {
    return await this.prisma.task.create({
      data,
    });
  }

  async updateTask(id: number, data: Task): Promise<Task> {
    return await this.prisma.task.update({
      where: { id },
      data,
    });
  }

  async deleteTask(id: number): Promise<Task> {
    return await this.prisma.task.delete({
      where: { id },
    });
  }
}
