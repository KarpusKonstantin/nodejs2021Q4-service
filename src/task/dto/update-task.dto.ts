import {IsEmail, IsString, Length} from "class-validator";
import { Column } from 'typeorm';

export class UpdateTaskDto {

  readonly description: string;

  readonly order: number;

  readonly title: string;
}
