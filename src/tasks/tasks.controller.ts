import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  Query,
  UsePipes,
  ValidationPipe,
  ParseIntPipe
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTask } from './create-task.dto';
import { GetTasksFilter } from './get-tasks-filter.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import {Task} from './task.entity'
import { TaskStatus } from './task-status.enum';


@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getTasks(@Query(ValidationPipe) filterDto: GetTasksFilter): Promise<Task[]> {
    return this.tasksService.getTasks(filterDto) 
  }

  @Get('/:id')
  getTaskById(@Param('id', ParseIntPipe) id: number): Promise<Task> {
    return this.tasksService.getTaskById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createTask(@Body() createTakDto: CreateTask): Promise<Task> {
    return this.tasksService.createTask(createTakDto);
  }

  @Delete('/:id')
  delTaskById(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.tasksService.delTaskById(id);
  }

  @Patch('/:id/status')
  updateTaskStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', TaskStatusValidationPipe) status: TaskStatus,
  ): Promise<Task> {
    return this.tasksService.updateTaskStatus(id, status);
  }
}
