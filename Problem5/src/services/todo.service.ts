import httpStatus from 'http-status';
import { Like, Repository } from 'typeorm';
import { AppDataSource } from '../config/typeorm.config';
import { Todo } from '../entities/todo.entity';
import { ApiError } from '../utils/ApiError';
import { CreateTodoDto, UpdateTodoDto, TodoFilterPaginationDto } from '../dtos/todo.dto';
import { ERROR_MESSAGES } from '../constants/messages';

export class TodoService {
  private todoRepository: Repository<Todo>;

  constructor() {
    this.todoRepository = AppDataSource.getRepository(Todo);
  }

  async createTodo(createTodoDto: CreateTodoDto): Promise<Todo> {
    const todo = this.todoRepository.create(createTodoDto);
    const savedTodo = await this.todoRepository.save(todo);
    return savedTodo;
  }

  async getTodoById(id: string): Promise<Todo | null> {
    const todo = await this.todoRepository.findOne({ where: { id } });
    return todo;
  }

  async queryTodos(options: TodoFilterPaginationDto): Promise<{results: Todo[], total: number}> {
    const { take, sort, order, title, completed, skip } = options;

    const [todos, total] = await this.todoRepository.findAndCount({
      where: {
        title: title ? Like(`%${title}%`) : undefined,
        completed: completed ? completed : undefined,
      },
      take: take,
      skip: skip,
      order: sort ? { [sort]: order } : undefined,
    });

    return { results: todos, total };
  }

  async updateTodoById(todoId: string, updateTodoDto: UpdateTodoDto): Promise<Todo> {
    const todo = await this.todoRepository.findOne({ where: { id: todoId } });
    if (!todo) {
      throw new ApiError(httpStatus.NOT_FOUND, ERROR_MESSAGES.TODO.NOT_FOUND);
    }
    Object.assign(todo, updateTodoDto);
    const updatedTodo = await this.todoRepository.save(todo);
    return updatedTodo;
  }

  async deleteTodoById(todoId: string): Promise<void> {
    const todo = await this.todoRepository.findOne({ where: { id: todoId } });
    if (!todo) {
      throw new ApiError(httpStatus.NOT_FOUND, ERROR_MESSAGES.TODO.NOT_FOUND);
    }
    await this.todoRepository.remove(todo);
  }
}

export const todoService = new TodoService(); 