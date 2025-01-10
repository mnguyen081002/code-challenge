import { Entity, Column } from 'typeorm';
import { BaseEntity } from './base.entity';
import { TodoResponseDto } from '../dtos/todo.dto';

@Entity('todos')
export class Todo extends BaseEntity {
  @Column()
  title: string;

  @Column({ default: false })
  completed: boolean;

  toResponseDto(): TodoResponseDto {
    return {
      id: this.id,
      title: this.title,
      completed: this.completed,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
} 