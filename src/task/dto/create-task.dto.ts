import { IsNotEmpty, IsNumber, IsOptional, IsString, Length } from 'class-validator';

export class CreateTaskDto {

  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @IsNotEmpty()
  @IsNumber()
  readonly order: number;

  @IsOptional()
  @IsString()
  readonly description?: string;

  @IsOptional()
  @IsString()
  readonly userId?: string | null;

  @IsOptional()
  @IsString()
  readonly boardId: string | null;

  @IsOptional()
  @IsString()
  readonly columnId?: string | null;
}
