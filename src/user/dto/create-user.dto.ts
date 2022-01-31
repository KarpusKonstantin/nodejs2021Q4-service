import {IsEmail, IsString, Length} from "class-validator";

export class CreateUserDto {

  readonly login: string;

  readonly name: string;

  readonly password: string;
}
