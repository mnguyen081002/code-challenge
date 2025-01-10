import { Type } from "class-transformer";
import { IsOptional, IsString, IsNumber, IsIn } from "class-validator";

export class PaginationOptions {
  @IsOptional()
  @IsString()
  @IsIn(["createdAt", "updatedAt"])
  readonly sort?: string = "createdAt";

  @IsOptional()
  @IsString()
  @IsIn(["ASC", "DESC"])
  readonly order?: string = "DESC";

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  readonly page: number = 1;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  readonly take: number = 10;

  get skip(): number {
    return (this.page - 1) * this.take;
  }

  constructor(options: Partial<PaginationOptions>) {
    Object.assign(this, options);
  }
}

export class PaginatedResponse<T> {
  results: T[];
  page: number;
  take: number;
  totalPages: number;
  totalResults: number;

  constructor(results: T[], options: PaginationOptions, totalResults: number) {
    this.results = results;
    this.page = Number(options.page);
    this.take = Number(options.take);
    this.totalPages = Math.ceil(totalResults / this.take);
    this.totalResults = totalResults;
  }
} 