import express from 'express';
import { todoController } from '../../controllers';
import validation, { ValidationBody, ValidationQuery } from '../../middlewares/validate';
import { CreateTodoDto, UpdateTodoDto, TodoFilterPaginationDto } from '../../dtos/todo.dto';

const router = express.Router();

router
  .route('/')
  .post(validation(new ValidationBody(CreateTodoDto)), todoController.createTodo)
  .get(validation(new ValidationQuery(TodoFilterPaginationDto)), todoController.getTodos);

router
  .route('/:todoId')
  .get(todoController.getTodo)
  .patch(validation(new ValidationBody(UpdateTodoDto)), todoController.updateTodo)
  .delete(todoController.deleteTodo);

export default router; 