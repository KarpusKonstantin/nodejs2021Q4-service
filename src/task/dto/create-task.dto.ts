import {IsEmail, IsString, Length} from "class-validator";
import { Column } from 'typeorm';

export class CreateTaskDto {

  readonly boardId: string;

  readonly description: string;

  readonly order: number;

  readonly title: string;
}
