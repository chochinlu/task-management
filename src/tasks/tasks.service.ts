import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v1 as uuidv1 } from 'uuid';
import { CreateTask } from './create-task.dto';
import { GetTasksFilter } from './get-tasks-filter.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTasksWithFilters(filterDto: GetTasksFilter): Task[] {
    const { status, search } = filterDto;
    let tasks = this.tasks;

    if (status) {
      tasks = tasks.filter(task => task.status === status);
    }
    if (search) {
      tasks = tasks.filter(
        task =>
          task.title.includes(search) || task.description.includes(search),
      );
    }

    return tasks;
  }

  getTaskById(id: string): Task {
    const found = this.tasks.find(task => task.id === id);

    if (!found) {
      throw new NotFoundException(`Task with ID: ${id} not found`);
    }

    return found;
  }

  updateTaskStatus(id: string, status: TaskStatus): Task {
    const task = this.getTaskById(id);
    task.status = status;
    return task;
  }

  delTaskById(id: string): void {
    const found = this.getTaskById(id);

    this.tasks.filter(task => task.id !== found.id);
  }

  createTask(createTaskDto: CreateTask): Task {
    const task: Task = {
      id: uuidv1(),
      status: TaskStatus.OPEN,
      ...createTaskDto,
    };
    this.tasks.push(task);
    return task;
  }
}
