import { IsBoolean } from "class-validator";
import { IsString, MinLength, MaxLength } from "class-validator";
import { IsOptional } from "class-validator";
import { PaginationOptions } from "../types/pagination";

export class CreateTodoDto {
  @IsString()
  @MinLength(10, { message: 'Title must be at least 10 characters long' })
  title: string;

  @IsBoolean({ message: 'Completed must be a boolean' })
  completed?: boolean;
}

export class UpdateTodoDto {
  @IsOptional()
  @IsString()
  @MinLength(10, { message: 'Title must be at least 10 characters long' })
  title?: string;

  @IsOptional()
  @IsBoolean({ message: 'Completed must be a boolean' })
  completed?: boolean;
}

export class TodoResponseDto {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export class PaginatedTodoResponseDto {
  results: TodoResponseDto[];
  page: number;
  limit: number;
  totalPages: number;
  totalResults: number;
} 

export class TodoFilterPaginationDto extends PaginationOptions {
  @IsOptional()
  @IsString()
  @MinLength(3, { message: 'Title must be at least 3 characters long' })
  title?: string;

  @IsOptional()
  @IsBoolean({ message: 'Completed must be a boolean' })
  completed?: boolean;

  constructor(options: Partial<TodoFilterPaginationDto>) {
    super(options);
  }
}
