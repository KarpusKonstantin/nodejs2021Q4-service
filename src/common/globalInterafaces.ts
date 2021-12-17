import { IBoard } from '../resources/boards/board.model';
import { ITask } from '../resources/tasks/task.model';
import { IUser } from '../resources/users/user.model';

export default interface IResultToResponse{
  code: number,
  message: string | IBoard[] | IBoard | ITask[] | ITask | IUser[] | IUser
}
