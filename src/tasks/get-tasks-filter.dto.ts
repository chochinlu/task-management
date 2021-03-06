import { TaskStatus } from "./task.model";
import { IsOptional, IsIn, IsNotEmpty } from "class-validator";

export class GetTasksFilter {

  @IsOptional()
  @IsIn(Object.values(TaskStatus))
  status: TaskStatus;

  @IsOptional()
  @IsNotEmpty()
  search: string;
}