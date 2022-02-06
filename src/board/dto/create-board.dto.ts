import { IsNotEmpty, IsString } from 'class-validator';

export class CreateBoardDto {

  readonly  columns: string;

  @IsNotEmpty()
  @IsString()
  readonly title: string;
}
