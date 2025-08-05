import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) {}

  findAll(): Promise<Task[]> {
    return this.taskRepository.find();
  }

  async findOne(id: number): Promise<Task> {
    const task = await this.taskRepository.findOneBy({ id });
    if (!task) {
      throw new Error(`Task with id ${id} not found`);
    }
    return task;
  }

  create(title: string): Promise<Task> {
    const task = this.taskRepository.create({ title });
    return this.taskRepository.save(task);
  }

  async update(id: number, completed: boolean): Promise<Task> {
    const task = await this.findOne(id);
    task.completed = completed;
    return this.taskRepository.save(task);
  }

  async remove(id: number): Promise<void> {
    await this.taskRepository.delete(id);
  }
}
