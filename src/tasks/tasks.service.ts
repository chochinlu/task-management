import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTask } from './create-task.dto';
import { GetTasksFilter } from './get-tasks-filter.dto';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository,
  ) {}

  // private tasks: Task[] = [];

  // getAllTasks(): Task[] {
  //   return this.tasks;
  // }

  // getTasksWithFilters(filterDto: GetTasksFilter): Task[] {
  //   const { status, search } = filterDto;
  //   let tasks = this.tasks;

  //   if (status) {
  //     tasks = tasks.filter(task => task.status === status);
  //   }
  //   if (search) {
  //     tasks = tasks.filter(
  //       task =>
  //         task.title.includes(search) || task.description.includes(search),
  //     );
  //   }

  //   return tasks;
  // }

  async getTaskById(id: number): Promise<Task> {
    const found = await this.taskRepository.findOne(id);
    if (!found) {
      throw new NotFoundException(`Task with ID: ${id} not found`);
    }

    return found;
  }

  // updateTaskStatus(id: string, status: TaskStatus): Task {
  //   const task = this.getTaskById(id);
  //   task.status = status;
  //   return task;
  // }

  // delTaskById(id: string): void {
  //   const found = this.getTaskById(id);

  //   this.tasks.filter(task => task.id !== found.id);
  // }

  async createTask(createTaskDto: CreateTask): Promise<Task> {
    return this.taskRepository.createTask(createTaskDto);
  }

  // createTask(createTaskDto: CreateTask): Task {
  //   const task: Task = {
  //     id: uuidv1(),
  //     status: TaskStatus.OPEN,
  //     ...createTaskDto,
  //   };
  //   this.tasks.push(task);
  //   return task;
  // }
}
