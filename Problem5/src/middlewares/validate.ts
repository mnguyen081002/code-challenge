import { Request, Response, NextFunction } from 'express';
import { validate, ValidationError } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { ApiError } from '../utils/ApiError';
import httpStatus from 'http-status';

interface ValidationOptions {
  validate(req: Request): any
}

export class ValidationBody implements ValidationOptions {
  validate(req: Request) {
    return plainToInstance(this.dto, req.body);
  }

  constructor(private readonly dto: any) {
    this.dto = dto;
  }
}

export class ValidationQuery implements ValidationOptions {
  validate(req: Request) {
    return plainToInstance(this.dto, req.query);
  }

  constructor(private readonly dto: any) {
    this.dto = dto;
  }
}


const validation = (validationOptions: ValidationOptions) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const dtoInstance = validationOptions.validate(req);
    const errors: ValidationError[] = await validate(dtoInstance, {
      whitelist: true,
      forbidNonWhitelisted: true,
    });

    if (errors.length > 0) {
      const errorMessages = errors.map((error: ValidationError) => {
        return Object.values(error.constraints || {}).join(', ');
      });

      next(new ApiError(httpStatus.BAD_REQUEST, errorMessages.join('; ')));
      return;
    }

    req.body = dtoInstance;
    next();
  };
};

export default validation; 