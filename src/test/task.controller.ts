import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  ParseIntPipe,
  NotFoundException,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { Task } from '@prisma/client';

@Controller('test')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  getAllTasks() {
    return this.taskService.getAllTasks();
  }

  @Post()
  createTask(@Body() data: Task) {
    return this.taskService.createTask(data);
  }

  @Put(':id')
  async updateTask(@Param('id', ParseIntPipe) id: number, @Body() data: Task) {
    try {
      return await this.taskService.updateTask(id, data);
    } catch (error) {
      throw new NotFoundException('Task does not exist', error);
    }
  }

  @Delete(':id')
  async deleteTask(@Param('id', ParseIntPipe) id: number) {
    try {
      return await this.taskService.deleteTask(id);
    } catch (error) {
      throw new NotFoundException('Task does not exist', error);
    }
  }

  @Get(':id')
  async getTaskById(@Param('id', ParseIntPipe) id: number) {
    const taskFound = await this.taskService.getTaskById(id);
    if (!taskFound) throw new NotFoundException('Task does not exist');
    return taskFound;
  }
}
