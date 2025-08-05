import {
  Controller,
  Get,
  Post,
  Put,
  Patch,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { TaskService } from './task.service';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  findAll() {
    return this.taskService.findAll();
  }

  @Post()
  create(@Body('title') title: string) {
    return this.taskService.create(title);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body('completed') completed: boolean) {
    return this.taskService.update(+id, completed);
  }

  @Patch(':id')
  patchUpdate(@Param('id') id: string, @Body('completed') completed: boolean) {
    return this.taskService.update(+id, completed);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.taskService.remove(+id);
  }
}