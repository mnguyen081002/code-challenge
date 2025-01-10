import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../utils/catchAsync';
import { todoService } from '../services';
import { ApiError } from '../utils/ApiError';
import { CreateTodoDto, TodoFilterPaginationDto, UpdateTodoDto } from '../dtos/todo.dto';
import { ERROR_MESSAGES } from '../constants/messages';
import { PaginatedResponse } from '../types/pagination';

export const createTodo = catchAsync(async (req: Request, res: Response) => {
  const createTodoDto: CreateTodoDto = req.body;
  const todo = await todoService.createTodo(createTodoDto);
  res.status(httpStatus.CREATED).send(todo.toResponseDto());
});

export const getTodos = catchAsync(async (req: Request, res: Response) => {
    const options = new TodoFilterPaginationDto(req.query);
    const result = await todoService.queryTodos(options);
    res.send(new PaginatedResponse(result.results.map(todo => todo.toResponseDto()), options, result.total)); 
});

export const getTodo = catchAsync(async (req: Request, res: Response) => {
  const todo = await todoService.getTodoById(req.params.todoId);
  if (!todo) {
    throw new ApiError(httpStatus.NOT_FOUND, ERROR_MESSAGES.TODO.NOT_FOUND);
  }
  res.send(todo.toResponseDto());
});

export const updateTodo = catchAsync(async (req: Request, res: Response) => {
  const updateTodoDto: UpdateTodoDto = req.body;
  const todo = await todoService.updateTodoById(req.params.todoId, updateTodoDto);
  res.send(todo.toResponseDto());
});

export const deleteTodo = catchAsync(async (req: Request, res: Response) => {
  await todoService.deleteTodoById(req.params.todoId);
  res.status(httpStatus.NO_CONTENT).send();
}); 